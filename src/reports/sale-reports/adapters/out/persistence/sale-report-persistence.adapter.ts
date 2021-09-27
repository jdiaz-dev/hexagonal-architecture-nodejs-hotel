import { Service } from 'typedi';
import { CreateSaleReportPort } from '../../../application/ports/out/self-domain/create-sale-report.port';
import { SaleReportORM } from './sale-report.orm';
import { GetSaleReportPort } from '../../../application/ports/out/self-domain/get-sale-report.port';
import { UpdateMoneyInSaleReportPort } from './../../../application/ports/out/self-domain/update-money-in-sale-report.port';
import { SaleReportDomain } from '../../../domain/sale-report';
import { SaleReportMapper } from './sale-report.mapper';
import { GetSaleReportModeledForSelfDomainPort } from './../../../application/ports/out/self-domain/get-sale-report-modeled-for-self-domain.port';

@Service()
export class SaleReportPersistenceAdapter
    implements
        CreateSaleReportPort,
        GetSaleReportPort,
        GetSaleReportModeledForSelfDomainPort,
        UpdateMoneyInSaleReportPort
{
    constructor(private saleReportORM: SaleReportORM, private saleReportMapper: SaleReportMapper) {}

    async createSaleReport(houstingId: number, moneyTotal: number): Promise<SaleReportDomain> {
        const saleReport = await this.saleReportORM.createSaleReport(houstingId, moneyTotal);
        return this.saleReportMapper.mapForSelfDomain(saleReport);
    }
    async getSaleReport(houstingId: number): Promise<any> {
        const saleReport = await this.saleReportORM.getSaleReport(houstingId);
        return saleReport;
    }
    async getSaleReportModeledForSelfDomain(houstingId: number): Promise<SaleReportDomain> {
        const saleReport = await this.saleReportORM.getSaleReport(houstingId);
        return this.saleReportMapper.mapForSelfDomain(saleReport);
    }
    async updateMoneyInSaleReport(_saleReport: SaleReportDomain) {
        const saleReport = await this.saleReportORM.updateMoneyInSaleReport(_saleReport);
        return saleReport;
    }
}
