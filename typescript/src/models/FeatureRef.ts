/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureId } from './FeatureId';
import type { ProductRef } from './ProductRef';
export type FeatureRef = {
    /**
     * Unique key used to reference this feature in your code. Cannot be changed after creation.
     */
    code: string;
    id: FeatureId;
    name: string;
    product?: (null | ProductRef);
};

