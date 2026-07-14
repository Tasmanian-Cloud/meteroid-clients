/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOnId } from './AddOnId';
import type { PriceId } from './PriceId';
export type PlanAddOnInput = {
    add_on_id: AddOnId;
    max_instances?: number | null;
    price_id?: (null | PriceId);
    self_serviceable?: boolean | null;
};

