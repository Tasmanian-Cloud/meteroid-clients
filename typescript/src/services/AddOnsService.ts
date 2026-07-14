/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOn } from '../models/AddOn';
import type { AddOnId } from '../models/AddOnId';
import type { AddOnListResponse } from '../models/AddOnListResponse';
import type { CreateAddOnRequest } from '../models/CreateAddOnRequest';
import type { ResolvedEntitlementListResponse } from '../models/ResolvedEntitlementListResponse';
import type { UpdateAddOnRequest } from '../models/UpdateAddOnRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddOnsService {
    /**
     * List add-ons
     * @param search
     * @param currency
     * @param includeArchived Include archived add-ons in the results (default: false)
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `created_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns AddOnListResponse List of add-ons
     * @throws ApiError
     */
    public static listAddons(
        search?: string,
        currency?: string,
        includeArchived?: boolean,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<AddOnListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/addons',
            query: {
                'search': search,
                'currency': currency,
                'include_archived': includeArchived,
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
     * Create an add-on
     * @param requestBody
     * @returns AddOn Add-on created
     * @throws ApiError
     */
    public static createAddon(
        requestBody: CreateAddOnRequest,
    ): CancelablePromise<AddOn> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/addons',
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
     * Get add-on details
     * @param addonId Add-on ID
     * @returns AddOn Add-on details
     * @throws ApiError
     */
    public static getAddon(
        addonId: AddOnId,
    ): CancelablePromise<AddOn> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/addons/{addon_id}',
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
     * Update an add-on
     * @param addonId Add-on ID
     * @param requestBody
     * @returns AddOn Add-on updated
     * @throws ApiError
     */
    public static updateAddon(
        addonId: AddOnId,
        requestBody: UpdateAddOnRequest,
    ): CancelablePromise<AddOn> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/addons/{addon_id}',
            path: {
                'addon_id': addonId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Add-on not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Archive an add-on
     * @param addonId Add-on ID
     * @returns void
     * @throws ApiError
     */
    public static archiveAddon(
        addonId: AddOnId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/addons/{addon_id}/archive',
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
     * Unarchive an add-on
     * @param addonId Add-on ID
     * @returns void
     * @throws ApiError
     */
    public static unarchiveAddon(
        addonId: AddOnId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/addons/{addon_id}/unarchive',
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
}
