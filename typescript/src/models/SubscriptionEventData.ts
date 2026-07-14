/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { CustomerId } from './CustomerId';
import type { SubscriptionId } from './SubscriptionId';
import type { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
export type SubscriptionEventData = {
    activated_at?: string | null;
    billing_day_anchor: number;
    billing_start_date?: string | null;
    created_at: string;
    currency: string;
    customer_alias?: string | null;
    customer_id: CustomerId;
    customer_name: string;
    end_date?: string | null;
    invoice_memo?: string | null;
    invoice_threshold?: string | null;
    mrr_cents: number;
    net_terms: number;
    period: BillingPeriodEnum;
    plan_name: string;
    start_date: string;
    status: SubscriptionStatusEnum;
    subscription_id: SubscriptionId;
    trial_duration?: number | null;
    version: number;
};

