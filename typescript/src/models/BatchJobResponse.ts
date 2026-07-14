/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchJobId } from './BatchJobId';
import type { BatchJobStatus } from './BatchJobStatus';
import type { BatchJobType } from './BatchJobType';
export type BatchJobResponse = {
    completed_at?: string | null;
    created_at: string;
    created_by: string;
    failed_items: number;
    id: BatchJobId;
    input_file_name?: string | null;
    job_type: BatchJobType;
    processed_items: number;
    status: BatchJobStatus;
    total_items?: number | null;
};

