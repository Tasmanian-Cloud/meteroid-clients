/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppliedCouponId } from './AppliedCouponId';
import type { CouponId } from './CouponId';
export type AppliedCoupon = {
    applied_amount?: string | null;
    applied_count?: number | null;
    coupon_id: CouponId;
    created_at: string;
    id: AppliedCouponId;
    is_active: boolean;
    last_applied_at?: string | null;
};

