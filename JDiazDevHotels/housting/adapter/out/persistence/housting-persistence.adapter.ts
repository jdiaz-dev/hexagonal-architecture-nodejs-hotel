import { Service } from "typedi";
import { CreateHoustingPort } from "../../../application/ports/out/self-domain/create-housting.port";
import { DataHousting } from "../../../application/services/data-housting";
import { HoustingORM } from './housting.orm';
import { GetHoustingPort } from './../../../application/ports/out/self-domain/get-housting.port';
import { GetHoustingModeledPort } from "../../../application/ports/out/self-domain/get-housting-modeled";
import { HoustingDomainEntity } from "../../../domain/housting";

@Service()
export class HoustingPersistenceAdapter implements
        CreateHoustingPort, 
        GetHoustingPort, 
        GetHoustingModeledPort{
    
    constructor(private houstingORM:HoustingORM){}
    
    async createHousting(cashId:number, clientId:number, roomId:number, dataHousting:DataHousting):Promise<any>{
        const housting = await this.houstingORM.createHousting(cashId, clientId, roomId, dataHousting)
        return housting
    }
    async getHousting(houstingId:number):Promise<any>{
        const housting = await this.houstingORM.getHousting(houstingId)
        return housting
    }
    async getHoustingModeled(houstingId:number):Promise<HoustingDomainEntity>{
        const housting = await this.houstingORM.getHousting(houstingId)
        return new HoustingDomainEntity(housting.cashId, housting.clientId, housting.roomId)
    }
}