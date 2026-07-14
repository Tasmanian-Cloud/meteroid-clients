/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CouponEventData } from './CouponEventData';
import type { EventId } from './EventId';
import type { EventType } from './EventType';
export type CouponEvent = (CouponEventData & {
    id: EventId;
    timestamp: string;
    type: EventType;
});

