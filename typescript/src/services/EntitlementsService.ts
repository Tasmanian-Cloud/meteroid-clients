/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOnId } from '../models/AddOnId';
import type { EffectiveEntitlementListResponse } from '../models/EffectiveEntitlementListResponse';
import type { PlanVersionId } from '../models/PlanVersionId';
import type { ProductId } from '../models/ProductId';
import type { ResolvedEntitlementListResponse } from '../models/ResolvedEntitlementListResponse';
import type { SubscriptionId } from '../models/SubscriptionId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EntitlementsService {
    /**
     * List add-on entitlements
     * @param addonId Add-on ID
     * @returns ResolvedEntitlementListResponse Resolved entitlements for this add-on
     * @throws ApiError
     */
    public static listAddOnEntitlements(
        addonId: AddOnId,
    ): CancelablePromise<ResolvedEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/addons/{addon_id}/entitlements',
            path: {
                'addon_id': addonId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Add-on not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * List customer entitlements
     * @param idOrAlias Customer ID or alias
     * @returns EffectiveEntitlementListResponse Customer entitlements
     * @throws ApiError
     */
    public static getEffectiveEntitlements(
        idOrAlias: string,
    ): CancelablePromise<EffectiveEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{id_or_alias}/entitlements',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * List plan version entitlements
     * @param planVersionId Plan version ID
     * @returns ResolvedEntitlementListResponse Resolved entitlements for this plan version
     * @throws ApiError
     */
    public static listPlanVersionEntitlements(
        planVersionId: PlanVersionId,
    ): CancelablePromise<ResolvedEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/plan-versions/{plan_version_id}/entitlements',
            path: {
                'plan_version_id': planVersionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan version not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * List product entitlements
     * @param productId Product ID
     * @returns ResolvedEntitlementListResponse List entitlements for this product
     * @throws ApiError
     */
    public static listProductEntitlements(
        productId: ProductId,
    ): CancelablePromise<ResolvedEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/{product_id}/entitlements',
            path: {
                'product_id': productId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Product not found`,
                429: `Too many requests`,
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
