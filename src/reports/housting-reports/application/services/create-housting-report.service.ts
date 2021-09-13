import { Service } from 'typedi';
import { GetSaleReportForHoustingReportDomain } from '../ports/out/other-domains/get-sale-report-for-housting-report-domain';
import { GetSaleReportService } from '../../../sale-reports/application/services/get-sale-report.service';
import { MoneyPaidHoustingDomainEntity } from '../../domain/money-paid-housting';
import { GetHoustingForHoustingReportDomain } from '../ports/out/other-domains/get-housting-for-housting-report-domain';
import { GetHoustingService } from '../../../../housting/application/services/get-housting.service';
import { MoneyPaidSaleReportDomainEntity } from '../../domain/money-paid-sale-report';
import { MoneyTotalDomainEntity } from '../../domain/money-total';
import { CreateHoustingReportPort } from '../ports/out/self-domain/create-housting-report.port';
import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';

@Service()
export class CreateHoustingReportService {
  //other domains and services
  private getSaleReportForHoustingReportDomain: GetSaleReportForHoustingReportDomain;
  private getHoustingForHoustingReportDomain: GetHoustingForHoustingReportDomain;

  //self ports
  private createHoustingReportPort: CreateHoustingReportPort;

  constructor(
    //other domains and services
    getSaleReportService: GetSaleReportService,
    getHoustingService: GetHoustingService,

    //self domain
    houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter,
  ) {
    //other domains and services
    this.getSaleReportForHoustingReportDomain = getSaleReportService;
    this.getHoustingForHoustingReportDomain = getHoustingService;

    //self domain
    this.createHoustingReportPort = houstingReportPersistenceAdapter;
  }
  async createHoustingReport(cashId: number, houstingId: number): Promise<any> {
    const housting: MoneyPaidHoustingDomainEntity =
      await this.getHoustingForHoustingReportDomain.getHoustingForHoustingReportDomain(houstingId);

    const saleReport: MoneyPaidSaleReportDomainEntity | any =
      await this.getSaleReportForHoustingReportDomain.getSaleReportForHoustingReportDomain(houstingId);

    const money = new MoneyTotalDomainEntity(housting, saleReport ? saleReport : null);
    const totalMoney = money.calculateMoneyTotal();

    const houstingReportCreated = await this.createHoustingReportPort.createHoustingReport(
      cashId,
      housting.id,
      saleReport.id,
      totalMoney,
    );
    return houstingReportCreated;
  }
}
