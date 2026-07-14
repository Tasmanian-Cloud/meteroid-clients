/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductFamilyId } from './ProductFamilyId';
import type { ProductFeeStructure } from './ProductFeeStructure';
export type CreateProductRequest = {
    catalog?: boolean;
    description?: string | null;
    fee_structure: ProductFeeStructure;
    name: string;
    product_family_id: ProductFamilyId;
};

