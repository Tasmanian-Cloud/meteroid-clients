/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntrospectionRequest } from '../models/IntrospectionRequest';
import type { RevocationRequest } from '../models/RevocationRequest';
import type { TokenIntrospectionResponse } from '../models/TokenIntrospectionResponse';
import type { TokenRequest } from '../models/TokenRequest';
import type { TokenResponse } from '../models/TokenResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OAuthService {
    /**
     * Introspect token
     * Token introspection endpoint (RFC 7662). Requires client credentials
     * via HTTP Basic auth.
     * @param formData
     * @returns TokenIntrospectionResponse Introspection response
     * @throws ApiError
     */
    public static introspectEndpoint(
        formData: IntrospectionRequest,
    ): CancelablePromise<TokenIntrospectionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/introspect',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `Invalid client credentials`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Revoke token
     * Token revocation endpoint (RFC 7009). Always returns 200 per spec.
     * Requires client credentials via HTTP Basic auth.
     * @param formData
     * @returns any Token revoked (or was already invalid)
     * @throws ApiError
     */
    public static revokeEndpoint(
        formData: RevocationRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/revoke',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `Invalid client credentials`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Exchange tokens
     * OAuth 2.0 token endpoint. Supports two grant types:
     * - `authorization_code`: Exchange an authorization code for tokens
     * - `refresh_token`: Refresh an access token
     *
     * Authenticate via HTTP Basic auth (`client_id:client_secret`) or body parameters.
     * @param formData
     * @returns TokenResponse Token response
     * @throws ApiError
     */
    public static tokenEndpoint(
        formData: TokenRequest,
    ): CancelablePromise<TokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Invalid request`,
                401: `Invalid client credentials`,
                429: `Too many requests`,
            },
        });
    }
}
