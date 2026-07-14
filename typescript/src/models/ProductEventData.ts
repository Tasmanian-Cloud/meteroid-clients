/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductFamilyId } from './ProductFamilyId';
import type { ProductFeeTypeEnum } from './ProductFeeTypeEnum';
import type { ProductId } from './ProductId';
export type ProductEventData = {
    created_at: string;
    description?: string | null;
    fee_type: ProductFeeTypeEnum;
    name: string;
    product_family_id: ProductFamilyId;
    product_id: ProductId;
};

