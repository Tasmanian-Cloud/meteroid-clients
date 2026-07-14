/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerEventData } from './CustomerEventData';
import type { EventId } from './EventId';
import type { EventType } from './EventType';
/**
 * Event-specific webhook schemas for type-safe webhook payloads
 */
export type CustomerEvent = (CustomerEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

