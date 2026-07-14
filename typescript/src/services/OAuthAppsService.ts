/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOAuthAppRequest } from '../models/CreateOAuthAppRequest';
import type { OAuthApp } from '../models/OAuthApp';
import type { OAuthAppId } from '../models/OAuthAppId';
import type { OAuthAppsResponse } from '../models/OAuthAppsResponse';
import type { OAuthAppWithSecret } from '../models/OAuthAppWithSecret';
import type { RotatedSecret } from '../models/RotatedSecret';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OAuthAppsService {
    /**
     * List OAuth apps
     * List all OAuth applications registered for this platform.
     * @returns OAuthAppsResponse List of OAuth apps
     * @throws ApiError
     */
    public static listOauthApps(): CancelablePromise<OAuthAppsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/oauth-apps',
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Create OAuth app
     * Register a new OAuth application. Returns the app with its client secret
     * (only shown once).
     * @param requestBody
     * @returns OAuthAppWithSecret OAuth app created
     * @throws ApiError
     */
    public static createOauthApp(
        requestBody: CreateOAuthAppRequest,
    ): CancelablePromise<OAuthAppWithSecret> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth-apps',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                409: `Duplicate app name`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Get OAuth app
     * Retrieve an OAuth application by ID.
     * @param id OAuth app ID
     * @returns OAuthApp OAuth app
     * @throws ApiError
     */
    public static getOauthApp(
        id: OAuthAppId,
    ): CancelablePromise<OAuthApp> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/oauth-apps/{id}',
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
     * Delete OAuth app
     * Delete an OAuth application and revoke all associated tokens.
     * @param id OAuth app ID
     * @returns void
     * @throws ApiError
     */
    public static deleteOauthApp(
        id: OAuthAppId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/oauth-apps/{id}',
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
     * Rotate client secret
     * Generate a new client secret for an OAuth app. The old secret is
     * immediately invalidated.
     * @param id OAuth app ID
     * @returns RotatedSecret Rotated secret
     * @throws ApiError
     */
    public static rotateClientSecret(
        id: OAuthAppId,
    ): CancelablePromise<RotatedSecret> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth-apps/{id}/rotate',
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
}
