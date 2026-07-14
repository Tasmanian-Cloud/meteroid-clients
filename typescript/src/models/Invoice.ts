/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CouponLineItem } from './CouponLineItem';
import type { Currency } from './Currency';
import type { CustomerDetails } from './CustomerDetails';
import type { CustomerId } from './CustomerId';
import type { InvoiceId } from './InvoiceId';
import type { InvoiceLineItem } from './InvoiceLineItem';
import type { InvoicePaymentStatus } from './InvoicePaymentStatus';
import type { InvoiceStatus } from './InvoiceStatus';
import type { InvoiceType } from './InvoiceType';
import type { SubscriptionId } from './SubscriptionId';
import type { TaxBreakdownItem } from './TaxBreakdownItem';
import type { Transaction } from './Transaction';
export type Invoice = {
    amount_due: number;
    applied_credits: number;
    coupons: Array<CouponLineItem>;
    created_at: string;
    currency: Currency;
    customer_details: CustomerDetails;
    customer_id: CustomerId;
    due_date?: string | null;
    finalized_at?: string | null;
    id: InvoiceId;
    invoice_date: string;
    invoice_number: string;
    invoice_type: InvoiceType;
    line_items: Array<InvoiceLineItem>;
    marked_as_uncollectible_at?: string | null;
    memo?: string | null;
    net_terms: number;
    paid_at?: string | null;
    payment_status: InvoicePaymentStatus;
    purchase_order?: string | null;
    reference?: string | null;
    status: InvoiceStatus;
    subscription_id?: (null | SubscriptionId);
    subtotal: number;
    subtotal_recurring: number;
    tax_amount: number;
    tax_breakdown: Array<TaxBreakdownItem>;
    total: number;
    transactions: Array<Transaction>;
    updated_at?: string | null;
    voided_at?: string | null;
};

