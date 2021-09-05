import { Service } from "typedi";

import { CreateNewHotelLevelRequest } from "../ports/in/create-new-hotel-level.request";
import { CreateLevelPort } from "../ports/out/create-level.port";
import { LevelPersistenceAdpater } from "../../adapters/out/persistence/level-persistence.adapter";
import { UpdateLevelPort } from "../ports/out/update-level.port";
import { UpdateTheHotelLevelRequest } from "../ports/in/update-the-hote-level.request";
import { LevelDomainEntity } from "../../domain/level";
import { GetLevelModeledPort } from "../ports/out/get-level-modeled.port";
import { HotelLevelCommand } from "../ports/in/hotel-level.command";

@Service()
export class CreateAndUpdateHotelLevelService
  implements CreateNewHotelLevelRequest, UpdateTheHotelLevelRequest
{
  private createLevelPort: CreateLevelPort;
  private updateLevelPort: UpdateLevelPort;
  private getLevelModeledPort: GetLevelModeledPort;

  constructor(levelPersistenceAdpater: LevelPersistenceAdpater) {
    this.createLevelPort = levelPersistenceAdpater;
    this.updateLevelPort = levelPersistenceAdpater;
    this.getLevelModeledPort = levelPersistenceAdpater;
  }
  async createNewLevel(
    numberLevel: number,
    nameLevel: string,
    hotelId: number
  ): Promise<any> {
    const level = await this.createLevelPort.createLevel(
      numberLevel,
      nameLevel,
      hotelId
    );
    return level;
  }

  async updateTheHotelLevel(
    numberLevel: number,
    nameLevel: string,
    levelId: number,
    command: HotelLevelCommand
  ): Promise<any> {
    const level: LevelDomainEntity =
      await this.getLevelModeledPort.getLevelModeledToDomain(levelId);
    if (!level.checkIfLevelBelongsToHotel(command.getHotelId)) {
      return { message: "You cannot update this level" };
    }

    const levelUpdated = await this.updateLevelPort.updateLevel(
      numberLevel,
      nameLevel,
      levelId
    );
    return levelUpdated;
  }
}
