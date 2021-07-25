import { HotelLevelCommand } from './hotel-level.command';

export interface UpdateTheHotelLevelRequest {
    updateTheHotelLevel(numberLevel: number, nameLevel: string, levelId: number, command: HotelLevelCommand): Promise<any>
}