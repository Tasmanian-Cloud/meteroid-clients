/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerId } from './CustomerId';
export type CustomerEventData = {
    alias?: string | null;
    billing_email?: string | null;
    currency: string;
    customer_id: CustomerId;
    invoicing_emails: Array<string>;
    name: string;
    phone?: string | null;
};

