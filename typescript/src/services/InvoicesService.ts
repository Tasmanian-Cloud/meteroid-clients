/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Invoice } from '../models/Invoice';
import type { InvoiceId } from '../models/InvoiceId';
import type { InvoiceListResponse } from '../models/InvoiceListResponse';
import type { SubscriptionId } from '../models/SubscriptionId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InvoicesService {
    /**
     * List invoices
     * List invoices with optional filtering by customer, subscription, or status.
     * @param customerId Filter by customer ID or alias
     * @param subscriptionId
     * @param statuses
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `invoice_number`, `customer_name`, `amount`, `invoice_date`, `status`, `payment_status`. Direction: `asc` or `desc`. Default: `invoice_date.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns InvoiceListResponse List of invoices
     * @throws ApiError
     */
    public static listInvoices(
        customerId?: string,
        subscriptionId?: SubscriptionId,
        statuses?: Array<'DRAFT' | 'FINALIZED' | 'UNCOLLECTIBLE' | 'VOID'>,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<InvoiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices',
            query: {
                'customer_id': customerId,
                'subscription_id': subscriptionId,
                'statuses': statuses,
                'order_by': orderBy,
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
     * Get invoice
     * Retrieve a single invoice with its payment transactions.
     * @param invoiceId Invoice ID
     * @returns Invoice Invoice details
     * @throws ApiError
     */
    public static getInvoiceById(
        invoiceId: InvoiceId,
    ): CancelablePromise<Invoice> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices/{invoice_id}',
            path: {
                'invoice_id': invoiceId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Invoice not found`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
    /**
     * Download invoice PDF
     * Download the PDF document for an invoice.
     * @param invoiceId Invoice ID
     * @returns binary Invoice PDF
     * @throws ApiError
     */
    public static downloadInvoicePdf(
        invoiceId: InvoiceId,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices/{invoice_id}/download',
            path: {
                'invoice_id': invoiceId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Invoice not found or PDF not available`,
                429: `Too many requests`,
                500: `Internal error`,
            },
        });
    }
}
