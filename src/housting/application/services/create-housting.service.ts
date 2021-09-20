import { Service } from 'typedi';

import { DataHousting } from './data-housting';
import { CreateHoustingPort } from '../ports/out/self-domain/create-housting.port';
import { HoustingPersistenceAdapter } from '../../adapters/out/persistence/housting-persistence.adapter';
import { GetRoomForHoustingDomainPort } from '../ports/out/other-domain/get-room-for-housting-domain.port';
import { GetCashForHoustingDomain } from '../ports/out/other-domain/get-cash-for-housting-domain';
import { GetCashService } from '../../../cash/application/services/get-cash.service';
import { GetClientForHoustingDomain } from '../ports/out/other-domain/get-client-for-housting-domain';
import { GetClientService } from '../../../clients/application/services/get-client.service';
import { SETTINGS } from '../../../../settings/settings';
import { UpdateRoomConditionFromHoustingDomainPort } from '../ports/out/other-domain/update-room-condition-from-housting-domain.port';
import { UpdateRoomConditionService } from '../../../configuration-hotel/room/application/services/update-room-condition.service';
import { RoomPersistenceAdapter } from '../../../configuration-hotel/room/adapters/out/persistence/room-persistence.adapter';
import { HoustingPriceDomain } from './../../domain/housting-price';

@Service()
export class CreateHoustingService {
    //other domains
    private getCashForHoustingDomain: GetCashForHoustingDomain;
    private getClientForHoustingDomain: GetClientForHoustingDomain;
    private updateRoomConditionFromHoustingDomainPort: UpdateRoomConditionFromHoustingDomainPort;
    private getRoomForHoustingDomainPort: GetRoomForHoustingDomainPort;

    //self ports
    private createHoustingPort: CreateHoustingPort;
    constructor(
        //other domains
        getCashService: GetCashService,
        getClientService: GetClientService,
        roomPersistenceAdapter: RoomPersistenceAdapter,

        //self ports
        houstingPersistenceAdapter: HoustingPersistenceAdapter,
    ) {
        //other domain
        this.getCashForHoustingDomain = getCashService;
        this.getClientForHoustingDomain = getClientService;
        this.updateRoomConditionFromHoustingDomainPort = roomPersistenceAdapter;
        this.getRoomForHoustingDomainPort = roomPersistenceAdapter;

        this.createHoustingPort = houstingPersistenceAdapter;
    }
    async createTheHousting(
        cashId: number,
        clientId: number,
        roomId: number,
        dataHousting: DataHousting,
    ): Promise<any> {
        const cash = await this.getCashForHoustingDomain.getCashForHoustingDomain(cashId);
        if (!cash) return { message: 'There are not cash for this housting' };

        const client = await this.getClientForHoustingDomain.getClientForHoustingDomain(clientId);
        if (!client) return { message: 'This client does not exits for this housting' };

        const busyCondtionId = SETTINGS.base.databaseIds.busyConditionId;
        const conditionOfRoomUpdated = await this.updateRoomConditionFromHoustingDomainPort.updateRoomCondition(
            roomId,
            busyCondtionId,
        );
        if (!conditionOfRoomUpdated) return { message: 'There are not room for this housting' };

        const room: HoustingPriceDomain = await this.getRoomForHoustingDomainPort.getRoomForHoustingDomain(roomId);

        dataHousting.price = room.calculateHoustingPrice(dataHousting.discountApplied);
        const housting = await this.createHoustingPort.createHousting(cashId, clientId, roomId, dataHousting);
        return housting;
    }
}
