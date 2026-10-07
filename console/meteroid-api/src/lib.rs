//! Shared types for the Meteroid console stack.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Frame {
    pub timestamp: DateTime<Utc>,
    pub entities: EntitySnapshot,
    pub events: Vec<Event>,
    pub metrics: MetricsSnapshot,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct EntitySnapshot {
    pub customers: Vec<CustomerSummary>,
    pub subscriptions: Vec<SubscriptionSummary>,
    pub invoices: Vec<InvoiceSummary>,
    pub plans: Vec<PlanSummary>,
    pub products: Vec<ProductSummary>,
    pub product_families: Vec<ProductFamilySummary>,
    pub coupons: Vec<CouponSummary>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct CustomerSummary {
    pub id: String,
    pub name: String,
    pub email: String,
    pub alias: Option<String>,
    pub currency: String,
    pub billing_address: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SubscriptionSummary {
    pub id: String,
    pub customer_name: String,
    pub plan_id: String,
    pub plan_name: String,
    pub status: String,
    pub mrr_cents: i32,
    pub billing_start_date: Option<String>,
    pub current_period_start: String,
    pub current_period_end: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct InvoiceSummary {
    pub id: String,
    pub customer_name: String,
    pub invoice_number: String,
    pub status: String,
    pub payment_status: String,
    pub invoice_date: String,
    pub amount_due: i32,
    pub total: i32,
    pub currency: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct PlanSummary {
    pub id: String,
    pub name: String,
    pub plan_type: String,
    pub currency: String,
    pub status: String,
    pub version: i32,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ProductSummary {
    pub id: String,
    pub name: String,
    pub fee_type: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ProductFamilySummary {
    pub id: String,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct CouponSummary {
    pub id: String,
    pub code: String,
    pub discount: String,
    pub disabled: bool,
    pub expires_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Event {
    pub timestamp: DateTime<Utc>,
    pub event_type: String,
    pub payload: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct MetricsSnapshot {
    pub mrr: String,
    pub active_subscriptions: usize,
    pub active_customers: usize,
    pub overdue_invoices: usize,
    pub total_revenue: i64,
    pub total_plans: usize,
    pub total_products: usize,
    pub total_coupons: usize,
}
