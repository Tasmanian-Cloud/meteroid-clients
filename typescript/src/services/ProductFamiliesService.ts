/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductFamily } from '../models/ProductFamily';
import type { ProductFamilyCreateRequest } from '../models/ProductFamilyCreateRequest';
import type { ProductFamilyListResponse } from '../models/ProductFamilyListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductFamiliesService {
    /**
     * List product families
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `created_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @param search
     * @returns ProductFamilyListResponse List of product families
     * @throws ApiError
     */
    public static listProductFamilies(
        orderBy?: string,
        page?: number,
        perPage?: number,
        search?: string,
    ): CancelablePromise<ProductFamilyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/product_families',
            query: {
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
                'search': search,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Create product family
     * @param requestBody
     * @returns ProductFamily Customer successfully created
     * @throws ApiError
     */
    public static createProductFamily(
        requestBody: ProductFamilyCreateRequest,
    ): CancelablePromise<ProductFamily> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/product_families',
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
     * Get product family
     * Retrieve a single product family by ID or alias.
     * @param idOrAlias product_family ID or alias
     * @returns ProductFamily ProductFamily
     * @throws ApiError
     */
    public static getProductFamilyByIdOrAlias(
        idOrAlias: string,
    ): CancelablePromise<ProductFamily> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/product_families/{id_or_alias}',
            path: {
                'id_or_alias': idOrAlias,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
