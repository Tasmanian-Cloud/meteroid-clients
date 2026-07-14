/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CancelSubscriptionRequest = {
    /**
     * If not provided, the cancellation will be effective at the end of the current billing or committed period.
     */
    effective_date?: string | null;
    reason?: string | null;
};

