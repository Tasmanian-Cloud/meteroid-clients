/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaxExemptionType } from './TaxExemptionType';
export type TaxBreakdownItem = {
    exemption_type?: (null | TaxExemptionType);
    name: string;
    tax_amount: number;
    tax_rate: string;
    taxable_amount: number;
};

