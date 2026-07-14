//! meteroid-console — a tokio-console-style TUI for Meteroid billing.
//!
//! Run directly against Meteroid:
//!   METEROID_API_KEY=... cargo run --bin meteroid-console -- --api-url http://localhost:8084
//!
//! Or against the bedrock sidecar billing proxy:
//!   cargo run --bin meteroid-console -- --sidecar-url http://localhost:8081
//!
//! Profiles live in `$XDG_CONFIG_HOME/meteroid-console/profiles.toml`.
//!
//! Subcommands:
//!   meteroid-console setup              Interactive setup wizard
//!   meteroid-console profiles           List profiles
//!   meteroid-console delete-profile [NAME]  Delete a profile
//!   meteroid-console --profile NAME     Run TUI with a saved profile

use std::time::Duration;

use crossterm::event::{self, Event as CEvent, KeyCode, KeyEventKind};
use meteroid_api::{Event, Frame, MetricsSnapshot};
use meteroid_rs::api::{Meteroid, MeteroidOptions};
use meteroid_subscriber::{Subscriber, SubscriberConfig};
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint as RtConstraint, Direction as RtDirection, Layout as RtLayout},
    Terminal,
};
use textfold::tui as tf;

mod config;
use config::{delete_profile, list_profiles, setup_wizard, ProfileKind, ProfilesFile};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Tab {
    Dashboard,
    Entities,
    Events,
}

