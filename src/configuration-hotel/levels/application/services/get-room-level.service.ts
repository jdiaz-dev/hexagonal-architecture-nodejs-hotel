import { Service } from 'typedi';

import { LevelPersistenceAdpater } from '../../adapters/out/persistence/level-persistence.adapter';
import { GetLevelPort } from '../ports/out/get-level.port';

@Service()
export class GetRoomLevelService {
    private getLevelPort: GetLevelPort;

    constructor(levelPersistenceAdpater: LevelPersistenceAdpater) {
        this.getLevelPort = levelPersistenceAdpater;
    }
}
