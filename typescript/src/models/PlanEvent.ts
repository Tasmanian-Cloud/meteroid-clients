/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventId } from './EventId';
import type { EventType } from './EventType';
import type { PlanEventData } from './PlanEventData';
export type PlanEvent = (PlanEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

