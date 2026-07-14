/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Token response as per OAuth 2.0 spec
 */
export type TokenResponse = {
    access_token: string;
    expires_in: number;
    refresh_token?: string | null;
    scope?: string | null;
    token_type: string;
};

