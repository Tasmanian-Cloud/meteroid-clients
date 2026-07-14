/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from '../models/BillableMetricId';
import type { CreateMetricRequest } from '../models/CreateMetricRequest';
import type { Metric } from '../models/Metric';
import type { MetricListResponse } from '../models/MetricListResponse';
import type { ProductFamilyId } from '../models/ProductFamilyId';
import type { UpdateMetricRequest } from '../models/UpdateMetricRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MetricsService {
    /**
     * List billable metrics
     * @param productFamilyId
     * @param search Search by metric name or code
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `code`, `created_at`. Direction: `asc` or `desc`. Default: `name.asc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns MetricListResponse List of metrics
     * @throws ApiError
     */
    public static listMetrics(
        productFamilyId?: ProductFamilyId,
        search?: string,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<MetricListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metrics',
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
     * Create a billable metric
     * @param requestBody
     * @returns Metric Metric created
     * @throws ApiError
     */
    public static createMetric(
        requestBody: CreateMetricRequest,
    ): CancelablePromise<Metric> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/metrics',
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
     * Get metric details
     * @param metricId Metric ID
     * @returns Metric Metric details
     * @throws ApiError
     */
    public static getMetric(
        metricId: BillableMetricId,
    ): CancelablePromise<Metric> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/metrics/{metric_id}',
            path: {
                'metric_id': metricId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Metric not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Update a billable metric
     * Partially update metric fields. Code and aggregation_type are immutable.
     * @param metricId Metric ID
     * @param requestBody
     * @returns Metric Metric updated
     * @throws ApiError
     */
    public static updateMetric(
        metricId: BillableMetricId,
        requestBody: UpdateMetricRequest,
    ): CancelablePromise<Metric> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/metrics/{metric_id}',
            path: {
                'metric_id': metricId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Metric not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Archive a billable metric
     * @param metricId Metric ID
     * @returns void
     * @throws ApiError
     */
    public static archiveMetric(
        metricId: BillableMetricId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/metrics/{metric_id}/archive',
            path: {
                'metric_id': metricId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Metric not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Unarchive a billable metric
     * @param metricId Metric ID
     * @returns void
     * @throws ApiError
     */
    public static unarchiveMetric(
        metricId: BillableMetricId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/metrics/{metric_id}/unarchive',
            path: {
                'metric_id': metricId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Metric not found`,
                429: `Too many requests`,
            },
        });
    }
}
