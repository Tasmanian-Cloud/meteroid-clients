/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TermRate } from './TermRate';
/**
 * Slot-based fee (e.g., per-seat pricing)
 */
export type SlotPlanFee = {
    minimum_count?: number | null;
    quota?: number | null;
    rates: Array<TermRate>;
    slot_unit_name: string;
};

