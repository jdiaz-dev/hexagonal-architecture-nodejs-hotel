import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateNewHotelLevelRequest } from '../../../application/ports/in/create-new-hotel-level.request';
import { CreateAndUpdateHotelLevelService } from '../../../application/services/create-hotel-level.service';
import { GetHotelLevelsRequest } from '../../../application/ports/in/get-hotel-levels-request';
import { GetHotelLevelsService } from '../../../application/services/get-hotel-levels.service';
import { UpdateTheHotelLevelRequest } from '../../../application/ports/in/update-the-hote-level.request';
import { HotelLevelCommand } from '../../../application/ports/in/hotel-level.command';
import { RemoveHotelLevelRequest } from '../../../application/ports/in/remove-hotel-level.request';
import { RemoveHotelLevelService } from '../../../application/services/remove-hotel.level.service';
import { SETTINGS } from '../../../../../../shared/settings/settings';
import { IQueries } from '../../../../../../shared/interfaces/query.interface';

@Service()
export class LevelController {
    private createNewHotelLevelRequest: CreateNewHotelLevelRequest;
    private updateTheHotelLevelRequest: UpdateTheHotelLevelRequest;
    private getHotelLevelsRequest: GetHotelLevelsRequest;
    private removeHotelLevelRequest: RemoveHotelLevelRequest;

    constructor(
        createAndUpdateHotelLevelService: CreateAndUpdateHotelLevelService,
        getHotelLevelsService: GetHotelLevelsService,
        removeHotelLevelService: RemoveHotelLevelService,
    ) {
        this.createNewHotelLevelRequest = createAndUpdateHotelLevelService;
        this.updateTheHotelLevelRequest = createAndUpdateHotelLevelService;
        this.removeHotelLevelRequest = removeHotelLevelService;
        this.getHotelLevelsRequest = getHotelLevelsService;
    }
    createLevel = async (req: Request | any, res: Response) => {
        const { numberLevel, nameLevel } = req.body;
        const { hotelId } = req.params;

        console.log('---------------creating level');
        const newLevel = await this.createNewHotelLevelRequest.createNewLevel(
            numberLevel,
            nameLevel,
            parseInt(hotelId),
        );
        res.json(newLevel);
    };
    upateLevel = async (req: Request | any, res: Response) => {
        const { numberLevel, nameLevel } = req.body;
        const { hotelId, levelId } = req.params;

        const newLevel = await this.updateTheHotelLevelRequest.updateTheHotelLevel(
            numberLevel,
            nameLevel,
            parseInt(levelId),
            new HotelLevelCommand(parseInt(hotelId)),
        );
        res.json(newLevel);
    };
    getLevelsOfHotel = async (req: Request | any, res: Response) => {
        const { hotelId } = req.params;
        const {
            limit = SETTINGS.base.queries.limit,
            offset = SETTINGS.base.queries.offset,
            orderby = SETTINGS.base.queries.orderBy,
        } = req.query as unknown as IQueries;

        const queries: IQueries = {
            limit: Number(limit),
            offset: Number(offset),
            orderby,
        };
        const levels = await this.getHotelLevelsRequest.getLevelsOfHotel(parseInt(hotelId), queries);
        res.json(levels);
    };
    removeLevel = async (req: Request | any, res: Response) => {
        const { hotelId, levelId } = req.params;

        const levelRemoved = await this.removeHotelLevelRequest.removeTheHotelLevel(
            parseInt(levelId),
            new HotelLevelCommand(parseInt(hotelId)),
        );
        res.json(levelRemoved);
    };
}
