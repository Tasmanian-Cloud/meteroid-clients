/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillableMetricId } from './BillableMetricId';
import type { BillingMetricAggregateEnum } from './BillingMetricAggregateEnum';
import type { MetricSegmentationMatrix } from './MetricSegmentationMatrix';
import type { ProductFamilyId } from './ProductFamilyId';
import type { ProductId } from './ProductId';
import type { UnitConversionRoundingEnum } from './UnitConversionRoundingEnum';
export type MetricEventData = {
    aggregation_key?: string | null;
    aggregation_type: BillingMetricAggregateEnum;
    code: string;
    created_at: string;
    description?: string | null;
    metric_id: BillableMetricId;
    name: string;
    product_family_id: ProductFamilyId;
    product_id?: (null | ProductId);
    segmentation_matrix?: (null | MetricSegmentationMatrix);
    unit_conversion_factor?: number | null;
    unit_conversion_rounding?: (null | UnitConversionRoundingEnum);
    usage_group_key?: string | null;
};

