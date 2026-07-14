/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CouponDiscount } from './CouponDiscount';
import type { CouponId } from './CouponId';
export type CouponEventData = {
    code: string;
    coupon_id: CouponId;
    created_at: string;
    description: string;
    disabled: boolean;
    discount: CouponDiscount;
    expires_at?: string | null;
    recurring_value?: number | null;
    redemption_limit?: number | null;
    reusable: boolean;
};

