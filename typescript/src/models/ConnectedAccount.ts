/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectedAccountId } from './ConnectedAccountId';
import type { ConnectionStatus } from './ConnectionStatus';
import type { ConnectionType } from './ConnectionType';
import type { CountryCode } from './CountryCode';
import type { CustomerId } from './CustomerId';
import type { OnboardingMode } from './OnboardingMode';
import type { OrganizationId } from './OrganizationId';
import type { TenantId } from './TenantId';
/**
 * A connected account (relationship between platform and connected org)
 */
export type ConnectedAccount = {
    connected_organization_id?: (null | OrganizationId);
    connected_tenant_id?: (null | TenantId);
    connection_type: ConnectionType;
    created_at: string;
    id: ConnectedAccountId;
    metadata?: any;
    onboarding_completed_at?: string | null;
    onboarding_mode: OnboardingMode;
    pending_country?: (null | CountryCode);
    /**
     * Email of the user being invited (express flow only)
     */
    pending_email?: string | null;
    /**
     * Name of the organization to be created (express flow only)
     */
    pending_organization_name?: string | null;
    platform_customer_id?: (null | CustomerId);
    platform_organization_id: OrganizationId;
    revoked_at?: string | null;
    status: ConnectionStatus;
};

