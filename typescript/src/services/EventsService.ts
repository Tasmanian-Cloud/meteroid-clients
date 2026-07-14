/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IngestEventsRequest } from '../models/IngestEventsRequest';
import type { IngestEventsResponse } from '../models/IngestEventsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * Ingest events
     * Ingest usage events for metering and billing purposes.
     *
     * Events are deduplicated by `(event_id, customer_id)` — re-sending the same pair will not be
     * double-counted. If timestamps differ across duplicates, the event with the latest timestamp is used.
     *
     * By default, any invalid event rejects the entire batch. Set `allow_partial_failures` to `true` to ingest valid events and receive per-event failure details in the response body.
     * @param requestBody
     * @returns IngestEventsResponse Events ingested successfully
     * @throws ApiError
     */
    public static ingestEvents(
        requestBody: IngestEventsRequest,
    ): CancelablePromise<IngestEventsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/events/ingest',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
