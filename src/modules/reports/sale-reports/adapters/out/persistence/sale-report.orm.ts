import { Service } from 'typedi';
import { SaleReportRepository } from './sale-report.repository';
import { SaleReportModel } from './sale-report.model';
import { SaleReportDomain } from '../../../domain/sale-report';

@Service()
export class SaleReportORM implements SaleReportRepository {
    async createSaleReport(houstingId: number, moneyTotal: number): Promise<any> {
        try {
            const saleReport = new SaleReportModel();
            saleReport.total = moneyTotal;
            saleReport.houstingId = houstingId;
            await saleReport.save();

            return saleReport;
        } catch (error) {
            console.log('-----------------', error);
        }
    }
    async getSaleReport(houstingId: number): Promise<any> {
        try {
            const saleReport = await SaleReportModel.findOne({ where: { houstingId: houstingId } });
            return saleReport;
        } catch (error) {
            console.log('-----------------', error);
        }
    }
    async updateMoneyInSaleReport(_saleReport: SaleReportDomain) {
        try {
            const saleReport: any = await SaleReportModel.findByPk(_saleReport.getSaleReportId);
            saleReport.total = _saleReport.getMoneyTotal;
            await saleReport.save();

            return saleReport;
        } catch (error) {
            console.log('-----------------', error);
        }
    }
}
