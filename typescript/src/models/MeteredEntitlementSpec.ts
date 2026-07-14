/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { ResetPeriod } from './ResetPeriod';
export type MeteredEntitlementSpec = {
    enabled: boolean;
    limit?: string | null;
    metric_id: BillableMetricId;
    reset_period: ResetPeriod;
};

