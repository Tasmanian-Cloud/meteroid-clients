/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelCheckoutSessionResponse } from '../models/CancelCheckoutSessionResponse';
import type { CheckoutSessionId } from '../models/CheckoutSessionId';
import type { CreateCheckoutSessionRequest } from '../models/CreateCheckoutSessionRequest';
import type { CreateCheckoutSessionResponse } from '../models/CreateCheckoutSessionResponse';
import type { CustomerId } from '../models/CustomerId';
import type { GetCheckoutSessionResponse } from '../models/GetCheckoutSessionResponse';
import type { ListCheckoutSessionsResponse } from '../models/ListCheckoutSessionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CheckoutSessionsService {
    /**
     * List checkout sessions
     * @param customerId
     * @param status
     * @returns ListCheckoutSessionsResponse List of checkout sessions
     * @throws ApiError
     */
    public static listCheckoutSessions(
        customerId?: CustomerId,
        status?: 'CREATED' | 'AWAITING_PAYMENT' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED',
    ): CancelablePromise<ListCheckoutSessionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/checkout-sessions',
            query: {
                'customer_id': customerId,
                'status': status,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a checkout session
     * @param requestBody
     * @returns CreateCheckoutSessionResponse Checkout session created
     * @throws ApiError
     */
    public static createCheckoutSession(
        requestBody: CreateCheckoutSessionRequest,
    ): CancelablePromise<CreateCheckoutSessionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/checkout-sessions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a checkout session by ID
     * @param id Checkout session ID
     * @returns GetCheckoutSessionResponse Checkout session details
     * @throws ApiError
     */
    public static getCheckoutSession(
        id: CheckoutSessionId,
    ): CancelablePromise<GetCheckoutSessionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/checkout-sessions/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                429: `Too many requests`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Cancel a checkout session
     * @param id Checkout session ID
     * @returns CancelCheckoutSessionResponse Checkout session cancelled
     * @throws ApiError
     */
    public static cancelCheckoutSession(
        id: CheckoutSessionId,
    ): CancelablePromise<CancelCheckoutSessionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/checkout-sessions/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - session cannot be cancelled`,
                401: `Unauthorized`,
                404: `Not found`,
                429: `Too many requests`,
                500: `Internal server error`,
            },
        });
    }
}
