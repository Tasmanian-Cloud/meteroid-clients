//! Standalone subscriber daemon.
//!
//! Run with:
//!   METEROID_API_KEY=... cargo run --bin meteroid-subscriber -- --api-url http://localhost:8084

use meteroid_rs::api::{Meteroid, MeteroidOptions};
use meteroid_subscriber::{run_daemon, SubscriberConfig};
use std::time::Duration;

#[tokio::main]
async fn main() {
    let api_key = std::env::var("METEROID_API_KEY").unwrap_or_default();
    let api_url =
        std::env::var("METEROID_API_URL").unwrap_or_else(|_| "http://localhost:8084".into());

    let opts = MeteroidOptions {
        server_url: Some(api_url),
        ..Default::default()
    };
    let meteroid = Meteroid::new(api_key, Some(opts));

    let config = SubscriberConfig {
        meteroid,
        poll_interval: Duration::from_secs(5),
    };

    run_daemon(config).await;
}
