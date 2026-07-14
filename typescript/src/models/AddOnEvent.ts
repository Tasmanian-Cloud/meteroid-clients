/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOnEventData } from './AddOnEventData';
import type { EventId } from './EventId';
import type { EventType } from './EventType';
export type AddOnEvent = (AddOnEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

