/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CouponId } from './CouponId';
import type { CreateSubscriptionComponents } from './CreateSubscriptionComponents';
import type { PaymentMethodsConfig } from './PaymentMethodsConfig';
import type { PlanVersionId } from './PlanVersionId';
export type CreateCheckoutSessionRequest = {
    add_ons?: any[] | null;
    /**
     * If false, invoices will stay in Draft until manually reviewed and finalized. Default is true.
     */
    auto_advance_invoices?: boolean | null;
    billing_day_anchor?: number | null;
    billing_start_date?: string | null;
    /**
     * Automatically try to charge the customer's configured payment method on finalize. Default is true.
     */
    charge_automatically?: boolean | null;
    components?: (null | CreateSubscriptionComponents);
    coupon_code?: string | null;
    coupon_ids?: Array<CouponId>;
    /**
     * Customer ID or alias
     */
    customer_id: string;
    end_date?: string | null;
    /**
     * Session expiry time in hours. Default is 1 hour for self-serve checkout.
     */
    expires_in_hours?: number | null;
    invoice_memo?: string | null;
    invoice_threshold?: string | null;
    metadata?: any;
    net_terms?: number | null;
    payment_methods_config?: (null | PaymentMethodsConfig);
    plan_version_id: PlanVersionId;
    purchase_order?: string | null;
    trial_duration_days?: number | null;
};