impl Tab {
    const ALL: &[Tab] = &[Tab::Dashboard, Tab::Entities, Tab::Events];
    fn title(self) -> &'static str {
        match self {
            Tab::Dashboard => "Dashboard",
            Tab::Entities => "Entities",
            Tab::Events => "Events",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
enum DetailView {
    #[default]
    None,
    Customer(usize),
    Subscription(usize),
    Invoice(usize),
}

struct App {
    current_tab: Tab,
    frame: Frame,
    last_error: Option<String>,
    detail: DetailView,
    selected_row: [usize; 3],
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = parse_args();
    if args.help {
        println!("{}", HELP);
        return Ok(());
    }

    match args.command.as_deref() {
        Some("setup") => {
            setup_wizard()?;
            return Ok(());
        }
        Some("profiles") => {
            list_profiles()?;
            return Ok(());
        }
        Some("delete-profile") => {
            delete_profile(args.profile_name.as_deref())?;
            return Ok(());
        }
        _ => {}
    }

    let (api_url, api_key, _kind) = resolve_connection(&args)?;
    if api_url.is_empty() {
        eprintln!(
            "error: no URL provided. Run `meteroid-console setup` or pass --api-url/--sidecar-url."
        );
        std::process::exit(1);
    }

    let opts = MeteroidOptions {
        server_url: Some(api_url),
        ..Default::default()
    };
    let meteroid = Meteroid::new(api_key, Some(opts));

    let config = SubscriberConfig {
        meteroid,
        poll_interval: Duration::from_secs(5),
    };
    let subscriber = Subscriber::start(config);

    crossterm::terminal::enable_raw_mode()?;
    let mut stdout = std::io::stdout();
    crossterm::execute!(stdout, crossterm::terminal::EnterAlternateScreen)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let mut app = App {
        current_tab: Tab::Dashboard,
        frame: subscriber.rx.borrow().clone(),
        last_error: None,
        detail: DetailView::None,
        selected_row: [0, 0, 0],
    };

    let mut rx = subscriber.rx;
    let result = run_loop(&mut terminal, &mut app, &mut rx).await;

    crossterm::terminal::disable_raw_mode()?;
    crossterm::execute!(
        terminal.backend_mut(),
        crossterm::terminal::LeaveAlternateScreen
    )?;

    result
}

fn resolve_connection(
    args: &Args,
) -> Result<(String, String, ProfileKind), Box<dyn std::error::Error>> {
    // Command-line flags take precedence.
    if let Some(url) = &args.api_url {
        return Ok((
            url.clone(),
            std::env::var("METEROID_API_KEY").unwrap_or_default(),
            ProfileKind::Direct,
        ));
    }
    if let Some(url) = &args.sidecar_url {
        return Ok((url.clone(), String::new(), ProfileKind::Sidecar));
    }
    // Then try a named profile.
    if let Some(name) = &args.profile {
        let profiles = ProfilesFile::load()?;
        if let Some(p) = profiles.get(name) {
            return Ok((p.url.clone(), p.api_key.clone().unwrap_or_default(), p.kind));
        } else {
            eprintln!("error: profile '{}' not found", name);
            std::process::exit(1);
        }
    }
    // Finally the active profile.
    let profiles = ProfilesFile::load()?;
    if let Some((_, p)) = profiles.active_profile() {
        return Ok((
            p.url.clone(),
            p.api_key.clone().unwrap_or_default(),
            p.kind,
        ));
    }
    Ok((String::new(), String::new(), ProfileKind::Direct))
}

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

fn handle_key(app: &mut App, code: KeyCode) -> bool {
    match code {
        KeyCode::Char('q') | KeyCode::Char('Q') => return true,
        KeyCode::Char('1') => {
            app.current_tab = Tab::Dashboard;
            app.detail = DetailView::None;
        }
        KeyCode::Char('2') => {
            app.current_tab = Tab::Entities;
            app.detail = DetailView::None;
        }
        KeyCode::Char('3') => {
            app.current_tab = Tab::Events;
            app.detail = DetailView::None;
        }
        KeyCode::Left => app.prev_tab(),
        KeyCode::Right => app.next_tab(),
        KeyCode::Esc => app.detail = DetailView::None,
        KeyCode::Up => app.move_selection(-1),
        KeyCode::Down => app.move_selection(1),
        KeyCode::Enter => app.open_detail(),
        _ => {}
    }
    false
}

impl App {
    fn prev_tab(&mut self) {
        let idx = Tab::ALL
            .iter()
            .position(|t| *t == self.current_tab)
            .unwrap_or(0);
        self.current_tab = Tab::ALL[(idx + Tab::ALL.len() - 1) % Tab::ALL.len()];
        self.detail = DetailView::None;
    }
    fn next_tab(&mut self) {
        let idx = Tab::ALL
            .iter()
            .position(|t| *t == self.current_tab)
            .unwrap_or(0);
        self.current_tab = Tab::ALL[(idx + 1) % Tab::ALL.len()];
        self.detail = DetailView::None;
    }

    fn move_selection(&mut self, delta: isize) {
        if self.current_tab != Tab::Entities || !matches!(self.detail, DetailView::None) {
            return;
        }
        let table = self.focused_entity_table();
        let count = match table {
            0 => self.frame.entities.customers.len(),
            1 => self.frame.entities.subscriptions.len(),
            2 => self.frame.entities.invoices.len(),
            _ => 0,
        };
        if count == 0 {
            return;
        }
        let idx = &mut self.selected_row[table];
        let new = (*idx as isize + delta).clamp(0, count as isize - 1) as usize;
        *idx = new;
    }

    fn focused_entity_table(&self) -> usize {
        0
    }

    fn open_detail(&mut self) {
        if self.current_tab != Tab::Entities {
            return;
        }
        let table = self.focused_entity_table();
        let idx = self.selected_row[table];
        self.detail = match table {
            0 => DetailView::Customer(idx),
            1 => DetailView::Subscription(idx),
            2 => DetailView::Invoice(idx),
            _ => DetailView::None,
        };
    }
}

fn draw_ui(f: &mut ratatui::Frame, app: &App) {
    let chunks = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints([RtConstraint::Length(3), RtConstraint::Min(0)])
        .split(f.area());

    draw_tabs(f, chunks[0], app.current_tab);

    match app.current_tab {
        Tab::Dashboard => draw_dashboard(f, chunks[1], &app.frame.metrics),
        Tab::Entities => draw_entities(f, chunks[1], app),
        Tab::Events => draw_events(f, chunks[1], &app.frame.events),
    }

    if let Some(err) = &app.last_error {
        let p = tf::Paragraph::new(vec![tf::Line::from(err.as_str())]);
        f.render_widget(p, centered_rect(60, 20, f.area()));
    }

    match app.detail {
        DetailView::Customer(idx) => {
            let detail = app
                .frame
                .entities
                .customers
                .get(idx)
                .cloned()
                .unwrap_or_default();
            draw_detail(f, "Customer Detail", &serde_json::to_string_pretty(&detail).unwrap_or_default());
        }
        DetailView::Subscription(idx) => {
            let detail = app
                .frame
                .entities
                .subscriptions
                .get(idx)
                .cloned()
                .unwrap_or_default();
            draw_detail(f, "Subscription Detail", &serde_json::to_string_pretty(&detail).unwrap_or_default());
        }
        DetailView::Invoice(idx) => {
            let detail = app
                .frame
                .entities
                .invoices
                .get(idx)
                .cloned()
                .unwrap_or_default();
            draw_detail(f, "Invoice Detail", &serde_json::to_string_pretty(&detail).unwrap_or_default());
        }
        DetailView::None => {}
    }
}

fn draw_tabs(f: &mut ratatui::Frame, area: ratatui::layout::Rect, active: Tab) {
    let mut block = tf::Block::new()
        .title(tf::Line::from("Meteroid Console"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);

    let inner = inner_rect(area, 1, 1);
    let mut text = String::from(" ");
    for (i, tab) in Tab::ALL.iter().enumerate() {
        if i > 0 {
            text.push_str(" | ");
        }
        if *tab == active {
            text.push_str(&format!("[{}]", tab.title()));
        } else {
            text.push_str(tab.title());
        }
    }
    let p = tf::Paragraph::new(vec![tf::Line::from(text.as_str())]);
    f.render_widget(p, inner);
}

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
            RtConstraint::Length(3),
            RtConstraint::Length(3),
            RtConstraint::Length(3),
            RtConstraint::Length(3),
            RtConstraint::Length(3),
        ])
        .split(inner);

