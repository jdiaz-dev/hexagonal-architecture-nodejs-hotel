import { Service } from "typedi";
import { CreateCashRequest } from "../ports/in/create-cash.request";
import { DataCash } from "./data-cash";
import { CreateCashPort } from './../ports/out/self-domain/create-cash.port';
import { CashPersistenceAdapter } from "../../infraestructure/out/persistence/cash-persitence.adapter";
import { GetHotelForCashDomain } from "../ports/out/other-domain/get-hotel-for-cash-domain";
import { GetHotelService } from "../../../managament/hotels/application/services/get-hotel.service";

@Service()
export class CreateCashService implements CreateCashRequest {
    //other domains
    private getHotelForCashDomain: GetHotelForCashDomain

    private createCashPort: CreateCashPort

    constructor(
        //other domains
        getHotelService: GetHotelService,

        //self ports
        cashPersistenceAdapter: CashPersistenceAdapter
    ) {
        //other domains
        this.getHotelForCashDomain = getHotelService

        this.createCashPort = cashPersistenceAdapter

    }
    async createTheCash(hotelId: number, dataCash: DataCash): Promise<any> {
        const hotel = await this.getHotelForCashDomain.getHotelForCashDomain(hotelId)

        if (!hotel) {
            return { message: 'You cannot create the cash' }
        }

        const cashCreated = await this.createCashPort.createCash(hotelId, dataCash)
        return cashCreated
    }
}