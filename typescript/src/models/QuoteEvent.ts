/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventId } from './EventId';
import type { EventType } from './EventType';
import type { QuoteEventData } from './QuoteEventData';
export type QuoteEvent = (QuoteEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

