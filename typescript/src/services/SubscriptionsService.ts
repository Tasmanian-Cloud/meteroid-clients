/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelSubscriptionRequest } from '../models/CancelSubscriptionRequest';
import type { CancelSubscriptionResponse } from '../models/CancelSubscriptionResponse';
import type { EffectiveEntitlementListResponse } from '../models/EffectiveEntitlementListResponse';
import type { PlanId } from '../models/PlanId';
import type { SubscriptionCreateRequest } from '../models/SubscriptionCreateRequest';
import type { SubscriptionDetails } from '../models/SubscriptionDetails';
import type { SubscriptionId } from '../models/SubscriptionId';
import type { SubscriptionListResponse } from '../models/SubscriptionListResponse';
import type { SubscriptionUpdateRequest } from '../models/SubscriptionUpdateRequest';
import type { SubscriptionUpdateResponse } from '../models/SubscriptionUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionsService {
    /**
     * List subscriptions
     * List subscriptions with optional filtering by customer or plan.
     * @param customerId Filter by customer ID or alias
     * @param planId
     * @param statuses
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `customer_name`, `plan_name`, `mrr_cents`, `billing_start_date`, `end_date`, `status`, `created_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns SubscriptionListResponse List of subscriptions
     * @throws ApiError
     */
    public static listSubscriptions(
        customerId?: string,
        planId?: PlanId,
        statuses?: Array<'PENDING_ACTIVATION' | 'PENDING_CHARGE' | 'TRIAL_ACTIVE' | 'ACTIVE' | 'TRIAL_EXPIRED' | 'PAUSED' | 'SUSPENDED' | 'CANCELLED' | 'COMPLETED' | 'SUPERSEDED' | 'ERRORED'>,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<SubscriptionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions',
            query: {
                'customer_id': customerId,
                'plan_id': planId,
                'statuses': statuses,
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Create subscription
     * Create a new subscription for a customer with a specific plan.
     * @param requestBody
     * @returns SubscriptionDetails Subscription successfully created
     * @throws ApiError
     */
    public static createSubscription(
        requestBody: SubscriptionCreateRequest,
    ): CancelablePromise<SubscriptionDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/subscriptions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Get subscription details
     * Retrieve detailed information about a subscription including price components and schedules.
     * @param subscriptionId Subscription ID
     * @returns SubscriptionDetails Details of subscription
     * @throws ApiError
     */
    public static subscriptionDetails(
        subscriptionId: SubscriptionId,
    ): CancelablePromise<SubscriptionDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions/{subscription_id}',
            path: {
                'subscription_id': subscriptionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Subscription not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Update subscription
     * Update subscription settings like payment configuration, billing options, etc.
     * @param subscriptionId Subscription ID
     * @param requestBody
     * @returns SubscriptionUpdateResponse Subscription updated
     * @throws ApiError
     */
    public static updateSubscription(
        subscriptionId: SubscriptionId,
        requestBody: SubscriptionUpdateRequest,
    ): CancelablePromise<SubscriptionUpdateResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscriptions/{subscription_id}',
            path: {
                'subscription_id': subscriptionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Subscription not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Cancel subscription
     * Cancel a subscription either immediately or at the end of the billing period.
     * @param subscriptionId Subscription ID
     * @param requestBody
     * @returns CancelSubscriptionResponse Subscription canceled
     * @throws ApiError
     */
    public static cancelSubscription(
        subscriptionId: SubscriptionId,
        requestBody: CancelSubscriptionRequest,
    ): CancelablePromise<CancelSubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/subscriptions/{subscription_id}/cancel',
            path: {
                'subscription_id': subscriptionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Subscription not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * List subscription entitlements
     * @param subscriptionId Subscription ID
     * @returns EffectiveEntitlementListResponse Effective entitlements for this subscription, with live usage
     * @throws ApiError
     */
    public static listSubscriptionEntitlements(
        subscriptionId: SubscriptionId,
    ): CancelablePromise<EffectiveEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions/{subscription_id}/entitlements',
            path: {
                'subscription_id': subscriptionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Subscription not found`,
                429: `Too many requests`,
            },
        });
    }
}
