import { HoustingCommand } from './housting.command';

export interface GetHoustingRequest {
    getTheHousting(houstingId:number, command:HoustingCommand):Promise<any>
}