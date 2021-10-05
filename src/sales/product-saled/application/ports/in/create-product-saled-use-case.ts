import { CreateProductSaledCommand } from './create-products.saled.command';

export interface CreateProductsSaledUseCase {
    createTheProductsSaled(command: CreateProductSaledCommand): Promise<any>;
}
