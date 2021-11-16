import { Service } from 'typedi';
import { DataCash } from '../../../application/services/data-cash';
import { CashModel } from './cash.model';
import { ICashRepository } from './cash-repository';
import { CashDomain } from '../../../domain/cash';
import { DailyReportModel } from '../../../../reports/daily-reports/adapters/out/daily-report.model';
import { Sequelize as seq } from 'sequelize';
import { IQueries } from '../../../../../shared/interfaces/query.interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Service()
export class CashORM implements ICashRepository {
    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        try {
            const cash = new CashModel();
            cash.openingMoney = dataCash.openingMoney;
            cash.closingMoney = dataCash.openingMoney;
            cash.openingDate = dataCash.date;
            cash.openingTime = dataCash.time;
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
    async getCashWithDailyReport(hotelId: number, queries: IQueries): Promise<any> {
        try {
            const cashWiDailyReport = await CashModel.findAndCountAll({
                where: { hotelId: hotelId },
                attributes: [
                    'id',
                    'openingMoney',
                    'closingMoney',
                    'closed',
                    'openingDate',
                    'openingTime',
                    'closingDate',
                    'closingTime',
                ],
                include: [
                    {
                        model: DailyReportModel,
                        on: seq.where(seq.col('CashModel.id'), '=', seq.col('DailyReportModel.cashId')),
                        attributes: ['id', 'moneyHousting', 'moneySales'],
                    },
                ],
                order: [['id', 'DESC']],
                limit: queries.limit,
                offset: queries.offset,
            });
            return cashWiDailyReport;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateClosingMoney(cash: CashDomain) {
        try {
            const cashNotClosed: any = await CashModel.findOne({ where: { id: cash.getId, closed: false } });
            cashNotClosed.closingMoney = cash.getClosingMoney;
            await cashNotClosed.save();
            return cashNotClosed;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async closeCash(cashId: number): Promise<any> {
        try {
            const cashClosed: any = await CashModel.findOne({
                where: { id: cashId, closed: false },
                attributes: ['id', 'closingMoney', 'closed'],
            });
            cashClosed.closed = 1;
            cashClosed.closingDate = dayjs().format('YYYY-M-D');
            cashClosed.closingTime = dayjs().format('HH:mm:ss');
            await cashClosed.save();
            return cashClosed;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
