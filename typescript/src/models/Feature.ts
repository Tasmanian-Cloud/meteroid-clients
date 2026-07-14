/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Entitlement } from './Entitlement';
import type { FeatureId } from './FeatureId';
import type { FeatureStatus } from './FeatureStatus';
import type { FeatureType } from './FeatureType';
import type { ProductRef } from './ProductRef';
export type Feature = {
    /**
     * Unique key used to reference this feature in your code. Cannot be changed after creation.
     */
    code: string;
    created_at: string;
    description?: string | null;
    entitlement?: (null | Entitlement);
    feature_type: FeatureType;
    id: FeatureId;
    name: string;
    product?: (null | ProductRef);
    status: FeatureStatus;
};

