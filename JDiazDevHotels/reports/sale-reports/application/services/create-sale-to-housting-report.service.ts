import { Service, Container } from "typedi";
import { CreateSaleReportUseCase } from './../ports/in/create-sale-report-use-case';
import { GetProductSalesToSaleReportDomain } from './../ports/out/other-domains/get-product-sales-to-sale-report-domain';
import { GetProductsSaledService } from './../../../../product-sales/application/services/get-products-saled.service';
import { MoneySpentDomainEntity } from "../../domain/money-spent";
import { CreateSaleReportPort } from './../ports/out/self-domain/create-sale-report.port';
import { SaleReportPersistenceAdapter } from './../../adapter/out/persistence/sale-report-persistence.adapter';

@Service()
export class CreateSaleReportService implements CreateSaleReportUseCase {
    //other domains
    private getProductSalesToSaleReportDomain:GetProductSalesToSaleReportDomain

    //self ports
    private createSaleReportPort:CreateSaleReportPort

    constructor(
        //other domains
        getProductsSaledService:GetProductsSaledService,
    
        //self ports
        saleReportPersistenceAdapter:SaleReportPersistenceAdapter
    ){
        this.getProductSalesToSaleReportDomain = getProductsSaledService
        this.createSaleReportPort = saleReportPersistenceAdapter
    }
    async createTheSaleReport(houstingId:number):Promise<any>{
        const moneyOfSetProducts:MoneySpentDomainEntity = await this.getProductSalesToSaleReportDomain.getProductSalesToSaleReportDomain(houstingId)
        
        const moneyTotalByHoustingInProducts =  moneyOfSetProducts.calculateTotalMoneySpentInProducts()

        const saleReportCreated = await this.createSaleReportPort.createSaleReport(moneyTotalByHoustingInProducts)
        return saleReportCreated
    }

}

/* 
const execute = Container.get(CreateSaleReportService)
execute.createTheSaleReport(1)

 */