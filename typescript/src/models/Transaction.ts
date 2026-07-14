/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerPaymentMethodId } from './CustomerPaymentMethodId';
import type { PaymentMethodInfo } from './PaymentMethodInfo';
import type { PaymentStatusEnum } from './PaymentStatusEnum';
import type { PaymentTransactionId } from './PaymentTransactionId';
import type { PaymentTypeEnum } from './PaymentTypeEnum';
export type Transaction = {
    amount: number;
    currency: string;
    error?: string | null;
    id: PaymentTransactionId;
    payment_method_id?: (null | CustomerPaymentMethodId);
    payment_method_info?: (null | PaymentMethodInfo);
    payment_type: PaymentTypeEnum;
    processed_at?: string | null;
    provider_transaction_id?: string | null;
    status: PaymentStatusEnum;
};

