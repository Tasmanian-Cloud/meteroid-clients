/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarUnit } from './CalendarUnit';
/**
 * Resets on calendar boundaries (e.g. the 1st of every month) — not tied to subscription start date.
 */
export type CalendarResetPeriod = {
    interval: number;
    unit: CalendarUnit;
};

