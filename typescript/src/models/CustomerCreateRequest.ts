/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { Currency } from './Currency';
import type { CustomTaxRate } from './CustomTaxRate';
import type { InvoicingEntityId } from './InvoicingEntityId';
import type { ShippingAddress } from './ShippingAddress';
export type CustomerCreateRequest = {
    alias?: string | null;
    billing_address?: (null | Address);
    billing_email?: string | null;
    connected_account_id?: string | null;
    currency: Currency;
    custom_taxes: Array<CustomTaxRate>;
    invoicing_emails: Array<string>;
    invoicing_entity_id?: (null | InvoicingEntityId);
    is_tax_exempt?: boolean | null;
    name: string;
    phone?: string | null;
    shipping_address?: (null | ShippingAddress);
    vat_number?: string | null;
};

