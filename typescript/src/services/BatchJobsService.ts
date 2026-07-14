/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchJobChunkId } from '../models/BatchJobChunkId';
import type { BatchJobDetailResponse } from '../models/BatchJobDetailResponse';
import type { BatchJobFailuresResponse } from '../models/BatchJobFailuresResponse';
import type { BatchJobId } from '../models/BatchJobId';
import type { BatchJobListResponse } from '../models/BatchJobListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BatchJobsService {
    /**
     * List batch jobs
     * List batch jobs with optional filtering by type and status.
     * @param jobType
     * @param status
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns BatchJobListResponse List of batch jobs
     * @throws ApiError
     */
    public static listBatchJobs(
        jobType?: 'EVENT_CSV_IMPORT' | 'CUSTOMER_CSV_IMPORT' | 'SUBSCRIPTION_CSV_IMPORT' | 'SUBSCRIPTION_PLAN_MIGRATION',
        status?: Array<'PENDING' | 'CHUNKING' | 'PROCESSING' | 'COMPLETED' | 'COMPLETED_WITH_ERRORS' | 'FAILED' | 'CANCELLED'>,
        page?: number,
        perPage?: number,
    ): CancelablePromise<BatchJobListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/batch-jobs',
            query: {
                'job_type': jobType,
                'status': status,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Get batch job detail
     * Retrieve a single batch job with its chunks and failures.
     * @param batchJobId Batch job ID
     * @returns BatchJobDetailResponse Batch job detail
     * @throws ApiError
     */
    public static getBatchJob(
        batchJobId: BatchJobId,
    ): CancelablePromise<BatchJobDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/batch-jobs/{batch_job_id}',
            path: {
                'batch_job_id': batchJobId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Batch job not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * List batch job failures
     * Retrieve paginated failures for a batch job.
     * @param batchJobId Batch job ID
     * @param chunkId
     * @param limit
     * @param offset
     * @returns BatchJobFailuresResponse List of failures
     * @throws ApiError
     */
    public static listBatchJobFailures(
        batchJobId: BatchJobId,
        chunkId?: BatchJobChunkId,
        limit?: number,
        offset?: number,
    ): CancelablePromise<BatchJobFailuresResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/batch-jobs/{batch_job_id}/failures',
            path: {
                'batch_job_id': batchJobId,
            },
            query: {
                'chunk_id': chunkId,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                401: `Unauthorized`,
                404: `Batch job not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
