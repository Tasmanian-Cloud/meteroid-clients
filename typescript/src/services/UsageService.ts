/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from '../models/BillableMetricId';
import type { SubscriptionId } from '../models/SubscriptionId';
import type { UsageResponse } from '../models/UsageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsageService {
    /**
     * Get customer usage
     * Retrieve aggregated usage data for a customer over a specified period.
     * @param customerId Customer ID or alias
     * @param startDate
     * @param endDate
     * @param metricId
     * @returns UsageResponse Customer usage data
     * @throws ApiError
     */
    public static getCustomerUsage(
        customerId: string,
        startDate: string,
        endDate: string,
        metricId?: BillableMetricId,
    ): CancelablePromise<UsageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/usage/customer/{customer_id}',
            path: {
                'customer_id': customerId,
            },
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'metric_id': metricId,
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
     * Get subscription usage
     * Retrieve aggregated usage data for a subscription's usage-based components.
     * If start_date/end_date are omitted, defaults to the current billing period.
     * @param subscriptionId Subscription ID
     * @param startDate
     * @param endDate
     * @param metricId
     * @returns UsageResponse Subscription usage data
     * @throws ApiError
     */
    public static getSubscriptionUsage(
        subscriptionId: SubscriptionId,
        startDate?: string,
        endDate?: string,
        metricId?: BillableMetricId,
    ): CancelablePromise<UsageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/usage/subscription/{subscription_id}',
            path: {
                'subscription_id': subscriptionId,
            },
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'metric_id': metricId,
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
     * Get usage summary
     * Retrieve aggregated usage data across all customers for the tenant.
     * @param startDate
     * @param endDate
     * @param metricId
     * @returns UsageResponse Usage summary
     * @throws ApiError
     */
    public static getUsageSummary(
        startDate: string,
        endDate: string,
        metricId?: BillableMetricId,
    ): CancelablePromise<UsageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/usage/summary',
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'metric_id': metricId,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
