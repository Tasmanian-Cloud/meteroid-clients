/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerId } from './CustomerId';
import type { QuoteId } from './QuoteId';
import type { SubscriptionId } from './SubscriptionId';
export type QuoteEventData = {
    customer_id: CustomerId;
    quote_id: QuoteId;
    subscription_id?: (null | SubscriptionId);
};

