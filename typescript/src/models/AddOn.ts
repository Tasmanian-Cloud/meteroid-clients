/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOnId } from './AddOnId';
import type { Entitlement } from './Entitlement';
import type { PriceId } from './PriceId';
import type { ProductFeeTypeEnum } from './ProductFeeTypeEnum';
import type { ProductId } from './ProductId';
export type AddOn = {
    archived_at?: string | null;
    created_at: string;
    description?: string | null;
    entitlements?: Array<Entitlement>;
    fee_type?: (null | ProductFeeTypeEnum);
    id: AddOnId;
    max_instances_per_subscription?: number | null;
    name: string;
    price_id: PriceId;
    product_id: ProductId;
    self_serviceable: boolean;
};

