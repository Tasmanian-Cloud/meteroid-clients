/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { GroupedUsage } from './GroupedUsage';
export type MetricUsage = {
    grouped_usage: Array<GroupedUsage>;
    metric_code: string;
    metric_id: BillableMetricId;
    metric_name: string;
    total_value: string;
};

