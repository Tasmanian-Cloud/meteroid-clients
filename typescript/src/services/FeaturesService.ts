/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feature } from '../models/Feature';
import type { FeatureListResponse } from '../models/FeatureListResponse';
import type { FeatureStatus } from '../models/FeatureStatus';
import type { ProductId } from '../models/ProductId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeaturesService {
    /**
     * List features
     * @param statuses Filter by feature status. Repeat the param to select multiple, omit to return all.
     * @param productId Filter by product. Omit to return features across all products.
     * @param search Search by feature name.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns FeatureListResponse List of features
     * @throws ApiError
     */
    public static listFeatures(
        statuses?: Array<FeatureStatus>,
        productId?: ProductId,
        search?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<FeatureListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/features',
            query: {
                'statuses': statuses,
                'product_id': productId,
                'search': search,
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
     * Get feature details
     * @param idOrCode Feature ID or code
     * @returns Feature Feature details
     * @throws ApiError
     */
    public static getFeature(
        idOrCode: string,
    ): CancelablePromise<Feature> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/features/{id_or_code}',
            path: {
                'id_or_code': idOrCode,
            },
            errors: {
                401: `Unauthorized`,
                404: `Feature not found`,
                429: `Too many requests`,
            },
        });
    }
}
