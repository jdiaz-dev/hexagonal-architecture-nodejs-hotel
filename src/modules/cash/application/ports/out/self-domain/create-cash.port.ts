import { DataCash } from "../../../services/data-cash";

export interface CreateCashPort {
    createCash(hotelId:number, dataCash:DataCash):Promise<any>
}