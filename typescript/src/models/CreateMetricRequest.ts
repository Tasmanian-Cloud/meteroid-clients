/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingMetricAggregateEnum } from './BillingMetricAggregateEnum';
import type { MetricSegmentationMatrix } from './MetricSegmentationMatrix';
import type { ProductFamilyId } from './ProductFamilyId';
import type { ProductId } from './ProductId';
import type { UnitConversion } from './UnitConversion';
export type CreateMetricRequest = {
    aggregation_key?: string | null;
    aggregation_type: BillingMetricAggregateEnum;
    code: string;
    description?: string | null;
    name: string;
    product_family_id: ProductFamilyId;
    product_id?: (null | ProductId);
    segmentation_matrix?: (null | MetricSegmentationMatrix);
    unit_conversion?: (null | UnitConversion);
    usage_group_key?: string | null;
};

