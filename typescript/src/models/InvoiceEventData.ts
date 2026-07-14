/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerId } from './CustomerId';
import type { InvoiceId } from './InvoiceId';
import type { InvoiceStatus } from './InvoiceStatus';
export type InvoiceEventData = {
    consolidated_into_invoice_id?: (null | InvoiceId);
    created_at: string;
    currency: string;
    customer_id: CustomerId;
    invoice_id: InvoiceId;
    status: InvoiceStatus;
    tax_amount: number;
    total: number;
};

