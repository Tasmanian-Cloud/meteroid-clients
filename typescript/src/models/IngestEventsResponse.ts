/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IngestFailure } from './IngestFailure';
export type IngestEventsResponse = {
    /**
     * Events that failed to ingest. Omitted when no failures.
     */
    failures?: Array<IngestFailure>;
};

