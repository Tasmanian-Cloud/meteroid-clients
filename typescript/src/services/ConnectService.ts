/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectedAccount } from '../models/ConnectedAccount';
import type { ConnectedAccountId } from '../models/ConnectedAccountId';
import type { ConnectedAccountsResponse } from '../models/ConnectedAccountsResponse';
import type { CreateConnectedAccountRequest } from '../models/CreateConnectedAccountRequest';
import type { CreateOnboardingLinkRequest } from '../models/CreateOnboardingLinkRequest';
import type { OnboardingLinkResponse } from '../models/OnboardingLinkResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConnectService {
    /**
     * List connected accounts
     * List all connected accounts for this platform.
     * @returns ConnectedAccountsResponse List of connected accounts
     * @throws ApiError
     */
    public static listConnectedAccounts(): CancelablePromise<ConnectedAccountsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/connected-accounts',
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Create connected account
     * Create a new connected account (Express flow). Returns the account
     * and an onboarding link for the user to complete setup.
     * @param requestBody
     * @returns ConnectedAccount Connected account created
     * @throws ApiError
     */
    public static createConnectedAccount(
        requestBody: CreateConnectedAccountRequest,
    ): CancelablePromise<ConnectedAccount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/connected-accounts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                409: `Account already exists`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Get connected account
     * Retrieve a connected account by ID.
     * @param id Connected account ID
     * @returns ConnectedAccount Connected account
     * @throws ApiError
     */
    public static getConnectedAccount(
        id: ConnectedAccountId,
    ): CancelablePromise<ConnectedAccount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/connected-accounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Disconnect account
     * Revoke a connected account. All associated tokens are invalidated.
     * @param id Connected account ID
     * @returns void
     * @throws ApiError
     */
    public static disconnectAccount(
        id: ConnectedAccountId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/connected-accounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Create onboarding link
     * Generate a new onboarding link for a connected account. Any existing
     * unused link is invalidated. The link expires after a configured duration.
     * @param id Connected account ID
     * @param requestBody
     * @returns OnboardingLinkResponse Onboarding link created
     * @throws ApiError
     */
    public static createOnboardingLink(
        id: ConnectedAccountId,
        requestBody: CreateOnboardingLinkRequest,
    ): CancelablePromise<OnboardingLinkResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/connected-accounts/{id}/onboarding',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
                429: `Too many requests`,
            },
        });
    }
}
