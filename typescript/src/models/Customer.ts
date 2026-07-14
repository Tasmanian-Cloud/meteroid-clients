/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { Currency } from './Currency';
import type { CustomerId } from './CustomerId';
import type { CustomTaxRate } from './CustomTaxRate';
import type { InvoicingEntityId } from './InvoicingEntityId';
import type { ShippingAddress } from './ShippingAddress';
export type Customer = {
    alias?: string | null;
    billing_address?: (null | Address);
    billing_email?: string | null;
    connected_account_id?: string | null;
    currency: Currency;
    custom_taxes: Array<CustomTaxRate>;
    id: CustomerId;
    invoicing_emails: Array<string>;
    invoicing_entity_id: InvoicingEntityId;
    name: string;
    phone?: string | null;
    shipping_address?: (null | ShippingAddress);
    vat_number?: string | null;
};

