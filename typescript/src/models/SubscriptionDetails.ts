/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppliedCouponDetailed } from './AppliedCouponDetailed';
import type { BillingPeriodEnum } from './BillingPeriodEnum';
import type { Currency } from './Currency';
import type { CustomerId } from './CustomerId';
import type { Entitlement } from './Entitlement';
import type { MinimumCommitment } from './MinimumCommitment';
import type { PaymentMethodsConfig } from './PaymentMethodsConfig';
import type { PlanId } from './PlanId';
import type { PlanVersionId } from './PlanVersionId';
import type { SubscriptionAddOn } from './SubscriptionAddOn';
import type { SubscriptionComponent } from './SubscriptionComponent';
import type { SubscriptionId } from './SubscriptionId';
import type { SubscriptionStatusEnum } from './SubscriptionStatusEnum';
export type SubscriptionDetails = {
    /**
     * When the subscription was activated (first payment or activation condition met)
     */
    activated_at?: string | null;
    add_ons: Array<SubscriptionAddOn>;
    applied_coupons: Array<AppliedCouponDetailed>;
    auto_advance_invoices: boolean;
    billing_day_anchor: number;
    /**
     * When billing started (after any trial period)
     */
    billing_start_date?: string | null;
    charge_automatically: boolean;
    checkout_url?: string | null;
    components: Array<SubscriptionComponent>;
    /**
     * When the subscription was created
     */
    created_at: string;
    currency: Currency;
    /**
     * Current billing period end date
     */
    current_period_end?: string | null;
    /**
     * Current billing period start date
     */
    current_period_start: string;
    customer_alias?: string | null;
    customer_id: CustomerId;
    customer_name: string;
    /**
     * When the subscription ends (if set)
     */
    end_date?: string | null;
    entitlements?: Array<Entitlement>;
    id: SubscriptionId;
    /**
     * Default memo for invoices
     */
    invoice_memo?: string | null;
    minimum_commitment?: (null | MinimumCommitment);
    /**
     * Monthly recurring revenue in cents
     */
    mrr_cents: number;
    /**
     * Payment terms in days (0 = due on issue)
     */
    net_terms: number;
    payment_methods_config?: (null | PaymentMethodsConfig);
    /**
     * Billing period (monthly, annual, etc.)
     */
    period: BillingPeriodEnum;
    plan_id: PlanId;
    plan_name: string;
    plan_version: number;
    plan_version_id: PlanVersionId;
    purchase_order?: string | null;
    /**
     * When the subscription contract starts (benefits apply from this date)
     */
    start_date: string;
    status: SubscriptionStatusEnum;
    /**
     * Trial duration in days
     */
    trial_duration?: number | null;
};

