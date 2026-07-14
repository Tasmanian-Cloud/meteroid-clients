/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EffectiveEntitlementValue } from './EffectiveEntitlementValue';
import type { FeatureRef } from './FeatureRef';
/**
 * Merged entitlement value for a feature for a specific customer, enriched with live usage data.
 */
export type EffectiveEntitlement = {
    feature: FeatureRef;
    value: EffectiveEntitlementValue;
};

