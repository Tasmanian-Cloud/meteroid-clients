/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanId } from './PlanId';
import type { PlanStatusEnum } from './PlanStatusEnum';
import type { PlanTypeEnum } from './PlanTypeEnum';
export type PlanEventData = {
    created_at: string;
    currency: string;
    description?: string | null;
    name: string;
    plan_id: PlanId;
    plan_type: PlanTypeEnum;
    status: PlanStatusEnum;
    version: number;
};

