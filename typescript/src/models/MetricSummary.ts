/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { BillingMetricAggregateEnum } from './BillingMetricAggregateEnum';
export type MetricSummary = {
    aggregation_key?: string | null;
    aggregation_type: BillingMetricAggregateEnum;
    archived_at?: string | null;
    code: string;
    created_at: string;
    description?: string | null;
    id: BillableMetricId;
    name: string;
};

