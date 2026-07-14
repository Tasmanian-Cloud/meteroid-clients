//! Subscriber — collects Meteroid data and produces `meteroid_api::Frame`s.
//!
//! The subscriber can run as a library or as a standalone daemon. In library
//! mode it returns a `tokio::sync::watch` channel of the latest frame. In
//! daemon mode it exposes the same data over a transport (gRPC/HTTP) for the
//! console to consume.

use chrono::Utc;
use meteroid_api::{
    CustomerSummary, EntitySnapshot, Event, Frame, InvoiceSummary, MetricsSnapshot,
    SubscriptionSummary,
};
use meteroid_rs::api::Meteroid;
use tokio::sync::watch;

/// Configuration for the subscriber's data collection.
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

/// A handle to the running subscriber.
pub struct Subscriber {
    pub rx: watch::Receiver<Frame>,
}

impl Subscriber {
    /// Start collecting data in the background.
    pub fn start(config: SubscriberConfig) -> Self {
        let (tx, rx) = watch::channel(Frame::default());
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(config.poll_interval);
            let mut previous: Option<EntitySnapshot> = None;
            loop {
                interval.tick().await;
                let frame = match collect_frame(&config.meteroid).await {
                    Ok(f) => f,
                    Err(e) => {
                        let mut error_frame = Frame::default();
                        error_frame.events.push(Event {
                            timestamp: Utc::now(),
                            event_type: "subscriber.error".into(),
                            payload: serde_json::json!({"message": e.to_string() }),
                        });
                        error_frame
                    }
                };
                let diff_events = diff_entities(previous.as_ref(), &frame.entities);
                previous = Some(frame.entities.clone());

                let mut frame = frame;
                frame.events.extend(diff_events);
                let _ = tx.send(frame);
            }
        });
        Subscriber { rx }
    }
}

/// Collect one frame of data from Meteroid.
pub async fn collect_frame(client: &Meteroid) -> Result<Frame, meteroid_rs::error::Error> {
    let customers = client.customers().list_customers(None).await?;
    let subscriptions = client.subscriptions().list_subscriptions(None).await?;
    let invoices = client.invoices().list_invoices(None).await?;

    let customer_summaries: Vec<CustomerSummary> = customers
        .data
        .into_iter()
        .map(|c| CustomerSummary {
            id: c.id,
            name: c.name,
            email: c.billing_email.unwrap_or_default(),
            billing_address: c.billing_address.map(|a| format!("{:?}", a)),
        })
        .collect();

    let active_customers = customer_summaries
        .iter()
        .filter(|c| !c.email.is_empty())
        .count();

    let subscription_summaries: Vec<SubscriptionSummary> = subscriptions
        .data
        .into_iter()
        .map(|s| SubscriptionSummary {
            id: s.id,
            customer_id: s.customer_id,
            customer_name: s.customer_name,
            plan_id: s.plan_id,
            status: s.status.to_string(),
            billing_start_date: s.billing_start_date,
        })
        .collect();

    let active_subscriptions = subscription_summaries
        .iter()
        .filter(|s| s.status.eq_ignore_ascii_case("active"))
        .count();

    let invoice_summaries: Vec<InvoiceSummary> = invoices
        .data
        .into_iter()
        .map(|i| InvoiceSummary {
            id: i.id,
            customer_id: i.customer_id,
            customer_name: i.customer_details.name,
            status: i.payment_status.to_string(),
            invoice_date: Some(i.invoice_date),
            total: i.amount_due,
        })
        .collect();

    let overdue_invoices = invoice_summaries
        .iter()
        .filter(|i| i.status.eq_ignore_ascii_case("overdue"))
        .count();

    let total_revenue: i64 = invoice_summaries.iter().map(|i| i.total as i64).sum();

    let mrr = estimate_mrr(&subscription_summaries, &invoice_summaries);

    Ok(Frame {
        timestamp: Utc::now(),
        entities: EntitySnapshot {
            customers: customer_summaries,
            subscriptions: subscription_summaries,
            invoices: invoice_summaries,
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
            overdue_invoices,
            total_revenue,
        },
    })
}

/// Diff two entity snapshots and emit events for additions/removals.
fn diff_entities(previous: Option<&EntitySnapshot>, current: &EntitySnapshot) -> Vec<Event> {
    let mut events = Vec::new();
    let now = Utc::now();
    if let Some(prev) = previous {
        let prev_customer_ids: std::collections::HashSet<&str> =
            prev.customers.iter().map(|c| c.id.as_str()).collect();
        let curr_customer_ids: std::collections::HashSet<&str> =
            current.customers.iter().map(|c| c.id.as_str()).collect();
        for c in &current.customers {
            if !prev_customer_ids.contains(c.id.as_str()) {
                events.push(Event {
                    timestamp: now,
                    event_type: "customer.created".into(),
                    payload: serde_json::to_value(c).unwrap_or_default(),
                });
            }
        }
        for c in &prev.customers {
            if !curr_customer_ids.contains(c.id.as_str()) {
                events.push(Event {
                    timestamp: now,
                    event_type: "customer.removed".into(),
                    payload: serde_json::to_value(c).unwrap_or_default(),
                });
            }
        }

        let prev_subscription_ids: std::collections::HashSet<&str> =
            prev.subscriptions.iter().map(|s| s.id.as_str()).collect();
        let curr_subscription_ids: std::collections::HashSet<&str> = current
            .subscriptions
            .iter()
            .map(|s| s.id.as_str())
            .collect();
        for s in &current.subscriptions {
            if !prev_subscription_ids.contains(s.id.as_str()) {
                events.push(Event {
                    timestamp: now,
                    event_type: "subscription.created".into(),
                    payload: serde_json::to_value(s).unwrap_or_default(),
                });
            }
        }
        for s in &prev.subscriptions {
            if !curr_subscription_ids.contains(s.id.as_str()) {
                events.push(Event {
                    timestamp: now,
                    event_type: "subscription.removed".into(),
                    payload: serde_json::to_value(s).unwrap_or_default(),
                });
            }
        }

        let prev_invoice_ids: std::collections::HashSet<&str> =
            prev.invoices.iter().map(|i| i.id.as_str()).collect();
        let _curr_invoice_ids: std::collections::HashSet<&str> =
            current.invoices.iter().map(|i| i.id.as_str()).collect();
        for i in &current.invoices {
            if !prev_invoice_ids.contains(i.id.as_str()) {
                events.push(Event {
                    timestamp: now,
                    event_type: "invoice.created".into(),
                    payload: serde_json::to_value(i).unwrap_or_default(),
                });
            }
        }
    }
    events
}

/// Very rough MRR estimate: average active subscription invoice total.
fn estimate_mrr(_subscriptions: &[SubscriptionSummary], invoices: &[InvoiceSummary]) -> f64 {
    let active_total: i64 = invoices
        .iter()
        .filter(|i| i.status.eq_ignore_ascii_case("paid"))
        .map(|i| i.total as i64)
        .sum();
    // Simple monthly estimate: assume most invoices are monthly.
    active_total as f64 / 12.0
}

/// Standalone subscriber daemon entry point (see `src/bin/subscriber.rs`).
pub async fn run_daemon(config: SubscriberConfig) {
    let _ = Subscriber::start(config);
    // Keep the process alive. The console connects to a future transport.
    let (tx, _rx) = tokio::sync::oneshot::channel::<()>();
    let _ = tx;
    std::future::pending::<()>().await;
}
