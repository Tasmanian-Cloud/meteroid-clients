/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OAuthAppId } from './OAuthAppId';
import type { OrganizationId } from './OrganizationId';
/**
 * An OAuth application registered by a platform
 */
export type OAuthApp = {
    client_id: string;
    client_secret_hint: string;
    created_at: string;
    id: OAuthAppId;
    is_active: boolean;
    name: string;
    organization_id: OrganizationId;
    redirect_uris: Array<string>;
    scopes: Array<string>;
    updated_at?: string | null;
};

