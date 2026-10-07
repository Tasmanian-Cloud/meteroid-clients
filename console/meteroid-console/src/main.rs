//! meteroid-console — TUI for Meteroid billing.
//!
//!   meteroid-console [--profile NAME] [--api-url URL]
//!   meteroid-console setup
//!
//! Keys: 1-8 tabs, TAB next tab, j/k up/down, Enter detail, ? help, Esc back, q quit

use std::time::Duration;

use crossterm::event::{self, Event as CEvent, KeyCode, KeyEventKind};
use meteroid_api::{EntitySnapshot, Frame, MetricsSnapshot};
use meteroid_rs::api::{Meteroid, MeteroidOptions};
use meteroid_subscriber::{Subscriber, SubscriberConfig};
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint as RtConstraint, Direction as RtDirection, Layout as RtLayout},
    Terminal,
};
use textfold::tui as tf;

mod config;
use config::{ProfileKind, ProfilesFile};

// ── Tabs ────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Tab {
    Dashboard,
    Customers,
    Subscriptions,
    Invoices,
    Plans,
    Products,
    Families,
    Coupons,
}

const ALL_TABS: &[Tab] = &[
    Tab::Dashboard, Tab::Customers, Tab::Subscriptions, Tab::Invoices,
    Tab::Plans, Tab::Products, Tab::Families, Tab::Coupons,
];

impl Tab {
    fn title(self) -> &'static str {
        match self {
            Tab::Dashboard     => "Dashboard",
            Tab::Customers     => "Customers",
            Tab::Subscriptions => "Subscriptions",
            Tab::Invoices      => "Invoices",
            Tab::Plans         => "Plans",
            Tab::Products      => "Products",
            Tab::Families      => "Families",
            Tab::Coupons       => "Coupons",
        }
    }
    fn key(self) -> &'static str {
        match self {
            Tab::Dashboard     => "1",
            Tab::Customers     => "2",
            Tab::Subscriptions => "3",
            Tab::Invoices      => "4",
            Tab::Plans         => "5",
            Tab::Products      => "6",
            Tab::Families      => "7",
            Tab::Coupons       => "8",
        }
    }
}

// ── Detail views ────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
enum DetailView {
    #[default]
    None,
    Help,
    Customer(usize),
    Subscription(usize),
    Invoice(usize),
    Plan(usize),
    Product(usize),
    Family(usize),
    Coupon(usize),
}

impl DetailView {
    fn tab(&self) -> Option<Tab> {
        match self {
            DetailView::Customer(_)     => Some(Tab::Customers),
            DetailView::Subscription(_) => Some(Tab::Subscriptions),
            DetailView::Invoice(_)      => Some(Tab::Invoices),
            DetailView::Plan(_)         => Some(Tab::Plans),
            DetailView::Product(_)      => Some(Tab::Products),
            DetailView::Family(_)       => Some(Tab::Families),
            DetailView::Coupon(_)       => Some(Tab::Coupons),
            _ => None,
        }
    }
}

// ── App state ───────────────────────────────────────────────────────────

struct App {
    current_tab: Tab,
    frame: Frame,
    detail: DetailView,
    selected_row: usize,
    profile_name: String,
    profile_url: String,
    profile_kind: ProfileKind,
}

// ── Entry ───────────────────────────────────────────────────────────────

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = parse_args();
    if args.help {
        println!("{}", HELP);
        return Ok(());
    }

    match args.command.as_deref() {
        Some("setup") => { config::setup_wizard()?; return Ok(()); }
        Some("profiles") => { config::list_profiles()?; return Ok(()); }
        Some("delete-profile") => { config::delete_profile(args.profile_name.as_deref())?; return Ok(()); }
        _ => {}
    }

    let (api_url, api_key, kind, profile_name) = resolve_connection(&args)?;
    if api_url.is_empty() {
        eprintln!("error: no URL. Run `meteroid-console setup` or pass --api-url");
        std::process::exit(1);
    }

    let opts = MeteroidOptions { server_url: Some(api_url.clone()), ..Default::default() };
    let meteroid = Meteroid::new(api_key, Some(opts));

    let config = SubscriberConfig { meteroid, poll_interval: Duration::from_secs(5) };
    let subscriber = Subscriber::start(config);

    crossterm::terminal::enable_raw_mode()?;
    let mut stdout = std::io::stdout();
    crossterm::execute!(stdout, crossterm::terminal::EnterAlternateScreen)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let mut app = App {
        current_tab: Tab::Dashboard,
        frame: subscriber.rx.borrow().clone(),
        detail: DetailView::None,
        selected_row: 0,
        profile_name,
        profile_url: api_url,
        profile_kind: kind,
    };

    let mut rx = subscriber.rx;
    let result = run_loop(&mut terminal, &mut app, &mut rx).await;

    crossterm::terminal::disable_raw_mode()?;
    crossterm::execute!(terminal.backend_mut(), crossterm::terminal::LeaveAlternateScreen)?;
    result
}

