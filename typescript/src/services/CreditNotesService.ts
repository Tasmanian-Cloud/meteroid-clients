/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditNoteId } from '../models/CreditNoteId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CreditNotesService {
    /**
     * @param creditNoteId Credit Note ID
     * @returns binary Credit Note PDF
     * @throws ApiError
     */
    public static downloadCreditNotePdf(
        creditNoteId: CreditNoteId,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/credit-notes/{credit_note_id}/download',
            path: {
                'credit_note_id': creditNoteId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Credit note not found or PDF not available`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
