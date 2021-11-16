export interface CompletePaymentProductSaledUseCase {
    completePaymentProductSaled(productSaledIds: number[]): Promise<any>;
}
