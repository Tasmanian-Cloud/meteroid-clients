/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionType } from './ConnectionType';
import type { CustomerId } from './CustomerId';
export type CreateConnectedAccountRequest = {
    connected_organization_id: string;
    connection_type?: (null | ConnectionType);
    metadata?: any;
    platform_customer_id?: (null | CustomerId);
};

