import { HoustingDomainEntity } from "../../../../domain/housting";

export interface GetHoustingModeledPort {
    getHoustingModeled(houstingId:number):Promise<HoustingDomainEntity>
}