use chrono::Utc;
use meteroid_api::*;
use meteroid_rs::api::Meteroid;
use tokio::sync::watch;

#[derive(Clone)]
pub struct SubscriberConfig {
    pub meteroid: Meteroid,
    pub poll_interval: std::time::Duration,
}

impl std::fmt::Debug for SubscriberConfig {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("SubscriberConfig")
            .field("poll_interval", &self.poll_interval)
            .finish()
    }
}

pub struct Subscriber {
    pub rx: watch::Receiver<Frame>,
}

impl Subscriber {
    pub fn start(config: SubscriberConfig) -> Self {
        let (tx, rx) = watch::channel(Frame::default());
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(config.poll_interval);
            loop {
                interval.tick().await;
                match collect_frame(&config.meteroid).await {
                    Ok(f) => { let _ = tx.send(f); }
                    Err(e) => {
                        let mut ef = Frame::default();
                        ef.events.push(Event {
                            timestamp: Utc::now(),
                            event_type: "subscriber.error".into(),
                            payload: serde_json::json!({"message": e.to_string()}),
                        });
                        let _ = tx.send(ef);
                    }
                }
            }
        });
        Subscriber { rx }
    }
}

pub async fn collect_frame(client: &Meteroid) -> Result<Frame, meteroid_rs::error::Error> {
    let c = client.customers();
    let s = client.subscriptions();
    let i = client.invoices();
    let p = client.plans();
    let pr = client.products();
    let pf = client.product_families();
    let co = client.coupons();

    let (customers_res, subscriptions_res, invoices_res, plans_res, products_res, families_res, coupons_res) = tokio::join!(
        c.list_customers(None),
        s.list_subscriptions(None),
        i.list_invoices(None),
        p.list_plans(None),
        pr.list_products(None),
        pf.list_product_families(None),
        co.list_coupons(None),
    );

    let customers_data = customers_res.unwrap_or_default().data;
    let subscriptions_data = subscriptions_res.unwrap_or_default().data;
    let invoices_data = invoices_res.unwrap_or_default().data;
    let plans_data = plans_res.unwrap_or_default().data;
    let products_data = products_res.unwrap_or_default().data;
    let families_data = families_res.unwrap_or_default().data;
    let coupons_data = coupons_res.unwrap_or_default().data;

    let customer_summaries: Vec<_> = customers_data.into_iter().map(|c| CustomerSummary {
        id: c.id, name: c.name,
        email: c.billing_email.unwrap_or_default(),
        alias: c.alias,
        currency: format!("{:?}", c.currency),
        billing_address: c.billing_address.map(|a| format!("{:?}", a)),
    }).collect();
    let active_customers = customer_summaries.iter().filter(|c| !c.email.is_empty()).count();

    let subscription_summaries: Vec<_> = subscriptions_data.into_iter().map(|s| SubscriptionSummary {
        id: s.id, customer_name: s.customer_name,
        plan_id: s.plan_id, plan_name: s.plan_name,
        status: s.status.to_string(), mrr_cents: s.mrr_cents,
        billing_start_date: s.billing_start_date,
        current_period_start: s.current_period_start,
        current_period_end: s.current_period_end,
    }).collect();
    let active_subscriptions = subscription_summaries.iter().filter(|s| s.status.eq_ignore_ascii_case("active")).count();

    let invoice_summaries: Vec<_> = invoices_data.into_iter().map(|i| InvoiceSummary {
        id: i.id, customer_name: i.customer_details.name,
        invoice_number: i.invoice_number,
        status: i.status.to_string(), payment_status: i.payment_status.to_string(),
        invoice_date: i.invoice_date, amount_due: i.amount_due,
        total: i.total, currency: format!("{:?}", i.currency),
    }).collect();
    let overdue = invoice_summaries.iter().filter(|i| i.status.eq_ignore_ascii_case("overdue")).count();
    let total_revenue: i64 = invoice_summaries.iter().map(|i| i.total as i64).sum();

    let plan_summaries: Vec<_> = plans_data.into_iter().map(|p| PlanSummary {
        id: p.id, name: p.name,
        plan_type: format!("{:?}", p.plan_type),
        currency: p.currency, status: format!("{:?}", p.status),
        version: p.version, description: p.description,
    }).collect();

    let product_summaries: Vec<_> = products_data.into_iter().map(|p| ProductSummary {
        id: p.id, name: p.name,
        fee_type: format!("{:?}", p.fee_type),
    }).collect();

    let family_summaries: Vec<_> = families_data.into_iter().map(|f| ProductFamilySummary {
        id: f.id, name: f.name,
    }).collect();

    let coupon_summaries: Vec<_> = coupons_data.into_iter().map(|c| CouponSummary {
        id: c.id, code: c.code,
        discount: format!("{:?}", c.discount),
        disabled: c.disabled, expires_at: c.expires_at,
    }).collect();

    let total_plans = plan_summaries.len();
    let total_products = product_summaries.len();
    let total_coupons = coupon_summaries.len();

    let mrr = estimate_mrr(&subscription_summaries, &invoice_summaries);

    Ok(Frame {
        timestamp: Utc::now(),
        entities: EntitySnapshot {
            customers: customer_summaries,
            subscriptions: subscription_summaries,
            invoices: invoice_summaries,
            plans: plan_summaries,
            products: product_summaries,
            product_families: family_summaries,
            coupons: coupon_summaries,
        },
        events: vec![Event {
            timestamp: Utc::now(),
            event_type: "subscriber.tick".into(),
            payload: serde_json::json!({"source": "meteroid-subscriber"}),
        }],
        metrics: MetricsSnapshot {
            mrr: format!("{:.2}", mrr),
            active_subscriptions,
            active_customers,
            overdue_invoices: overdue,
            total_revenue,
            total_plans,
            total_products,
            total_coupons,
        },
    })
}

fn estimate_mrr(_subscriptions: &[SubscriptionSummary], invoices: &[InvoiceSummary]) -> f64 {
    let active_total: i64 = invoices.iter()
        .filter(|i| i.status.eq_ignore_ascii_case("paid"))
        .map(|i| i.total as i64).sum();
    active_total as f64 / 12.0
}

pub async fn run_daemon(config: SubscriberConfig) {
    let _ = Subscriber::start(config);
    let (tx, _rx) = tokio::sync::oneshot::channel::<()>();
    let _ = tx;
    std::future::pending::<()>().await;
}
