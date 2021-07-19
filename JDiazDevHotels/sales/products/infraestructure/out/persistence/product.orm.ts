import { Service } from "typedi";
import { DataProduct } from "../../../application/services/data-product";
import { ProductDatabaseEntity } from "./product-database.entity";
import { ProductRepository } from "./product.repository";

@Service()
export class ProductORM implements ProductRepository {
    async saveProduct(hotelId: number, dataProduct: DataProduct): Promise<any> {
        try {
            const product = new ProductDatabaseEntity()
            product.code = dataProduct.code
            product.name = dataProduct.name
            product.brand = dataProduct.brand
            product.details = dataProduct.details
            product.price = dataProduct.price
            product.hotelId = hotelId
            await product.save()

            return product
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getProducts(hotelId: number): Promise<any> {
        try {
            const products = await ProductDatabaseEntity.findAll(
                { where: { hotelId: hotelId, state: true } }
            )
            return products

        } catch (error) {
            console.log('------------', error)
        }
    }
    async getProduct(productId: number): Promise<any> {
        try {
            const product = await ProductDatabaseEntity.findByPk(productId)
            return product

        } catch (error) {
            console.log('------------', error)
        }
    }
    async updateProduct(productId:number, dataProduct: DataProduct):Promise<any>{
        try {
            const product:any = await ProductDatabaseEntity.findByPk(productId)
            product.code = dataProduct.code
            product.name = dataProduct.name
            product.brand = dataProduct.brand
            product.details = dataProduct.details
            product.price = dataProduct.price
            await product.save()

            return product
        } catch (error) {
            console.log('------------', error)
        }
    }
    async removeProduct(productId:number):Promise<any>{
        try {
            const product:any = await ProductDatabaseEntity.findByPk(productId)
            product.state = false
            await product.save()

            return product
        } catch (error) {
            console.log('------------', error)
        }
    }
}