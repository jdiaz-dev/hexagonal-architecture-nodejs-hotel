export interface GetProductsPort {
    getProducts(hotelId:number):Promise<any>
}