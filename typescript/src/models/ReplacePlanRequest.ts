/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingConfig } from './BillingConfig';
import type { MinimumCommitmentInput } from './MinimumCommitmentInput';
import type { PlanAddOnInput } from './PlanAddOnInput';
import type { PlanStatusEnum } from './PlanStatusEnum';
import type { PriceComponentInput } from './PriceComponentInput';
import type { TrialConfig } from './TrialConfig';
export type ReplacePlanRequest = {
    add_ons?: Array<PlanAddOnInput>;
    billing?: (null | BillingConfig);
    components: Array<PriceComponentInput>;
    currency: string;
    description?: string | null;
    minimum_commitment?: (null | MinimumCommitmentInput);
    name: string;
    status?: (null | PlanStatusEnum);
    trial?: (null | TrialConfig);
};

