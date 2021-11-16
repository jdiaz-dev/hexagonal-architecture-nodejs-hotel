import { HoustingPriceDomain } from '../../../../domain/housting-price';

export interface GetRoomForHoustingDomainPort {
    getRoomForHoustingDomain(roomId: number): Promise<HoustingPriceDomain>;
}
