/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResetPeriod } from './ResetPeriod';
export type MeteredEntitlementValue = {
    /**
     * Per-entitlement kill switch. `false` means disabled.
     */
    enabled?: boolean;
    /**
     * Cap on usage. Null means unlimited.
     */
    limit?: string | null;
    reset_period?: ResetPeriod;
};

