/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentMethodsConfig } from './PaymentMethodsConfig';
export type SubscriptionUpdateRequest = {
    /**
     * If false, invoices will stay in Draft until manually reviewed and finalized.
     */
    auto_advance_invoices?: boolean | null;
    /**
     * Automatically try to charge the customer's configured payment method on finalize.
     */
    charge_automatically?: boolean | null;
    /**
     * Default memo for invoices
     */
    invoice_memo?: string | null;
    /**
     * Payment terms in days (0 = due on issue)
     */
    net_terms?: number | null;
    payment_methods_config?: (null | PaymentMethodsConfig);
    /**
     * Purchase order number
     */
    purchase_order?: string | null;
};

