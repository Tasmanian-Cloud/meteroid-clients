/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { BillingType } from './BillingType';
/**
 * Extra recurring fee
 */
export type ExtraRecurringPlanFee = {
    billing_type: BillingType;
    cadence: BillingPeriodEnum;
    quantity: number;
    unit_price: string;
};

