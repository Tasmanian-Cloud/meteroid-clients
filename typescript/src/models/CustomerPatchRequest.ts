/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { Currency } from './Currency';
import type { InvoicingEntityId } from './InvoicingEntityId';
import type { ShippingAddress } from './ShippingAddress';
export type CustomerPatchRequest = {
    alias?: string | null;
    billing_address?: (null | Address);
    billing_email?: string | null;
    currency?: (null | Currency);
    custom_taxes?: any[] | null;
    invoicing_emails?: any[] | null;
    invoicing_entity_id?: (null | InvoicingEntityId);
    is_tax_exempt?: boolean | null;
    name?: string | null;
    phone?: string | null;
    shipping_address?: (null | ShippingAddress);
    vat_number?: string | null;
};

