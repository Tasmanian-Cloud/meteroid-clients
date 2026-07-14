/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Token request (from POST body, application/x-www-form-urlencoded)
 */
export type TokenRequest = {
    /**
     * Client ID (if not using HTTP Basic auth)
     */
    client_id?: string | null;
    /**
     * Client secret (if not using HTTP Basic auth)
     */
    client_secret?: string | null;
    /**
     * Authorization code (for authorization_code grant)
     */
    code?: string | null;
    /**
     * PKCE code verifier (for authorization_code grant with PKCE)
     */
    code_verifier?: string | null;
    /**
     * Grant type: "authorization_code" or "refresh_token"
     */
    grant_type: string;
    /**
     * Redirect URI (for authorization_code grant, must match the one used in /authorize)
     */
    redirect_uri?: string | null;
    /**
     * Refresh token (for refresh_token grant)
     */
    refresh_token?: string | null;
};

