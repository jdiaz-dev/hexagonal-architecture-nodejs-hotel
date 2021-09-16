import { Service } from 'typedi';
import { DataCash } from '../../../application/services/data-cash';
import { CashDatabaseModel } from './cash-database.model';
import { CashRepository } from './cash-repository';

@Service()
export class CashORM implements CashRepository {
    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        try {
            const cash = new CashDatabaseModel();
            cash.openingMoney = dataCash.openingMoney;
            cash.date = dataCash.date;
            cash.time = dataCash.time;
            cash.hotelId = hotelId;

            await cash.save();

            return cash;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getCash(cashId: number): Promise<any> {
        try {
            const cash = await CashDatabaseModel.findByPk(cashId);
            return cash;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        try {
            const cashNotClosed = await CashDatabaseModel.findOne({ where: { hotelId: hotelId, closed: false } });
            return cashNotClosed;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
