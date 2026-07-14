/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { CapacityThreshold } from './CapacityThreshold';
/**
 * Capacity-based fee with included committed usage and overage
 */
export type CapacityPlanFee = {
    cadence: BillingPeriodEnum;
    metric_id: BillableMetricId;
    thresholds: Array<CapacityThreshold>;
};

