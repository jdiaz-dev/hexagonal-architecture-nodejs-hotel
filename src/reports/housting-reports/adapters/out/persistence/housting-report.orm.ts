import { Service } from 'typedi';
import { SaleReportModel } from '../../../../sale-reports/adapters/out/persistence/sale-report.model';
import { HoustingReportModel } from './housting-report.model';
import { HoustingReportRepository } from './housting-report.repository';
import { HoustingModel } from './../../../../../housting/adapters/out/persistence/housting.model';
import { HoustingReportDomain } from '../../../domain/housting-report';
import { RoomModel } from '../../../../../configuration-hotel/room/adapters/out/persistence/room.model';

@Service()
export class HoustingReportORM implements HoustingReportRepository {
    async createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any> {
        try {
            const houstingReport = new HoustingReportModel();
            houstingReport.cashId = cashId;
            houstingReport.houstingId = houstingId;
            houstingReport.total = moneyToAdd;
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
    async getHoustingReports(cashId: number): Promise<any> {
        try {
            const houstingReport = HoustingReportModel.findAndCountAll({
                where: { cashId },
                attributes: ['id', 'total'],
                include: [
                    {
                        model: HoustingModel,
                        as: 'housting',
                        attributes: ['id', 'moneyPaid', 'entryDate', 'entryTime', 'outputDate', 'outputTime'],
                        include: [
                            {
                                model: RoomModel,
                                as: 'room',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: SaleReportModel,
                        as: 'saleReport',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'houstingId'],
                        },
                    },
                ],
            });
            return houstingReport;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateMoneyInHoustingReport(
        _houstingReport: HoustingReportDomain,
        productsSaledReportId?: number,
    ): Promise<any> {
        try {
            const houstingReport: any = await HoustingReportModel.findByPk(_houstingReport.getId);
            houstingReport.total = _houstingReport.getMoneyTotal;
            if (productsSaledReportId) houstingReport.saleReportId = productsSaledReportId;

            await houstingReport.save();

            return houstingReport;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
