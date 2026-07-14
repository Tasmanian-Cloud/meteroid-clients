/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailableParameters } from './AvailableParameters';
import type { Entitlement } from './Entitlement';
import type { MinimumCommitment } from './MinimumCommitment';
import type { PlanId } from './PlanId';
import type { PlanStatusEnum } from './PlanStatusEnum';
import type { PlanTypeEnum } from './PlanTypeEnum';
import type { PlanVersionId } from './PlanVersionId';
import type { PriceComponent } from './PriceComponent';
import type { ProductFamily } from './ProductFamily';
import type { TrialConfig } from './TrialConfig';
export type Plan = {
    available_parameters: AvailableParameters;
    billing_cycles?: number | null;
    created_at: string;
    currency: string;
    description?: string | null;
    entitlements?: Array<Entitlement>;
    id: PlanId;
    minimum_commitment?: (null | MinimumCommitment);
    name: string;
    net_terms: number;
    period_start_day?: number | null;
    plan_type: PlanTypeEnum;
    price_components: Array<PriceComponent>;
    product_family: ProductFamily;
    self_service_rank?: number | null;
    status: PlanStatusEnum;
    trial?: (null | TrialConfig);
    version: number;
    version_id: PlanVersionId;
};

