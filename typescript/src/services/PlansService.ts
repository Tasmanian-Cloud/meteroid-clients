/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePlanRequest } from '../models/CreatePlanRequest';
import type { MinimumCommitment } from '../models/MinimumCommitment';
import type { PatchPlanRequest } from '../models/PatchPlanRequest';
import type { Plan } from '../models/Plan';
import type { PlanId } from '../models/PlanId';
import type { PlanListResponse } from '../models/PlanListResponse';
import type { PlanVersionId } from '../models/PlanVersionId';
import type { PlanVersionListResponse } from '../models/PlanVersionListResponse';
import type { ProductFamilyId } from '../models/ProductFamilyId';
import type { ReplacePlanRequest } from '../models/ReplacePlanRequest';
import type { ResolvedEntitlementListResponse } from '../models/ResolvedEntitlementListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlansService {
    /**
     * List plan version entitlements
     * @param planVersionId Plan version ID
     * @returns ResolvedEntitlementListResponse Resolved entitlements for this plan version
     * @throws ApiError
     */
    public static listPlanVersionEntitlements(
        planVersionId: PlanVersionId,
    ): CancelablePromise<ResolvedEntitlementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/plan-versions/{plan_version_id}/entitlements',
            path: {
                'plan_version_id': planVersionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan version not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * List plans
     * @param productFamilyId
     * @param search Search by plan name
     * @param status Filter by plan status (can be repeated)
     * @param planType Filter by plan type (can be repeated)
     * @param orderBy Sort order. Format: `column.direction`. Allowed columns: `name`, `status`, `plan_type`, `created_at`. Direction: `asc` or `desc`. Default: `created_at.desc`.
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns PlanListResponse List of plans
     * @throws ApiError
     */
    public static listPlans(
        productFamilyId?: ProductFamilyId,
        search?: string,
        status?: Array<'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'>,
        planType?: Array<'STANDARD' | 'FREE' | 'CUSTOM'>,
        orderBy?: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<PlanListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/plans',
            query: {
                'product_family_id': productFamilyId,
                'search': search,
                'status': status,
                'plan_type': planType,
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Create a plan
     * Create a new plan with components and pricing. Set `status` to `ACTIVE` to
     * publish immediately, or `DRAFT` to stage for review.
     * @param requestBody
     * @returns Plan Plan created
     * @throws ApiError
     */
    public static createPlan(
        requestBody: CreatePlanRequest,
    ): CancelablePromise<Plan> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/plans',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                409: `Conflict`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Set or replace the plan-level minimum commitment for a draft plan version.
     * @param planVersionId Plan version ID
     * @param requestBody
     * @returns MinimumCommitment Minimum commitment saved
     * @throws ApiError
     */
    public static setPlanMinimum(
        planVersionId: PlanVersionId,
        requestBody: MinimumCommitment,
    ): CancelablePromise<MinimumCommitment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/plans/versions/{plan_version_id}/minimum',
            path: {
                'plan_version_id': planVersionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                401: `Unauthorized`,
                404: `Plan version not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Remove the plan-level minimum commitment for a draft plan version.
     * @param planVersionId Plan version ID
     * @returns void
     * @throws ApiError
     */
    public static deletePlanMinimum(
        planVersionId: PlanVersionId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/plans/versions/{plan_version_id}/minimum',
            path: {
                'plan_version_id': planVersionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan version not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Get plan details
     * Retrieve a specific plan. Use `?version=draft` for the draft version,
     * `?version=2` for a specific version number, or omit for the active version.
     * @param planId Plan ID
     * @param version Filter by version: "draft", a version number, or omitted for active
     * @returns Plan Plan details
     * @throws ApiError
     */
    public static getPlanDetails(
        planId: PlanId,
        version?: string,
    ): CancelablePromise<Plan> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/plans/{plan_id}',
            path: {
                'plan_id': planId,
            },
            query: {
                'version': version,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Replace a plan
     * Full replacement of a plan's version. On a draft plan, updates in-place.
     * On a published plan, creates a new version. Set `status` to `DRAFT` to
     * stage as a new draft without publishing.
     * @param planId Plan ID
     * @param requestBody
     * @returns Plan Plan updated
     * @throws ApiError
     */
    public static replacePlan(
        planId: PlanId,
        requestBody: ReplacePlanRequest,
    ): CancelablePromise<Plan> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/plans/{plan_id}',
            path: {
                'plan_id': planId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Update plan metadata
     * Partially update plan-level fields (name, description, self_service_rank).
     * Does not modify version-level configuration or components.
     * @param planId Plan ID
     * @param requestBody
     * @returns Plan Plan updated
     * @throws ApiError
     */
    public static patchPlan(
        planId: PlanId,
        requestBody: PatchPlanRequest,
    ): CancelablePromise<Plan> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/plans/{plan_id}',
            path: {
                'plan_id': planId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Archive a plan
     * @param planId Plan ID
     * @returns void
     * @throws ApiError
     */
    public static archivePlan(
        planId: PlanId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/plans/{plan_id}/archive',
            path: {
                'plan_id': planId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Publish a draft plan version
     * Publishes the current draft version, making it the active version.
     * @param planId Plan ID
     * @returns Plan Plan published
     * @throws ApiError
     */
    public static publishPlan(
        planId: PlanId,
    ): CancelablePromise<Plan> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/plans/{plan_id}/publish',
            path: {
                'plan_id': planId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan not found`,
                409: `No draft version to publish`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * Unarchive a plan
     * @param planId Plan ID
     * @returns void
     * @throws ApiError
     */
    public static unarchivePlan(
        planId: PlanId,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/plans/{plan_id}/unarchive',
            path: {
                'plan_id': planId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
    /**
     * List plan versions
     * @param planId Plan ID
     * @param page Page number (0-indexed)
     * @param perPage Number of items per page
     * @returns PlanVersionListResponse Plan versions
     * @throws ApiError
     */
    public static listPlanVersions(
        planId: PlanId,
        page?: number,
        perPage?: number,
    ): CancelablePromise<PlanVersionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/plans/{plan_id}/versions',
            path: {
                'plan_id': planId,
            },
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                404: `Plan not found`,
                429: `Too many requests`,
            },
        });
    }
}
