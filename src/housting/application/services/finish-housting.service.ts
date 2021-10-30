import { Service } from 'typedi';
import { FinishHoustingUseCase } from '../ports/in/finish-housting';
import { UpdateFinishHoustingPort } from '../ports/out/self-domain/update-finish.p-houstingort';
import { HoustingPersistenceAdapter } from '../../adapters/out/persistence/housting-persistence.adapter';
import { UpdateRoomConditionFromHoustingDomainPort } from '../ports/out/other-domain/update-room-condition-from-housting-domain.port';
import { SETTINGS } from '../../../shared/settings/settings';
import { RoomPersistenceAdapter } from '../../../configuration-hotel/room/adapters/out/persistence/room-persistence.adapter';

@Service()
export class FinishHoustingService implements FinishHoustingUseCase {
    private updateFinishHoustingPort: UpdateFinishHoustingPort;

    //other domains
    private updateRoomConditionFromHoustingDomainPort: UpdateRoomConditionFromHoustingDomainPort;

    constructor(
        roomPersistenceAdapter: RoomPersistenceAdapter,

        //other domains
        houstingPersistenceAdapter: HoustingPersistenceAdapter,
    ) {
        this.updateFinishHoustingPort = houstingPersistenceAdapter;
        this.updateRoomConditionFromHoustingDomainPort = roomPersistenceAdapter;
    }
    async finishHousting(houstingId: number): Promise<any> {
        const houstingFinished = await this.updateFinishHoustingPort.updateFinish(houstingId);

        if (!houstingFinished) {
            return { message: 'A problem trying to finish housting has ocurred' };
        }

        const rommConditionForCleaningId = SETTINGS.base.databaseIds.cleaningConditionId;
        const roomCondtionUpdated = await this.updateRoomConditionFromHoustingDomainPort.updateRoomCondition(
            houstingFinished.roomId,
            rommConditionForCleaningId,
        );

        if (!roomCondtionUpdated) {
            return {
                message: 'A problem trying set new condition for room has ocurred',
            };
        }

        return houstingFinished;
    }
}
