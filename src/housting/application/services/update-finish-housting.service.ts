import { Service } from "typedi";
import { FinishHoustingUseCase } from "../ports/in/finish-housting";
import { UpdateFinishPort } from "../ports/out/self-domain/update-finish.port";
import { HoustingPersistenceAdapter } from "../../adapters/out/persistence/housting-persistence.adapter";
import { UpdateConditionFromHoustingDomain } from "../ports/out/other-domain/update-condition-of-room-from-housting-domain";
import { UpdateConditionOfRoomService } from "../../../configuration-hotel/room/application/services/update-condition-of-room.service";

@Service()
export class UpdateFinishHoustingService implements FinishHoustingUseCase {
  private updateFinishPort: UpdateFinishPort;
  private updateConditionFromHoustingDomain: UpdateConditionFromHoustingDomain;

  constructor(
    houstingPersistenceAdapter: HoustingPersistenceAdapter,
    updateConditionOfRoomService: UpdateConditionOfRoomService
  ) {
    this.updateFinishPort = houstingPersistenceAdapter;
    this.updateConditionFromHoustingDomain = updateConditionOfRoomService;
  }
  async finishHousting(houstingId: number): Promise<any> {
    const houstingFinished = await this.updateFinishPort.updateFinish(
      houstingId
    );

    if (!houstingFinished) {
      return { message: "A problem trying to finish housting has ocurred" };
    }

    const rommConditionForClearId = 2;
    const roomCondtionUpdated =
      await this.updateConditionFromHoustingDomain.updateFromHoustingDomain(
        houstingFinished.roomId,
        rommConditionForClearId
      );

    if (!roomCondtionUpdated) {
      return {
        message: "A problem trying set new condition for room has ocurred",
      };
    }

    return houstingFinished;
  }
}
