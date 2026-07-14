/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchJobId } from './BatchJobId';
import type { BatchJobStatus } from './BatchJobStatus';
import type { BatchJobType } from './BatchJobType';
export type BatchJobDetailResponse = {
    completed_at?: string | null;
    created_at: string;
    created_by: string;
    error_csv_url?: string | null;
    failed_items: number;
    failure_count: number;
    has_error_csv: boolean;
    id: BatchJobId;
    input_file_name?: string | null;
    input_file_url?: string | null;
    job_type: BatchJobType;
    processed_items: number;
    status: BatchJobStatus;
    total_items?: number | null;
};

