/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSubscriptionAddOn } from './CreateSubscriptionAddOn';
import type { CreateSubscriptionComponents } from './CreateSubscriptionComponents';
import type { PaymentMethodsConfig } from './PaymentMethodsConfig';
import type { PlanId } from './PlanId';
import type { SubscriptionActivationConditionEnum } from './SubscriptionActivationConditionEnum';
export type SubscriptionCreateRequest = {
    activation_condition: SubscriptionActivationConditionEnum;
    add_ons?: Array<CreateSubscriptionAddOn>;
    auto_advance_invoices?: boolean;
    billing_day_anchor?: number | null;
    charge_automatically?: boolean;
    coupon_codes?: Array<string>;
    customer_id_or_alias: string;
    end_date?: string;
    invoice_memo?: string;
    net_terms?: number;
    /**
     * Payment methods configuration. If not specified, inherits from the invoicing entity.
     */
    payment_methods_config?: PaymentMethodsConfig;
    plan_id: PlanId;
    price_components?: CreateSubscriptionComponents;
    purchase_order?: string | null;
    /**
     * Migration mode: when true with a past start_date, skip creating invoices for past cycles.
     * The subscription will be set to the current billing period with correct cycle_index.
     */
    skip_past_invoices?: boolean;
    start_date: string;
    trial_days?: number;
    version?: number;
};

