/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CouponDiscount } from './CouponDiscount';
import type { PlanId } from './PlanId';
export type CreateCouponRequest = {
    code: string;
    description?: string | null;
    discount: CouponDiscount;
    expires_at?: string | null;
    plan_ids?: Array<PlanId>;
    recurring_value?: number | null;
    redemption_limit?: number | null;
    reusable?: boolean;
};

