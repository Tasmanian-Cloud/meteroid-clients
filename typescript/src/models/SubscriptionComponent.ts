/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PriceComponentId } from './PriceComponentId';
import type { ProductId } from './ProductId';
import type { SubscriptionFee } from './SubscriptionFee';
import type { SubscriptionFeeBillingPeriodEnum } from './SubscriptionFeeBillingPeriodEnum';
export type SubscriptionComponent = {
    fee: SubscriptionFee;
    name: string;
    period: SubscriptionFeeBillingPeriodEnum;
    price_component_id?: (null | PriceComponentId);
    product_id?: (null | ProductId);
};

