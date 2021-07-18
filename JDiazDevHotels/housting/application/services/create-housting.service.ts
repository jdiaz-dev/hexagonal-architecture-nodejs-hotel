import { Service } from "typedi";

import { DataHousting } from "./data-housting";
import { CreateHoustingPort } from './../ports/out/self-domain/create-housting.port';
import { HoustingPersistenceAdapter } from './../../adapter/out/persistence/housting-persistence.adapter';
import { GetRoomForHoustingDomain } from './../ports/out/other-domain/get-room-for-housting-domain';
import { GetRoomService } from '../../../configuration-hotel/room/application/services/get-room.service';
import { GetCashForHoustingDomain } from '../ports/out/other-domain/get-cash-for-housting-domain';
import { GetCashService } from './../../../cash/application/services/get-cash.service';
import { GetClientForHoustingDomain } from './../ports/out/other-domain/get-client-for-housting-domain';
import { GetClientService } from './../../../clients/application/services/get-client.service';

@Service()
export class CreateHoustingService {

    //other domains
    private getCashForHoustingDomain: GetCashForHoustingDomain
    private getClientForHoustingDomain: GetClientForHoustingDomain
    private getRoomForHoustingDomain: GetRoomForHoustingDomain

    //self ports
    private createHoustingPort: CreateHoustingPort
    constructor(
        //other domains
        getCashService: GetCashService,
        getRoomService: GetRoomService,
        getClientService: GetClientService,

        //self ports
        houstingPersistenceAdapter: HoustingPersistenceAdapter,
    ) {
        //other domain
        this.getCashForHoustingDomain = getCashService
        this.getRoomForHoustingDomain = getRoomService
        this.getClientForHoustingDomain = getClientService

        this.createHoustingPort = houstingPersistenceAdapter
    }
    async createTheHousting(cashId: number, clientId: number, roomId: number, dataHousting: DataHousting): Promise<any> {

        const cash = await this.getCashForHoustingDomain.getCashForHoustingDomain(cashId)
        if (!cash) {
            return { message: 'There are not cash for this housting' }
        }

        const client = await this.getClientForHoustingDomain.getClientForHoustingDomain(clientId)
        if (!client) {
            return { message: 'This client does not exits for this housting' }
        }

        const room = await this.getRoomForHoustingDomain.getRoomForHoustingDomain(roomId)
        if (!room) {
            return { message: 'There are not room for this housting' }
        }

        const housting = await this.createHoustingPort.createHousting(cashId, clientId, roomId, dataHousting)
        return housting
    }



}


