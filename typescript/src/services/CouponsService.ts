/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Coupon } from '../models/Coupon';
import type { CouponId } from '../models/CouponId';
import type { CouponListResponse } from '../models/CouponListResponse';
import type { CreateCouponRequest } from '../models/CreateCouponRequest';
import type { UpdateCouponRequest } from '../models/UpdateCouponRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CouponsService {
    /**
     * List coupons
     * @param search
     * @param filter
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `code`, `created_at`, `expires_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns CouponListResponse List of coupons
     * @throws ApiError
     */
    public static listCoupons(
        search?: string,
        filter?: 'ALL' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED',
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<CouponListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coupons',
            query: {
                'search': search,
                'filter': filter,
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Create a coupon
     * @param requestBody
     * @returns Coupon Coupon created
     * @throws ApiError
     */
    public static createCoupon(
        requestBody: CreateCouponRequest,
    ): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Get coupon details
     * @param couponId Coupon ID
     * @returns Coupon Coupon details
     * @throws ApiError
     */
    public static getCoupon(
        couponId: CouponId,
    ): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coupons/{coupon_id}',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Update a coupon
     * @param couponId Coupon ID
     * @param requestBody
     * @returns Coupon Coupon updated
     * @throws ApiError
     */
    public static updateCoupon(
        couponId: CouponId,
        requestBody: UpdateCouponRequest,
    ): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/coupons/{coupon_id}',
            path: {
                'coupon_id': couponId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Archive a coupon
     * @param couponId Coupon ID
     * @returns void
     * @throws ApiError
     */
    public static archiveCoupon(
        couponId: CouponId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/{coupon_id}/archive',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Disable a coupon
     * @param couponId Coupon ID
     * @returns void
     * @throws ApiError
     */
    public static disableCoupon(
        couponId: CouponId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/{coupon_id}/disable',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Enable a coupon
     * @param couponId Coupon ID
     * @returns void
     * @throws ApiError
     */
    public static enableCoupon(
        couponId: CouponId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/{coupon_id}/enable',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Unarchive a coupon
     * @param couponId Coupon ID
     * @returns void
     * @throws ApiError
     */
    public static unarchiveCoupon(
        couponId: CouponId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/{coupon_id}/unarchive',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Coupon not found`,
                429: `Too many requests`,
            },
        });
    }
}
