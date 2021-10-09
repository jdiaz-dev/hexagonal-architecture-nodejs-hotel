import { Service } from 'typedi';
import { DataCash } from '../../../application/services/data-cash';
import { CashModel } from './cash.model';
import { CashRepository } from './cash-repository';
import { CashDomain } from './../../../domain/cash';

@Service()
export class CashORM implements CashRepository {
    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        try {
            const cash = new CashModel();
            cash.openingMoney = dataCash.openingMoney;
            cash.closingMoney = dataCash.openingMoney;
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
            const cash = await CashModel.findOne({ where: { id: cashId, closed: false } });
            return cash;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        try {
            const cashNotClosed = await CashModel.findOne({ where: { hotelId: hotelId, closed: false } });
            return cashNotClosed;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateClosingMoney(cash: CashDomain) {
        console.log('------------------cash orm', cash);
        try {
            const cashNotClosed: any = await CashModel.findOne({ where: { id: cash.getId, closed: false } });
            cashNotClosed.closingMoney = cash.getClosingMoney;
            await cashNotClosed.save();
            return cashNotClosed;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
