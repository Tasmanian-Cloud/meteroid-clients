/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubLineItem } from './SubLineItem';
export type InvoiceLineItem = {
    amount_total: number;
    description?: string | null;
    end_date: string;
    name: string;
    quantity?: string;
    start_date: string;
    sub_line_items: Array<SubLineItem>;
    tax_rate: string;
    unit_price?: string;
};

