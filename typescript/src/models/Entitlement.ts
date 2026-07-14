/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntitlementId } from './EntitlementId';
import type { EntitlementValue } from './EntitlementValue';
import type { FeatureId } from './FeatureId';
/**
 * A raw entitlement row attached to one entity (feature, plan version, add-on, or subscription).
 */
export type Entitlement = {
    created_at: string;
    feature_id: FeatureId;
    id: EntitlementId;
    updated_at: string;
    value: EntitlementValue;
};