fn resolve_connection(args: &Args) -> Result<(String, String, ProfileKind, String), Box<dyn std::error::Error>> {
    if let Some(url) = &args.api_url {
        return Ok((url.clone(),
            std::env::var("METEROID_API_KEY").unwrap_or_default(),
            ProfileKind::Direct,
            "cli".into()));
    }
    if let Some(name) = &args.profile {
        let profiles = ProfilesFile::load()?;
        if let Some(p) = profiles.get(name) {
            return Ok((p.url.clone(), p.api_key.clone().unwrap_or_default(), p.kind, name.clone()));
        }
        eprintln!("error: profile '{}' not found", name);
        std::process::exit(1);
    }
    let profiles = ProfilesFile::load()?;
    if let Some((name, p)) = profiles.active_profile() {
        return Ok((p.url.clone(), p.api_key.clone().unwrap_or_default(), p.kind, name.clone()));
    }
    Ok((String::new(), String::new(), ProfileKind::Direct, "none".into()))
}

// ── Event loop ─────────────────────────────────────────────────────────

async fn run_loop(
    terminal: &mut Terminal<CrosstermBackend<std::io::Stdout>>,
    app: &mut App,
    rx: &mut tokio::sync::watch::Receiver<Frame>,
) -> Result<(), Box<dyn std::error::Error>> {
    let mut tick = tokio::time::interval(Duration::from_millis(250));
    let mut needs_redraw = true;
    loop {
        tokio::select! {
            _ = tick.tick() => {
                if rx.has_changed().unwrap_or(false) {
                    app.frame = rx.borrow_and_update().clone();
                    needs_redraw = true;
                }
                if let Ok(true) = event::poll(Duration::from_secs(0)) {
                    if let Ok(CEvent::Key(key)) = event::read() {
                        if key.kind == KeyEventKind::Press {
                            if handle_key(app, key.code) {
                                return Ok(());
                            }
                            needs_redraw = true;
                        }
                    }
                }
                if needs_redraw {
                    terminal.draw(|f| draw_ui(f, app))?;
                    needs_redraw = false;
                }
            }
        }
    }
}

// ── Key handling ────────────────────────────────────────────────────────

fn handle_key(app: &mut App, code: KeyCode) -> bool {
    // Help overlay catches everything except quit/esc
    if matches!(app.detail, DetailView::Help) {
        match code {
            KeyCode::Char('q') | KeyCode::Char('Q') => return true,
            KeyCode::Esc | KeyCode::Char('?') | KeyCode::Enter => {
                app.detail = DetailView::None;
            }
            _ => {}
        }
        return false;
    }

    match code {
        KeyCode::Char('q') | KeyCode::Char('Q') => return true,
        KeyCode::Char('?') => { app.detail = DetailView::Help; }
        KeyCode::Esc => app.detail = DetailView::None,
        KeyCode::Tab | KeyCode::Right => app.next_tab(),
        KeyCode::BackTab | KeyCode::Left => app.prev_tab(),
        KeyCode::Up   => app.move_sel(-1),
        KeyCode::Down => app.move_sel(1),
        KeyCode::Enter => app.open_detail(),
        KeyCode::Char(c) if c.is_ascii_digit() => {
            let n = (c as u8 - b'1') as usize;
            if n < ALL_TABS.len() {
                app.current_tab = ALL_TABS[n];
                app.detail = DetailView::None;
                app.selected_row = 0;
            }
        }
        _ => {}
    }
    false
}

// ── App helpers ─────────────────────────────────────────────────────────

