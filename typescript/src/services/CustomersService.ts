/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CustomerCreateRequest } from '../models/CustomerCreateRequest';
import type { CustomerListResponse } from '../models/CustomerListResponse';
import type { CustomerPatchRequest } from '../models/CustomerPatchRequest';
import type { CustomerPortalTokenResponse } from '../models/CustomerPortalTokenResponse';
import type { CustomerUpdateRequest } from '../models/CustomerUpdateRequest';
import type { EffectiveEntitlementListResponse } from '../models/EffectiveEntitlementListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * List customers
     * List customers with optional pagination and search filtering.
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `email`, `alias`, `created_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @param search
     * @param archived
     * @returns CustomerListResponse List of customers
     * @throws ApiError
     */
    public static listCustomers(
        orderBy?: string,
        page?: number,
        perPage?: number,
        search?: string,
        archived?: boolean,
    ): CancelablePromise<CustomerListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers',
            query: {
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
                'search': search,
                'archived': archived,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Create customer
     * @param requestBody
     * @returns Customer Customer successfully created
     * @throws ApiError
     */
    public static createCustomer(
        requestBody: CustomerCreateRequest,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                409: `Customer already exists`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Get customer
     * Retrieve a single customer by ID or alias.
     * @param idOrAlias customer ID or alias
     * @returns Customer Customer
     * @throws ApiError
     */
    public static getCustomer(
        idOrAlias: string,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{id_or_alias}',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Update customer
     * @param idOrAlias customer ID or alias
     * @param requestBody
     * @returns Customer Customer
     * @throws ApiError
     */
    public static updateCustomer(
        idOrAlias: string,
        requestBody: CustomerUpdateRequest,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/customers/{id_or_alias}',
            path: {
                'id_or_alias': idOrAlias,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Archive a customer
     * No linked entity will be deleted. You need to terminate all active subscriptions before archiving a customer, or the call will fail.
     * @param idOrAlias customer ID or alias
     * @returns void
     * @throws ApiError
     */
    public static archiveCustomer(
        idOrAlias: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/customers/{id_or_alias}',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Patch customer
     * Partially update a customer. Only provided fields will be updated.
     * @param idOrAlias customer ID or alias
     * @param requestBody
     * @returns Customer Customer
     * @throws ApiError
     */
    public static patchCustomer(
        idOrAlias: string,
        requestBody: CustomerPatchRequest,
    ): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/customers/{id_or_alias}',
            path: {
                'id_or_alias': idOrAlias,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
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
     * Generate a portal token for a customer
     * Generates a JWT token that grants access to the customer portal.
     * The token can be used to access invoices, payment methods, and other portal features.
     * @param idOrAlias customer ID or alias
     * @returns CustomerPortalTokenResponse Portal token generated
     * @throws ApiError
     */
    public static createPortalToken(
        idOrAlias: string,
    ): CancelablePromise<CustomerPortalTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customers/{id_or_alias}/portal-token',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Restore an archived customer
     * @param idOrAlias customer ID or alias
     * @returns void
     * @throws ApiError
     */
    public static unarchiveCustomer(
        idOrAlias: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customers/{id_or_alias}/unarchive',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                401: `Unauthorized`,
                404: `Customer not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
