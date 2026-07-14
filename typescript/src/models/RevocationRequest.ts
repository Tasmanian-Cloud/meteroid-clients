/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Token revocation request
 */
export type RevocationRequest = {
    /**
     * The token to revoke
     */
    token: string;
    /**
     * Optional hint about the token type (access_token or refresh_token)
     */
    token_type_hint?: string | null;
};

