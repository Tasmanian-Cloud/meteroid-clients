/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankTransferPaymentMethodConfig } from './BankTransferPaymentMethodConfig';
import type { ExternalPaymentMethodConfig } from './ExternalPaymentMethodConfig';
import type { OnlinePaymentMethodConfig } from './OnlinePaymentMethodConfig';
/**
 * Online (card/direct debit), BankTransfer, or External.
 */
export type PaymentMethodsConfig = (OnlinePaymentMethodConfig | BankTransferPaymentMethodConfig | ExternalPaymentMethodConfig);

