import { Service } from "typedi";
import { CreateHoustingReportPort } from '../../../application/ports/out/self-domain/create-housting-report.port';
import { HoustingReportORM } from './housting-report.orm';

@Service()
export class HoustingReportPersistenceAdapter implements CreateHoustingReportPort {
    constructor(
        private houstingReportORM:HoustingReportORM
    ){}
    async createHoustingReport(houstingId:number, saleReportId:number|null, moneyTotal:number):Promise<any>{
        const houstigReport = await this.houstingReportORM.createHoustingReport(houstingId, saleReportId, moneyTotal)
        return houstigReport
    }
}


