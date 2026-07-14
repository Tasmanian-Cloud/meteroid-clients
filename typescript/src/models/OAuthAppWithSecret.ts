/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OAuthApp } from './OAuthApp';
/**
 * Result of creating an OAuth app (includes the plain-text secret)
 */
export type OAuthAppWithSecret = {
    app: OAuthApp;
    client_secret: string;
};

