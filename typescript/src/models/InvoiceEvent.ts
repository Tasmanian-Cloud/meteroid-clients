/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventId } from './EventId';
import type { EventType } from './EventType';
import type { InvoiceEventData } from './InvoiceEventData';
export type InvoiceEvent = (InvoiceEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