impl App {
    fn next_tab(&mut self) {
        let idx = ALL_TABS.iter().position(|t| *t == self.current_tab).unwrap_or(0);
        self.current_tab = ALL_TABS[(idx + 1) % ALL_TABS.len()];
        self.detail = DetailView::None;
        self.selected_row = 0;
    }
    fn prev_tab(&mut self) {
        let idx = ALL_TABS.iter().position(|t| *t == self.current_tab).unwrap_or(0);
        self.current_tab = ALL_TABS[(idx + ALL_TABS.len() - 1) % ALL_TABS.len()];
        self.detail = DetailView::None;
        self.selected_row = 0;
    }

    fn entity_count(&self) -> usize {
        match self.current_tab {
            Tab::Customers     => self.frame.entities.customers.len(),
            Tab::Subscriptions => self.frame.entities.subscriptions.len(),
            Tab::Invoices      => self.frame.entities.invoices.len(),
            Tab::Plans         => self.frame.entities.plans.len(),
            Tab::Products      => self.frame.entities.products.len(),
            Tab::Families      => self.frame.entities.product_families.len(),
            Tab::Coupons       => self.frame.entities.coupons.len(),
            _ => 0,
        }
    }

    fn move_sel(&mut self, delta: isize) {
        if !matches!(self.detail, DetailView::None) { return; }
        let count = self.entity_count();
        if count == 0 { return; }
        self.selected_row = (self.selected_row as isize + delta).clamp(0, count as isize - 1) as usize;
    }

    fn open_detail(&mut self) {
        if !matches!(self.detail, DetailView::None) { return; }
        let idx = self.selected_row;
        if idx >= self.entity_count() { return; }
        self.detail = match self.current_tab {
            Tab::Customers     => DetailView::Customer(idx),
            Tab::Subscriptions => DetailView::Subscription(idx),
            Tab::Invoices      => DetailView::Invoice(idx),
            Tab::Plans         => DetailView::Plan(idx),
            Tab::Products      => DetailView::Product(idx),
            Tab::Families      => DetailView::Family(idx),
            Tab::Coupons       => DetailView::Coupon(idx),
            _ => return,
        };
    }
}

// ── Trait for uniform JSON detail ───────────────────────────────────────

trait Entity: serde::Serialize {}
impl Entity for meteroid_api::CustomerSummary {}
impl Entity for meteroid_api::SubscriptionSummary {}
impl Entity for meteroid_api::InvoiceSummary {}
impl Entity for meteroid_api::PlanSummary {}
impl Entity for meteroid_api::ProductSummary {}
impl Entity for meteroid_api::ProductFamilySummary {}
impl Entity for meteroid_api::CouponSummary {}

// ── UI rendering ───────────────────────────────────────────────────────

fn draw_ui(f: &mut ratatui::Frame, app: &App) {
    // Layout: header (3 rows for tab bar + profile info), main, footer (1 row status bar)
    let chunks = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints([
            RtConstraint::Length(4),
            RtConstraint::Min(1),
            RtConstraint::Length(1),
        ])
        .split(f.area());

    draw_header(f, chunks[0], app);
    draw_main(f, chunks[1], app);
    draw_footer(f, chunks[2], app);

    // Detail/help overlays
    match app.detail {
        DetailView::Help => draw_help_overlay(f),
        DetailView::Customer(idx) => draw_json_detail_ref(f, app.frame.entities.customers.get(idx)),
        DetailView::Subscription(idx) => draw_json_detail_ref(f, app.frame.entities.subscriptions.get(idx)),
        DetailView::Invoice(idx) => draw_json_detail_ref(f, app.frame.entities.invoices.get(idx)),
        DetailView::Plan(idx) => draw_json_detail_ref(f, app.frame.entities.plans.get(idx)),
        DetailView::Product(idx) => draw_json_detail_ref(f, app.frame.entities.products.get(idx)),
        DetailView::Family(idx) => draw_json_detail_ref(f, app.frame.entities.product_families.get(idx)),
        DetailView::Coupon(idx) => draw_json_detail_ref(f, app.frame.entities.coupons.get(idx)),
        _ => {}
    }
}

// ── Header ──────────────────────────────────────────────────────────────

