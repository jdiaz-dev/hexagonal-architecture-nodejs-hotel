import { IQueries } from '../../../../../../shared/interfaces/query.interface';

export interface LevelRepository {
    saveLevel(numberLevel: number, nameLevel: string, hotelId: number): Promise<any>;
    getLevels(hotelId: number, queries: IQueries): Promise<any>;
    getLevel(levelId: number): Promise<any>;
    updateLevel(numberLevel: number, nameLevel: string, levelId: number): Promise<any>;
    removeHotelLevel(levelId: number): Promise<any>;
}
