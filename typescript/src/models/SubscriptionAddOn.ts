/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOnId } from './AddOnId';
import type { SubscriptionAddOnId } from './SubscriptionAddOnId';
import type { SubscriptionFee } from './SubscriptionFee';
import type { SubscriptionFeeBillingPeriodEnum } from './SubscriptionFeeBillingPeriodEnum';
export type SubscriptionAddOn = {
    add_on_id?: AddOnId;
    fee: SubscriptionFee;
    id?: SubscriptionAddOnId;
    name: string;
    period: SubscriptionFeeBillingPeriodEnum;
    quantity: number;
};

