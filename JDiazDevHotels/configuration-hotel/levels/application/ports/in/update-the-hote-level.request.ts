import { HotelLevelCommand } from './hotel-level.command';

export interface UpdateTheHotelLevelRequest {
    updateTheHotelLevel(nameLevel:string, levelId:number, command:HotelLevelCommand):Promise<any>
}