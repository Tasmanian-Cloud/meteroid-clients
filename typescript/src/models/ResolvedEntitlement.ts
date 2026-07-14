/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureRef } from './FeatureRef';
import type { ResolvedEntitlementValue } from './ResolvedEntitlementValue';
/**
 * Merged entitlement value for a feature across the priority hierarchy, without usage data.
 */
export type ResolvedEntitlement = {
    feature: FeatureRef;
    value: ResolvedEntitlementValue;
};

