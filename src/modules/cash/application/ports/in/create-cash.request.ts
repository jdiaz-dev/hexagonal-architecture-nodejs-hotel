import { DataCash } from "../../services/data-cash";

export interface CreateCashRequest {
    createTheCash(hotelId:number, dataCash:DataCash):Promise<any>
}