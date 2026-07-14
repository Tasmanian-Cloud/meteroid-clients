//! Shared types for the Meteroid console stack.
//!
//! This crate defines the wire-format-agnostic data model used by both the
//! subscriber (data producer) and the console (TUI client). It intentionally
//! has no transport dependency — the subscriber and console agree on a
//! serialization later.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// A snapshot of a console data frame.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Frame {
    pub timestamp: DateTime<Utc>,
    pub entities: EntitySnapshot,
    pub events: Vec<Event>,
    pub metrics: MetricsSnapshot,
}

/// Entity counts and key summaries.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct EntitySnapshot {
    pub customers: Vec<CustomerSummary>,
    pub subscriptions: Vec<SubscriptionSummary>,
    pub invoices: Vec<InvoiceSummary>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct CustomerSummary {
    pub id: String,
    pub name: String,
    pub email: String,
    pub billing_address: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SubscriptionSummary {
    pub id: String,
    pub customer_id: String,
    pub customer_name: String,
    pub plan_id: String,
    pub status: String,
    pub billing_start_date: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct InvoiceSummary {
    pub id: String,
    pub customer_id: String,
    pub customer_name: String,
    pub status: String,
    pub invoice_date: Option<String>,
    pub total: i32,
}

/// A single billing event.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Event {
    pub timestamp: DateTime<Utc>,
    pub event_type: String,
    pub payload: serde_json::Value,
}

/// Aggregated metrics.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct MetricsSnapshot {
    pub mrr: String,
    pub active_subscriptions: usize,
    pub active_customers: usize,
    pub overdue_invoices: usize,
    pub total_revenue: i64,
}
