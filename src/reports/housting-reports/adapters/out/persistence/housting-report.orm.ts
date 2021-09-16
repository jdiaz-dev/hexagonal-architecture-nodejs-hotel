import { Service } from 'typedi';
import { SaleReportModel } from '../../../../sale-reports/adapters/out/persistence/sale-report.model';
import { HoustingReportModel } from './housting-report.model';
import { HoustingReportRepository } from './housting-report.repository';
import { HoustingModel } from './../../../../../housting/adapters/out/persistence/housting.model';

@Service()
export class HoustingReportORM implements HoustingReportRepository {
    async createHoustingReport(
        cashId: number,
        houstingId: number,
        saleReportId: number,
        moneyTotal: number,
    ): Promise<any> {
        try {
            const houstingReport = new HoustingReportModel();
            houstingReport.cashId = cashId;
            houstingReport.houstingId = houstingId;
            houstingReport.total = moneyTotal;
            houstingReport.saleReportId = saleReportId;
            await houstingReport.save();

            return houstingReport;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getHoustingReport(houstingId: number): Promise<any> {
        try {
            const houstingReport = HoustingReportModel.findOne({
                where: { houstingId },
                attributes: ['id', 'total'],
                include: [
                    {
                        model: SaleReportModel,
                        as: 'saleReport',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'state', 'hotelId'],
                        },
                    },
                ],
            });
            return houstingReport;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