    let metrics_text = vec![
        format!("MRR: {}", metrics.mrr),
        format!("Active Subscriptions: {}", metrics.active_subscriptions),
        format!("Active Customers: {}", metrics.active_customers),
        format!("Overdue Invoices: {}", metrics.overdue_invoices),
        format!("Total Revenue: {}", metrics.total_revenue),
    ];

    for (i, text) in metrics_text.iter().enumerate() {
        let p = metric_box(text);
        f.render_widget(p, rows[i]);
    }
}

fn metric_box(text: &str) -> textfold::tui::Paragraph<'_> {
    let mut block = tf::Block::new()
        .title(tf::Line::from(text))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    tf::Paragraph::new(vec![tf::Line::from("")])
}

fn draw_entities(f: &mut ratatui::Frame, area: ratatui::layout::Rect, app: &App) {
    let mut block = tf::Block::new()
        .title(tf::Line::from("Entities"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);

    let inner = inner_rect(area, 1, 1);
    let chunks = RtLayout::default()
        .direction(RtDirection::Vertical)
        .constraints([
            RtConstraint::Percentage(34),
            RtConstraint::Percentage(33),
            RtConstraint::Percentage(33),
        ])
        .split(inner);

    // Customers
    {
        let customer_strings: Vec<String> = app
            .frame
            .entities
            .customers
            .iter()
            .enumerate()
            .flat_map(|(i, c)| {
                let prefix = if i == app.selected_row[0] { "> " } else { "  " };
                vec![
                    format!("{}{}", prefix, c.id),
                    c.name.clone(),
                    c.email.clone(),
                    c.billing_address.clone().unwrap_or_default(),
                ]
            })
            .collect();
        let customer_rows: Vec<[&str; 4]> = customer_strings
            .chunks(4)
            .map(|chunk| [chunk[0].as_str(), chunk[1].as_str(), chunk[2].as_str(), chunk[3].as_str()])
            .collect();
        let mut customers_block = tf::Block::new()
            .title(tf::Line::from("Customers"))
            .border_style(tf::Border::minimal());
        customers_block.style.fg = tf::Color::Indexed(3);
        f.render_widget(customers_block, chunks[0]);
        let mut customers = tf::Table::new(
            customer_rows,
            [
                tf::Constraint::Length(26),
                tf::Constraint::Length(24),
                tf::Constraint::Length(24),
                tf::Constraint::Length(24),
            ],
        );
        customers.header = Some(["ID", "Name", "Email", "Billing Address"]);
        f.render_widget(customers, inner_rect(chunks[0], 1, 1));
    }

    // Subscriptions
    {
        let subscription_strings: Vec<String> = app
            .frame
            .entities
            .subscriptions
            .iter()
            .enumerate()
            .flat_map(|(i, s)| {
                let prefix = if i == app.selected_row[1] { "> " } else { "  " };
                vec![
                    format!("{}{}", prefix, s.id),
                    s.customer_name.clone(),
                    s.plan_id.clone(),
                    s.status.clone(),
                ]
            })
            .collect();
        let subscription_rows: Vec<[&str; 4]> = subscription_strings
            .chunks(4)
            .map(|chunk| [chunk[0].as_str(), chunk[1].as_str(), chunk[2].as_str(), chunk[3].as_str()])
            .collect();
        let mut subscriptions_block = tf::Block::new()
            .title(tf::Line::from("Subscriptions"))
            .border_style(tf::Border::minimal());
        subscriptions_block.style.fg = tf::Color::Indexed(3);
        f.render_widget(subscriptions_block, chunks[1]);
        let mut subscriptions = tf::Table::new(
            subscription_rows,
            [
                tf::Constraint::Length(26),
                tf::Constraint::Length(24),
                tf::Constraint::Length(24),
                tf::Constraint::Length(12),
            ],
        );
        subscriptions.header = Some(["ID", "Customer", "Plan", "Status"]);
        f.render_widget(subscriptions, inner_rect(chunks[1], 1, 1));
    }

    // Invoices
    {
        let invoice_strings: Vec<String> = app
            .frame
            .entities
            .invoices
            .iter()
            .enumerate()
            .flat_map(|(i, inv)| {
                let prefix = if i == app.selected_row[2] { "> " } else { "  " };
                vec![
                    format!("{}{}", prefix, inv.id),
                    inv.customer_name.clone(),
                    inv.status.clone(),
                    inv.total.to_string(),
                ]
            })
            .collect();
        let invoice_rows: Vec<[&str; 4]> = invoice_strings
            .chunks(4)
            .map(|chunk| [chunk[0].as_str(), chunk[1].as_str(), chunk[2].as_str(), chunk[3].as_str()])
            .collect();
        let mut invoices_block = tf::Block::new()
            .title(tf::Line::from("Invoices"))
            .border_style(tf::Border::minimal());
        invoices_block.style.fg = tf::Color::Indexed(3);
        f.render_widget(invoices_block, chunks[2]);
        let mut invoices = tf::Table::new(
            invoice_rows,
            [
                tf::Constraint::Length(26),
                tf::Constraint::Length(24),
                tf::Constraint::Length(12),
                tf::Constraint::Length(12),
            ],
        );
        invoices.header = Some(["ID", "Customer", "Status", "Total"]);
        f.render_widget(invoices, inner_rect(chunks[2], 1, 1));
    }
}

fn draw_events(f: &mut ratatui::Frame, area: ratatui::layout::Rect, events: &[Event]) {
    let mut block = tf::Block::new()
        .title(tf::Line::from("Events"))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);

    let inner = inner_rect(area, 1, 1);
    let event_strings: Vec<[String; 3]> = events
        .iter()
        .rev()
        .take(inner.height as usize)
        .map(|e| [e.timestamp.to_rfc3339(), e.event_type.clone(), e.payload.to_string()])
        .collect();
    let rows: Vec<[&str; 3]> = event_strings
        .iter()
        .map(|s| [s[0].as_str(), s[1].as_str(), s[2].as_str()])
        .collect();
    let mut table = tf::Table::new(
        rows,
        [
            tf::Constraint::Length(24),
            tf::Constraint::Length(20),
            tf::Constraint::Min(30),
        ],
    );
    table.header = Some(["Time", "Type", "Payload"]);
    f.render_widget(table, inner);
    drop(event_strings);
}

