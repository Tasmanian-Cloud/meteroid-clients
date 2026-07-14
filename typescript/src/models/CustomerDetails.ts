/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { CustomerId } from './CustomerId';
export type CustomerDetails = {
    alias?: string | null;
    billing_address?: (null | Address);
    email?: string | null;
    id: CustomerId;
    name: string;
    snapshot_at: string;
    vat_number?: string | null;
};

