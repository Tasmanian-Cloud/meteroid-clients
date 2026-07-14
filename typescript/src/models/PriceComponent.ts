/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Fee } from './Fee';
import type { PriceComponentId } from './PriceComponentId';
import type { ProductId } from './ProductId';
export type PriceComponent = {
    fee?: (null | Fee);
    id: PriceComponentId;
    name: string;
    product_id?: (null | ProductId);
};

