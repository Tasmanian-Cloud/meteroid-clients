/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { PlanUsagePricingModel } from './PlanUsagePricingModel';
/**
 * Usage-based fee
 */
export type UsagePlanFee = {
    cadence: BillingPeriodEnum;
    metric_id: BillableMetricId;
    pricing: PlanUsagePricingModel;
};

