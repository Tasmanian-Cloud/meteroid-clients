/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductRequest } from '../models/CreateProductRequest';
import type { Product } from '../models/Product';
import type { ProductFamilyId } from '../models/ProductFamilyId';
import type { ProductId } from '../models/ProductId';
import type { ProductListResponse } from '../models/ProductListResponse';
import type { ResolvedEntitlementListResponse } from '../models/ResolvedEntitlementListResponse';
import type { UpdateProductRequest } from '../models/UpdateProductRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * List products
     * @param productFamilyId
     * @param search
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `created_at`. Direction: `asc` or `desc`. Default: `name.asc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns ProductListResponse List of products
     * @throws ApiError
     */
    public static listProducts(
        productFamilyId?: ProductFamilyId,
        search?: string,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<ProductListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products',
            query: {
                'product_family_id': productFamilyId,
                'search': search,
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
     * Create a product
     * @param requestBody
     * @returns Product Product created
     * @throws ApiError
     */
    public static createProduct(
        requestBody: CreateProductRequest,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products',
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
     * Get product details
     * @param productId Product ID
     * @returns Product Product details
     * @throws ApiError
     */
    public static getProduct(
        productId: ProductId,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/{product_id}',
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
     * Update a product
     * Partially update product fields. The fee_type is immutable and cannot be changed.
     * @param productId Product ID
     * @param requestBody
     * @returns Product Product updated
     * @throws ApiError
     */
    public static updateProduct(
        productId: ProductId,
        requestBody: UpdateProductRequest,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/products/{product_id}',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Product not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Archive a product
     * @param productId Product ID
     * @returns void
     * @throws ApiError
     */
    public static archiveProduct(
        productId: ProductId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/{product_id}/archive',
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
     * Unarchive a product
     * @param productId Product ID
     * @returns void
     * @throws ApiError
     */
    public static unarchiveProduct(
        productId: ProductId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/{product_id}/unarchive',
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
}
