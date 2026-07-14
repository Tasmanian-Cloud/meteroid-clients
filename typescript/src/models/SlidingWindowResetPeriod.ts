/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarUnit } from './CalendarUnit';
/**
 * Always ends at now — e.g. 30 days means the last 30 days, old usage drops off automatically.
 */
export type SlidingWindowResetPeriod = {
    interval: number;
    unit: CalendarUnit;
};

