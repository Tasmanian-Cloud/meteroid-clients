/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutSessionId } from './CheckoutSessionId';
import type { CheckoutSessionStatus } from './CheckoutSessionStatus';
import type { CheckoutType } from './CheckoutType';
import type { CustomerId } from './CustomerId';
import type { PaymentMethodsConfig } from './PaymentMethodsConfig';
import type { PlanVersionId } from './PlanVersionId';
import type { SubscriptionId } from './SubscriptionId';
export type CheckoutSession = {
    billing_day_anchor?: number | null;
    billing_start_date?: string | null;
    checkout_type: CheckoutType;
    checkout_url?: string | null;
    completed_at?: string | null;
    coupon_code?: string | null;
    created_at: string;
    customer_id: CustomerId;
    /**
     * When the session expires. None means the session never expires.
     */
    expires_at?: string | null;
    id: CheckoutSessionId;
    net_terms?: number | null;
    payment_methods_config?: (null | PaymentMethodsConfig);
    plan_version_id: PlanVersionId;
    status: CheckoutSessionStatus;
    subscription_id?: (null | SubscriptionId);
    trial_duration_days?: number | null;
};

