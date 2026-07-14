/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingConfig } from './BillingConfig';
import type { PlanAddOnInput } from './PlanAddOnInput';
import type { PlanStatusEnum } from './PlanStatusEnum';
import type { PlanTypeEnum } from './PlanTypeEnum';
import type { PriceComponentInput } from './PriceComponentInput';
import type { ProductFamilyId } from './ProductFamilyId';
import type { TrialConfig } from './TrialConfig';
export type CreatePlanRequest = {
    add_ons?: Array<PlanAddOnInput>;
    billing?: (null | BillingConfig);
    components: Array<PriceComponentInput>;
    currency: string;
    description?: string | null;
    name: string;
    plan_type: PlanTypeEnum;
    product_family_id: ProductFamilyId;
    self_service_rank?: number | null;
    status: PlanStatusEnum;
    trial?: (null | TrialConfig);
};

