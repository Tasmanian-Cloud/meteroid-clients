/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PriceId } from './PriceId';
import type { ProductId } from './ProductId';
export type CreateAddOnRequest = {
    description?: string | null;
    max_instances_per_subscription?: number | null;
    name: string;
    price_id: PriceId;
    product_id: ProductId;
    self_serviceable?: boolean;
};

