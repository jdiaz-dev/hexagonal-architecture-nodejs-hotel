import { Service } from "typedi";

import { GetHoustingRequest } from './../ports/in/get-housting-request';
import { GetHoustingModeledPort } from './../ports/out/self-domain/get-housting-modeled';
import { HoustingPersistenceAdapter } from './../../adapter/out/persistence/housting-persistence.adapter';
import { HoustingDomainEntity } from "../../domain/housting";
import { HoustingCommand } from "../ports/in/housting.command";
import { GetHoustingPort } from './../ports/out/self-domain/get-housting.port';
import { GetHoustingModeledForMiddleware } from './../../adapter/in/web/interfaces/get-housting-modeled-for-middleware';

@Service()
export class GetHoustingService implements 
        GetHoustingRequest, 
        GetHoustingModeledForMiddleware {
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

}