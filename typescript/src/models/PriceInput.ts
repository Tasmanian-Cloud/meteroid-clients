/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { Pricing } from './Pricing';
export type PriceInput = {
    cadence: BillingPeriodEnum;
    currency: string;
    pricing: Pricing;
};

