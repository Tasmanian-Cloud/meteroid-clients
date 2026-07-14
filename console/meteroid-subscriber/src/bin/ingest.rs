//! meteroid-subscriber-ingest — ingest usage events from stdin/file into Meteroid
//!
//! Reads newline-delimited JSON events from stdin and sends them to Meteroid.
//!
//! Usage:
//!   export METEROID_API_KEY=sk_...
//!   cat events.ndjson | meteroid-subscriber-ingest
//!   meteroid-subscriber-ingest --file events.ndjson

use meteroid_rs::api::{Meteroid, MeteroidOptions};
use std::io::BufRead;

fn load_client() -> Meteroid {
    let key = std::env::var("METEROID_API_KEY").unwrap_or_else(|_| {
        eprintln!("error: METEROID_API_KEY not set");
        std::process::exit(1);
    });
    let url = std::env::var("METEROID_API_URL").ok();
    let opts = MeteroidOptions {
        server_url: url,
        ..Default::default()
    };
    Meteroid::new(key, Some(opts))
}

fn parse_event(line: &str) -> Option<meteroid_rs::models::IngestEventsRequest> {
    serde_json::from_str::<meteroid_rs::models::IngestEventsRequest>(line)
        .or_else(|_| {
            // Try parsing as a single Event wrapped in a batch
            serde_json::from_str::<meteroid_rs::models::Event>(line).map(|ev| {
                meteroid_rs::models::IngestEventsRequest {
                    events: vec![ev],
                    allow_backfilling: None,
                    allow_partial_failures: None,
                }
            })
        })
        .ok()
}

#[tokio::main]
async fn main() {
    let client = load_client();

    let reader: Box<dyn BufRead> = if let Some(path) = std::env::args().nth(1) {
        match std::fs::File::open(&path) {
            Ok(f) => Box::new(std::io::BufReader::new(f)),
            Err(e) => {
                eprintln!("error opening {path}: {e}");
                return;
            }
        }
    } else {
        Box::new(std::io::BufReader::new(std::io::stdin()))
    };

    let mut success = 0u64;
    let mut failure = 0u64;

    for line in reader.lines() {
        let line = match line {
            Ok(l) if l.trim().is_empty() => continue,
            Ok(l) => l,
            Err(e) => {
                eprintln!("read error: {e}");
                break;
            }
        };

        match parse_event(&line) {
            Some(req) => match client.events().ingest_events(req).await {
                Ok(resp) => {
                    success += 1;
                    if let Some(fails) = resp.failures {
                        for f in &fails {
                            eprintln!("event failure: {f:?}");
                            failure += 1;
                        }
                    }
                }
                Err(e) => {
                    eprintln!("ingest error: {e}");
                    failure += 1;
                }
            },
            None => {
                eprintln!("skipping unparseable line: {line}");
                failure += 1;
            }
        }
    }

    eprintln!("ingested: {success} ok, {failure} failed");
}
