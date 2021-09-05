import { Service } from "typedi";
import { DataCash } from "../../../application/services/data-cash";
import { CashDatabaseEntity } from "./cash-database-entity";
import { CashRepository } from "./cash-repository";

@Service()
export class CashORM implements CashRepository {
    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        try {
            const cash = new CashDatabaseEntity()
            cash.openingMoney = dataCash.openingMoney
            cash.date = dataCash.date
            cash.time = dataCash.time
            cash.hotelId = hotelId

            await cash.save()

            return cash
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getCash(cashId: number): Promise<any> {
        try {
            const cash = await CashDatabaseEntity.findByPk(cashId)
            return cash

        } catch (error) {
            console.log('------------', error)
        }
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        try {
            const cashNotClosed = await CashDatabaseEntity.findOne({ where: { hotelId: hotelId, closed: false } })
            return cashNotClosed

        } catch (error) {
            console.log('------------', error)
        }
    }
}