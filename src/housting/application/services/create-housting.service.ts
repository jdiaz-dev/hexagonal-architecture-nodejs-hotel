import { Service } from 'typedi';

import { DataHousting } from './data-housting';
import { CreateHoustingPort } from '../ports/out/self-domain/create-housting.port';
import { HoustingPersistenceAdapter } from '../../adapters/out/persistence/housting-persistence.adapter';
import { GetRoomForHoustingDomain } from '../ports/out/other-domain/get-room-for-housting-domain';
import { GetRoomService } from '../../../configuration-hotel/room/application/services/get-room.service';
import { GetCashForHoustingDomain } from '../ports/out/other-domain/get-cash-for-housting-domain';
import { GetCashService } from '../../../cash/application/services/get-cash.service';
import { GetClientForHoustingDomain } from '../ports/out/other-domain/get-client-for-housting-domain';
import { GetClientService } from '../../../clients/application/services/get-client.service';
import { SETTINGS } from '../../../../settings/settings';
import { UpdateConditionFromHoustingDomain } from '../ports/out/other-domain/update-condition-of-room-from-housting-domain';
import { UpdateConditionOfRoomService } from '../../../configuration-hotel/room/application/services/update-condition-of-room.service';

@Service()
export class CreateHoustingService {
    //other domains
    private getCashForHoustingDomain: GetCashForHoustingDomain;
    private getClientForHoustingDomain: GetClientForHoustingDomain;
    private getRoomForHoustingDomain: GetRoomForHoustingDomain;
    private updateConditionFromHoustingDomain: UpdateConditionFromHoustingDomain;

    //self ports
    private createHoustingPort: CreateHoustingPort;
    constructor(
        //other domains
        getCashService: GetCashService,
        getRoomService: GetRoomService,
        getClientService: GetClientService,
        updateConditionOfRoomService: UpdateConditionOfRoomService,

        //self ports
        houstingPersistenceAdapter: HoustingPersistenceAdapter,
    ) {
        //other domain
        this.getCashForHoustingDomain = getCashService;
        this.getRoomForHoustingDomain = getRoomService;
        this.getClientForHoustingDomain = getClientService;
        this.updateConditionFromHoustingDomain = updateConditionOfRoomService;

        this.createHoustingPort = houstingPersistenceAdapter;
    }
    async createTheHousting(
        cashId: number,
        clientId: number,
        roomId: number,
        dataHousting: DataHousting,
    ): Promise<any> {
        const cash = await this.getCashForHoustingDomain.getCashForHoustingDomain(cashId);
        if (!cash) {
            return { message: 'There are not cash for this housting' };
        }

        const client = await this.getClientForHoustingDomain.getClientForHoustingDomain(clientId);
        if (!client) {
            return { message: 'This client does not exits for this housting' };
        }

        const busyCondtionId = SETTINGS.base.databaseIds.busyConditionId;
        const room = await this.getRoomForHoustingDomain.getRoomForHoustingDomain(roomId);

        const conditionOfRoomUpdated = await this.updateConditionFromHoustingDomain.updateFromHoustingDomain(
            roomId,
            busyCondtionId,
        );
        if (!conditionOfRoomUpdated) {
            return { message: 'There are not room for this housting' };
        }

        dataHousting.price = room.price - dataHousting.discountApplied;
        const housting = await this.createHoustingPort.createHousting(cashId, clientId, roomId, dataHousting);
        return housting;
    }
}
