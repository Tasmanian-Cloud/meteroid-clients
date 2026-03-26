// this file is @generated
use serde::{Deserialize, Serialize};

use super::grouped_usage::GroupedUsage;

#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct MetricUsage {
    pub grouped_usage: Vec<GroupedUsage>,

    pub metric_code: String,

    pub metric_id: String,

    pub metric_name: String,

    pub total_value: String,
}

impl MetricUsage {
    pub fn new(
        grouped_usage: Vec<GroupedUsage>,
        metric_code: String,
        metric_id: String,
        metric_name: String,
        total_value: String,
    ) -> Self {
        Self {
            grouped_usage,
            metric_code,
            metric_id,
            metric_name,
            total_value,
        }
    }
}
