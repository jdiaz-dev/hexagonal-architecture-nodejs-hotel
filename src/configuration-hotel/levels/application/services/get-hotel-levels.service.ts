import { Service } from 'typedi';

import { GetHotelLevelsPort } from '../ports/out/get-hotel-levels.port';
import { LevelPersistenceAdpater } from '../../adapters/out/persistence/level-persistence.adapter';

import { GetHotelLevelsRequest } from '../ports/in/get-hotel-levels-request';
import { IQueries } from '../../../../shared/interfaces/query.interface';

@Service()
export class GetHotelLevelsService implements GetHotelLevelsRequest {
    private getLevelsPort: GetHotelLevelsPort;

    constructor(levelPersistenceAdpater: LevelPersistenceAdpater) {
        this.getLevelsPort = levelPersistenceAdpater;
    }
    async getLevelsOfHotel(hotelId: number, queries: IQueries): Promise<any> {
        const levels = await this.getLevelsPort.getLevels(hotelId, queries);
        return levels;
    }
}
