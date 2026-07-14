/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditNoteEventData } from './CreditNoteEventData';
import type { EventId } from './EventId';
import type { EventType } from './EventType';
export type CreditNoteEvent = (CreditNoteEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

