/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductFamilyId } from './ProductFamilyId';
import type { ProductFeeStructure } from './ProductFeeStructure';
import type { ProductFeeTypeEnum } from './ProductFeeTypeEnum';
import type { ProductId } from './ProductId';
export type Product = {
    archived_at?: string | null;
    catalog: boolean;
    created_at: string;
    description?: string | null;
    fee_structure: ProductFeeStructure;
    fee_type: ProductFeeTypeEnum;
    id: ProductId;
    name: string;
    product_family_id: ProductFamilyId;
};