fn draw_header(f: &mut ratatui::Frame, area: ratatui::layout::Rect, app: &App) {
    let rows = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints([RtConstraint::Length(1), RtConstraint::Length(3)])
        .split(area);

    // Line 1: profile name + kind + URL (right-aligned)
    let kind = match app.profile_kind {
        ProfileKind::Direct => "\u{1f310}",
        ProfileKind::Sidecar => "\u{1f4e1}",
    };
    let profile_info = format!("{kind} {}  {}", app.profile_name, app.profile_url);
    let p1 = tf::Paragraph::new(vec![tf::Line::from(profile_info.as_str())]);
    f.render_widget(p1, rows[0]);

    // Line 2-3: tab bar
    let mut block = tf::Block::new()
        .title(tf::Line::from("Meteroid Console"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, rows[1]);

    let inner = inner_rect(rows[1], 1, 1);
    let mut text = String::from(" ");
    for (i, tab) in ALL_TABS.iter().enumerate() {
        if i > 0 { text.push_str("  "); }
        if *tab == app.current_tab {
            text.push_str(&format!("\u{25b8} {} [{}] \u{25c2}", tab.title(), tab.key()));
        } else {
            text.push_str(&format!("{} [{}]", tab.title(), tab.key()));
        }
    }
    f.render_widget(tf::Paragraph::new(vec![tf::Line::from(text.as_str())]), inner);
}

// ── Main content ────────────────────────────────────────────────────────

fn draw_main(f: &mut ratatui::Frame, area: ratatui::layout::Rect, app: &App) {
    match app.current_tab {
        Tab::Dashboard => draw_dashboard(f, area, &app.frame.metrics),
        Tab::Customers => draw_entity_table::<meteroid_api::CustomerSummary>(
            f, area, "Customers", &["ID", "Name", "Email", "Currency"],
            &app.frame.entities.customers, app.selected_row,
            |c| vec![c.id.clone(), c.name.clone(), c.email.clone(), c.currency.clone()],
        ),
        Tab::Subscriptions => draw_entity_table::<meteroid_api::SubscriptionSummary>(
            f, area, "Subscriptions", &["ID", "Customer", "Plan", "Status", "MRR"],
            &app.frame.entities.subscriptions, app.selected_row,
            |s| vec![s.id.clone(), s.customer_name.clone(), s.plan_name.clone(), s.status.clone(), format!("{:.2}", s.mrr_cents as f64 / 100.0)],
        ),
        Tab::Invoices => draw_entity_table::<meteroid_api::InvoiceSummary>(
            f, area, "Invoices", &["ID", "Customer", "Number", "Status", "Amount"],
            &app.frame.entities.invoices, app.selected_row,
            |i| vec![i.id.clone(), i.customer_name.clone(), i.invoice_number.clone(), i.status.clone(), format!("{:.2}", i.amount_due as f64 / 100.0)],
        ),
        Tab::Plans => draw_entity_table::<meteroid_api::PlanSummary>(
            f, area, "Plans", &["ID", "Name", "Type", "Status", "Ver"],
            &app.frame.entities.plans, app.selected_row,
            |p| vec![p.id.clone(), p.name.clone(), p.plan_type.clone(), p.status.clone(), p.version.to_string()],
        ),
        Tab::Products => draw_entity_table::<meteroid_api::ProductSummary>(
            f, area, "Products", &["ID", "Name", "Fee Type"],
            &app.frame.entities.products, app.selected_row,
            |p| vec![p.id.clone(), p.name.clone(), p.fee_type.clone()],
        ),
        Tab::Families => draw_entity_table::<meteroid_api::ProductFamilySummary>(
            f, area, "Product Families", &["ID", "Name"],
            &app.frame.entities.product_families, app.selected_row,
            |f| vec![f.id.clone(), f.name.clone()],
        ),
        Tab::Coupons => draw_entity_table::<meteroid_api::CouponSummary>(
            f, area, "Coupons", &["ID", "Code", "Discount", "Disabled"],
            &app.frame.entities.coupons, app.selected_row,
            |c| vec![c.id.clone(), c.code.clone(), c.discount.clone(), c.disabled.to_string()],
        ),
    }
}

// ── Entity table (generic) ─────────────────────────────────────────────

fn draw_entity_table<T>(
    f: &mut ratatui::Frame, area: ratatui::layout::Rect,
    title: &str, headers: &[&str],
    entities: &[T], selected: usize,
    to_row: fn(&T) -> Vec<String>,
) {
    let mut block = tf::Block::new()
        .title(tf::Line::from(title))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);
    let inner = inner_rect(area, 1, 1);

    let row_data: Vec<Vec<String>> = entities.iter().enumerate().map(|(i, e)| {
        let mut row = to_row(e);
        if i == selected && !row.is_empty() {
            row[0] = format!("\u{276f} {}", row[0]);
        }
        row
    }).collect();

    if row_data.is_empty() {
        f.render_widget(tf::Paragraph::new(vec![tf::Line::from("(no data)")]), inner);
        return;
    }

    let col_count = headers.len();
    let col_w = (inner.width / col_count as u16).max(12);
    let widths: Vec<tf::Constraint> = (0..col_count).map(|_| tf::Constraint::Length(col_w)).collect();

    let refs: Vec<[&str; 8]> = row_data.iter()
        .map(|r| {
            let mut arr = [""; 8];
            for (j, s) in r.iter().enumerate().take(8) {
                arr[j] = s.as_str();
            }
            arr
        })
        .collect();

    let n = col_count.min(8);
    let header_arr: [&str; 8] = {
        let mut h = [""; 8];
        for (j, s) in headers.iter().enumerate().take(8) {
            h[j] = s;
        }
        h
    };

    // Use a dynamically-sized approach: render as Paragraph lines
    let lines: Vec<String> = refs.iter().map(|r| {
        (0..n).map(|j| {
            let w = col_w as usize;
            let s = r[j];
            if s.len() > w { format!("{}…", &s[..w.saturating_sub(1)]) } else { format!("{:width$}", s, width = w) }
        }).collect::<Vec<_>>().join(" ")
    }).collect();

    let padded_headers: Vec<String> = headers.iter().map(|h| {
        if h.len() > col_w as usize {
            format!("{:width$}", &h[..col_w as usize], width = col_w as usize)
        } else {
            format!("{:width$}", h, width = col_w as usize)
        }
    }).collect();
    let mut all_lines: Vec<tf::Line> = padded_headers.iter().map(|s| tf::Line::from(s.as_str())).collect();

    // Empty line separator
    all_lines.push(tf::Line::from(""));

    for line in &lines {
        all_lines.push(tf::Line::from(line.as_str()));
    }

    f.render_widget(tf::Paragraph::new(all_lines), inner);
}

