/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Event = {
    /**
     * Billable metric code. Max 512 characters.
     */
    code: string;
    /**
     * Meteroid customer ID or external customer alias.
     */
    customer_id: string;
    /**
     * Unique event identifier. Max 255 characters. A UUID or ULID is recommended.
     */
    event_id: string;
    /**
     * Arbitrary string key-value pairs used by billable metrics for filtering and aggregation.
     */
    properties?: Record<string, string>;
    /**
     * RFC 3339 timestamp. Defaults to ingestion time if omitted.
     * Must be between 24 hours ago and 1 hour from now. Set `allow_backfilling` to remove the past limit.
     */
    timestamp: string;
};

