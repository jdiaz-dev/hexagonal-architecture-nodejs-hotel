import { Service } from "typedi";

import { GetHoustingRequest } from './../ports/in/get-housting-request';
import { GetHoustingModeledPort } from './../ports/out/self-domain/get-housting-modeled';
import { HoustingPersistenceAdapter } from './../../adapter/out/persistence/housting-persistence.adapter';
import { HoustingDomainEntity } from "../../domain/housting";
import { HoustingCommand } from "../ports/in/housting.command";
import { GetHoustingPort } from './../ports/out/self-domain/get-housting.port';

@Service()
export class GetHoustingService implements GetHoustingRequest{
    private getHoustingModeledPort:GetHoustingModeledPort
    private getHoustingPort:GetHoustingPort

    constructor(houstingPersistenceAdapter:HoustingPersistenceAdapter){
        this.getHoustingModeledPort = houstingPersistenceAdapter 
        this.getHoustingPort = houstingPersistenceAdapter 
    }
    async getTheHousting(houstingId:number, command:HoustingCommand):Promise<any>{
        const houstingModeled:HoustingDomainEntity = await this.getHoustingModeledPort.getHoustingModeled(houstingId) 

        if( ! houstingModeled.checkIfCashBelongsToHousting(command.getCashId) ){
            return { message: 'You cannot access to this housting, problem with cash'}
        }

        if( ! houstingModeled.checkIfClientBelongsToHousting(command.getClientId) ){
            return { message: 'You cannot access to this housting, problem with client'}
        }

        if( ! houstingModeled.checkIfRoomBelongsToHousting(command.getRoomId) ){
            return { message: 'You cannot access to this housting, problem with room'}
        }
        const housting = await this.getHoustingPort.getHousting(houstingId)
        return housting
    }
}