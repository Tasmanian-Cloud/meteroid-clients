/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OAuthErrorCode } from './OAuthErrorCode';
/**
 * OAuth 2.0 error response as per RFC 6749 Section 5.2
 */
export type OAuthErrorResponse = {
    error: OAuthErrorCode;
    error_description?: string | null;
    error_uri?: string | null;
};

