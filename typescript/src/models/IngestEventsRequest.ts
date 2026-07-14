/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from './Event';
export type IngestEventsRequest = {
    /**
     * Allow events with timestamps more than 1 day in the past. Defaults to `false`.
     */
    allow_backfilling?: boolean | null;
    /**
     * Accept the batch even if some events fail validation. Defaults to `false`.
     * When `true`, valid events are ingested and failures are reported in the response body.
     * When `false` (default), any invalid event rejects the entire batch.
     */
    allow_partial_failures?: boolean | null;
    /**
     * 1–100 events per request.
     */
    events: Array<Event>;
};