fn draw_detail(f: &mut ratatui::Frame, title: &str, body: &str) {
    let area = centered_rect(80, 80, f.area());
    let clear = tf::Block::new().border_style(tf::Border::minimal());
    f.render_widget(clear, area);

    let mut block = tf::Block::new()
        .title(tf::Line::from(title))
        .border_style(tf::Border::minimal());
    block.style.fg = tf::Color::Indexed(15);
    f.render_widget(block, area);

    let inner = inner_rect(area, 1, 1);
    let p = tf::Paragraph::new(body.lines().map(tf::Line::from).collect::<Vec<_>>());
    f.render_widget(p, inner);
}

fn centered_rect(
    percent_x: u16,
    percent_y: u16,
    r: ratatui::layout::Rect,
) -> ratatui::layout::Rect {
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

const HELP: &str = r#"meteroid-console — TUI for Meteroid billing

Usage:
  meteroid-console [OPTIONS]
  meteroid-console setup
  meteroid-console profiles
  meteroid-console delete-profile [NAME]

Subcommands:
  setup                Interactive profile setup wizard
  profiles             List saved profiles
  delete-profile NAME  Delete a saved profile

Options:
  --profile NAME       Use a saved profile (uses active profile if omitted)
  --api-url URL        Use the Meteroid API directly
  --sidecar-url URL    Use the bedrock sidecar billing proxy
  --help, -h           Show this help

Environment:
  METEROID_API_KEY     API key for direct Meteroid access (optional for sidecar mode)

Keys:
  q / Q                Quit
  1 / 2 / 3            Switch tabs
  Left / Right         Previous / next tab
  Up / Down            Select row in Entities tab
  Enter                Open detail view
  Esc                  Close detail view
"#;

struct Args {
    command: Option<String>,
    profile: Option<String>,
    profile_name: Option<String>,
    api_url: Option<String>,
    sidecar_url: Option<String>,
    help: bool,
}

fn parse_args() -> Args {
    let mut args = std::env::args().skip(1).peekable();
    let mut command = None;
    let mut profile = None;
    let mut profile_name = None;
    let mut api_url = None;
    let mut sidecar_url = None;
    let mut help = false;

    // First positional argument is a subcommand if it doesn't start with '-'.
    if let Some(first) = args.peek() {
        if !first.starts_with('-') {
            command = args.next();
        }
    }

    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--profile" => profile = args.next(),
            "--api-url" => api_url = args.next(),
            "--sidecar-url" => sidecar_url = args.next(),
            "--help" | "-h" => help = true,
            _ => {
                if command.as_deref() == Some("delete-profile") && profile_name.is_none() {
                    profile_name = Some(arg);
                }
            }
        }
    }
    Args {
        command,
        profile,
        profile_name,
        api_url,
        sidecar_url,
        help,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn tab_titles_present() {
        assert_eq!(Tab::Dashboard.title(), "Dashboard");
        assert_eq!(Tab::Entities.title(), "Entities");
        assert_eq!(Tab::Events.title(), "Events");
    }
}
