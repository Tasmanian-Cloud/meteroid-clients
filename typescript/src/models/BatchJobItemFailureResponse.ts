/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchJobChunkId } from './BatchJobChunkId';
export type BatchJobItemFailureResponse = {
    chunk_id: BatchJobChunkId;
    id: string;
    item_identifier?: string | null;
    item_index: number;
    reason: string;
};

