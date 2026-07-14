/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Token introspection response as per RFC 7662
 */
export type TokenIntrospectionResponse = {
    active: boolean;
    client_id?: string | null;
    exp?: number | null;
    iat?: number | null;
    scope?: string | null;
    sub?: string | null;
    token_type?: string | null;
};

