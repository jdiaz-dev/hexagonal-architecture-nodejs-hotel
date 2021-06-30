import { HotelLevelCommand } from './hotel-level.command';

export interface RemoveHotelLevelRequest {
    removeTheHotelLevel(levelId:number, command:HotelLevelCommand):Promise<any>
}