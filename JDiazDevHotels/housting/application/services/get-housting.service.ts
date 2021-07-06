import { Service } from "typedi";

import { GetHoustingRequest } from './../ports/in/get-housting-request';
import { GetHoustingModeledPort } from './../ports/out/self-domain/get-housting-modeled';
import { HoustingPersistenceAdapter } from './../../adapter/out/persistence/housting-persistence.adapter';
import { HoustingDomainEntity } from "../../domain/housting";
import { HoustingCommand } from "../ports/in/housting.command";
import { GetHoustingPort } from './../ports/out/self-domain/get-housting.port';
import { GetHoustingModeledForMiddleware } from './../../adapter/in/web/interfaces/get-housting-modeled-for-middleware';
import { GetHoustingForHoustingReportDomain } from "../../../reports/housting-reports/application/ports/out/other-domains/get-housting-for-housting-report-domain";
import { MoneyPaidHoustingDomainEntity } from "../../../reports/housting-reports/domain/money-paid-housting";

@Service()
export class GetHoustingService implements 
        GetHoustingRequest, 
        GetHoustingModeledForMiddleware,
        GetHoustingForHoustingReportDomain {
    private getHoustingModeledPort:GetHoustingModeledPort
    private getHoustingPort:GetHoustingPort

    constructor(houstingPersistenceAdapter:HoustingPersistenceAdapter){
        this.getHoustingModeledPort = houstingPersistenceAdapter 
        this.getHoustingPort = houstingPersistenceAdapter 
    }
    async getTheHousting(houstingId:number):Promise<any>{
        const housting = await this.getHoustingPort.getHousting(houstingId)
        return housting
    }
    async getHoustingModeledForMiddleware(houstingId:number):Promise<any>{
        const houstingModeled:HoustingDomainEntity = await this.getHoustingModeledPort.getHoustingModeled(houstingId) 

        return houstingModeled
    }
    async getHoustingForHoustingReportDomain(houstingId:number):Promise<MoneyPaidHoustingDomainEntity>{
        const housting = await this.getHoustingPort.getHousting(houstingId)
        return new MoneyPaidHoustingDomainEntity(housting.id, housting.moneyPaid)
    }

 
}