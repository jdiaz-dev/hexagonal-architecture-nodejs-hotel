import { HoustingDomainEntity } from "../../../../domain/housting";

export interface GetHoustingModeledPort {
    getHoustingModeled(roomId: number): Promise<HoustingDomainEntity>
}