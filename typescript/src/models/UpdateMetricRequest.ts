/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetricSegmentationMatrix } from './MetricSegmentationMatrix';
import type { UnitConversion } from './UnitConversion';
export type UpdateMetricRequest = {
    description?: string | null;
    name?: string | null;
    segmentation_matrix?: (null | MetricSegmentationMatrix);
    unit_conversion?: (null | UnitConversion);
};