// ── Dashboard ──────────────────────────────────────────────────────────

fn draw_dashboard(f: &mut ratatui::Frame, area: ratatui::layout::Rect, metrics: &MetricsSnapshot) {
    let mut block = tf::Block::new()
        .title(tf::Line::from("Dashboard"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);
    let inner = inner_rect(area, 1, 1);

    let rows = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints(vec![
            RtConstraint::Length(3), RtConstraint::Length(3), RtConstraint::Length(3),
            RtConstraint::Length(3), RtConstraint::Length(3), RtConstraint::Length(3),
            RtConstraint::Length(3), RtConstraint::Length(3), RtConstraint::Length(3),
        ])
        .split(inner);

    let items = vec![
        format!("MRR:               {}", metrics.mrr),
        format!("Active Subscriptions: {}", metrics.active_subscriptions),
        format!("Active Customers:     {}", metrics.active_customers),
        format!("Overdue Invoices:     {}", metrics.overdue_invoices),
        format!("Total Revenue:        {}", metrics.total_revenue),
        format!("Plans:                {}", metrics.total_plans),
        format!("Products:             {}", metrics.total_products),
        format!("Coupons:              {}", metrics.total_coupons),
    ];
    for (i, text) in items.iter().enumerate() {
        let mut b = tf::Block::new().title(tf::Line::from(text)).border_style(tf::Border::minimal());
        b.style.fg = tf::Color::Indexed(3);
        f.render_widget(b, rows[i]);
    }
}

// ── Footer ──────────────────────────────────────────────────────────────

fn draw_footer(f: &mut ratatui::Frame, area: ratatui::layout::Rect, app: &App) {
    let kind = match app.profile_kind {
        ProfileKind::Direct => "DIRECT",
        ProfileKind::Sidecar => "SIDECAR",
    };
    let status = format!(
        " [{tab}] {title}   \
         {profile}@{kind}   \
         \u{25b8}/\u{25c2} tab  \
         j/k row  \
         Enter detail  \
         ? help  \
         q quit",
        tab = app.current_tab.key(),
        title = app.current_tab.title(),
        profile = app.profile_name,
        kind = kind,
    );
    f.render_widget(tf::Paragraph::new(vec![tf::Line::from(status.as_str())]), area);
}

// ── Help overlay ────────────────────────────────────────────────────────

fn draw_help_overlay(f: &mut ratatui::Frame) {
    let area = centered_rect(60, 70, f.area());
    let mut block = tf::Block::new()
        .title(tf::Line::from("Help"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);
    let inner = inner_rect(area, 1, 1);

    let lines = vec![
        "Keys:",
        "",
        "  1-8       Switch to tab",
        "  Tab/Right  Next tab",
        "  Shift+Tab/Left  Prev tab",
        "  j/Up      Select previous row",
        "  k/Down    Select next row",
        "  Enter     Open detail view",
        "  ?         Toggle this help",
        "  Esc       Close detail/help",
        "  q/Q       Quit",
        "",
        "Tabs:",
        "  1 Dashboard  5 Plans",
        "  2 Customers  6 Products",
        "  3 Subs       7 Families",
        "  4 Invoices   8 Coupons",
        "",
        "Profile info shown in header.",
        "Data refreshes every 5 seconds.",
        "",
        "Press any key to close.",
    ];
    let p = tf::Paragraph::new(lines.into_iter().map(tf::Line::from).collect());
    f.render_widget(p, inner);
}

// ── JSON detail overlay ─────────────────────────────────────────────────

fn draw_json_detail_ref<T: serde::Serialize>(f: &mut ratatui::Frame, entity: Option<&T>) {
    let area = centered_rect(70, 70, f.area());
    let mut block = tf::Block::new()
        .title(tf::Line::from("Detail"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);
    let inner = inner_rect(area, 1, 1);

    let body = match entity.and_then(|e| serde_json::to_string_pretty(e).ok()) {
        Some(s) => s,
        None => "(no detail)".into(),
    };
    let p = tf::Paragraph::new(body.lines().map(tf::Line::from).collect::<Vec<_>>());
    f.render_widget(p, inner);
}

// ── Layout helpers ──────────────────────────────────────────────────────

fn centered_rect(percent_x: u16, percent_y: u16, r: ratatui::layout::Rect) -> ratatui::layout::Rect {
    let popup_layout = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints([
            RtConstraint::Percentage((100 - percent_y) / 2),
            RtConstraint::Percentage(percent_y),
            RtConstraint::Percentage((100 - percent_y) / 2),
        ])
        .split(r);
    RtLayout::default()
        .direction(RtDirection::Horizontal)
        .constraints([
            RtConstraint::Percentage((100 - percent_x) / 2),
            RtConstraint::Percentage(percent_x),
            RtConstraint::Percentage((100 - percent_x) / 2),
        ])
        .split(popup_layout[1])[1]
}

fn inner_rect(r: ratatui::layout::Rect, border: u16, _title: u16) -> ratatui::layout::Rect {
    ratatui::layout::Rect {
        x: r.x + border,
        y: r.y + border,
        width: r.width.saturating_sub(border * 2),
        height: r.height.saturating_sub(border * 2),
    }
}

// ── CLI ─────────────────────────────────────────────────────────────────

const HELP: &str = r#"meteroid-console — TUI for Meteroid billing

Usage:
  meteroid-console [OPTIONS]
  meteroid-console setup
  meteroid-console profiles

Subcommands:
  setup                Interactive profile setup wizard
  profiles             List saved profiles
  delete-profile NAME  Delete a saved profile

Options:
  --profile NAME       Use a saved profile
  --api-url URL        Use the Meteroid API directly
  --help, -h           Show this help

Keys (also available by pressing ? in the TUI):
  1-8 / Tab           Switch tabs
  j/k / Up/Down       Navigate rows
  Enter               Open detail (JSON)
  ?                   Help
  q                   Quit

Environment:
  METEROID_API_KEY     API key
"#;

struct Args {
    command: Option<String>,
    profile: Option<String>,
    profile_name: Option<String>,
    api_url: Option<String>,
    help: bool,
}

fn parse_args() -> Args {
    let mut args = std::env::args().skip(1).peekable();
    let mut command = None;
    let mut profile = None;
    let mut profile_name = None;
    let mut api_url = None;
    let mut help = false;

    if let Some(first) = args.peek() {
        if !first.starts_with('-') { command = args.next(); }
    }
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--profile" => profile = args.next(),
            "--api-url" => api_url = args.next(),
            "--help" | "-h" => help = true,
            _ => {
                if command.as_deref() == Some("delete-profile") && profile_name.is_none() {
                    profile_name = Some(arg);
                }
            }
        }
    }
    Args { command, profile, profile_name, api_url, help }
}
