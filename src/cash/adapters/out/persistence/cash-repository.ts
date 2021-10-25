import { IQueries } from '../../../../shared/interfaces/query.interface';
import { DataCash } from '../../../application/services/data-cash';
import { CashDomain } from '../../../domain/cash';

export interface ICashRepository {
    createCash(hotelId: number, dataCash: DataCash): Promise<any>;
    getCash(cashId: number): Promise<any>;
    getCashNotClosed(hotelId: number): Promise<any>;
    getCashWithDailyReport(hotelId: number, queries: IQueries): Promise<any>;
    updateClosingMoney(cash: CashDomain): Promise<any>;
    closeCash(cashId: number): Promise<any>;
}
