/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingPeriodEnum } from './BillingPeriodEnum';
export type AvailableParameters = {
    /**
     * Map of component_id -> available billing periods (e.g., "MONTHLY", "ANNUAL")
     */
    billing_periods?: Record<string, Array<BillingPeriodEnum>>;
    /**
     * Map of component_id -> available capacity values
     */
    capacity_thresholds?: Record<string, Array<number>>;
    /**
     * List of component_ids that support slot parametrization (initial slot count)
     */
    slot_components?: Array<string>;
};

