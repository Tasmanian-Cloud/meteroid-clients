/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditNoteId } from './CreditNoteId';
import type { CreditNoteStatus } from './CreditNoteStatus';
import type { CustomerId } from './CustomerId';
import type { InvoiceId } from './InvoiceId';
export type CreditNoteEventData = {
    created_at: string;
    credit_note_id: CreditNoteId;
    credited_amount_cents: number;
    currency: string;
    customer_id: CustomerId;
    invoice_id: InvoiceId;
    refunded_amount_cents: number;
    status: CreditNoteStatus;
    tax_amount: number;
    total: number;
};

