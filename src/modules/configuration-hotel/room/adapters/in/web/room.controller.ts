import { Service } from 'typedi';
import { Request, Response } from 'express';

import { CreateNewRoomRequest } from '../../../application/ports/in/create-new-room.request';
import { GetRoomsRequest } from '../../../application/ports/in/get-rooms.request';
import { UpdateTheRoomRequest } from '../../../application/ports/in/update-the-room-request';
import { CreateAndUpdateRoomService } from '../../../application/services/create-and-update-room.service';
import { GetRoomsService } from '../../../application/services/get-roooms.service';
import { RoomData } from '../../../application/services/room-data';
import { RoomCommand } from '../../../application/ports/in/room.command';
import { RemoveTheRoomRequest } from '../../../application/ports/in/remove-the-room.request';
import { RemoveRoomService } from '../../../application/services/remove-room.service';
import { RoomWithLevelCommand } from '../../../application/ports/in/room-with-level.domain';
import { UpdateRoomCondtionRequest } from '../../../application/ports/in/update-room-condition.request';
import { UpdateRoomConditionService } from '../../../application/services/update-room-condition.service';
import { SETTINGS } from '../../../../../../shared/settings/settings';
import { IQueries } from '../../../../../../shared/interfaces/query.interface';
import { IGetRoomConditionReportUseCase } from '../../../application/ports/in/get-room-condition-report-use.case';
import { GetRoomConditionsReportService } from '../../../application/services/get-rooms-conditions-report.service';

@Service()
export class RoomController {
    private createNewRoomRequest: CreateNewRoomRequest;
    private updateTheRoomRequest: UpdateTheRoomRequest;
    private getRoomsRequest: GetRoomsRequest;
    private removeTheRoomRequest: RemoveTheRoomRequest;
    private updateRoomCondtionRequest: UpdateRoomCondtionRequest;
    private getRoomConditionReportUseCase: IGetRoomConditionReportUseCase;

    constructor(
        createAndUpdateRoomService: CreateAndUpdateRoomService,
        getRoomsService: GetRoomsService,
        removeRoomService: RemoveRoomService,
        updateRoomConditionService: UpdateRoomConditionService,
        getRoomConditionsReportService: GetRoomConditionsReportService,
    ) {
        this.createNewRoomRequest = createAndUpdateRoomService;
        this.updateTheRoomRequest = createAndUpdateRoomService;
        this.getRoomsRequest = getRoomsService;
        this.removeTheRoomRequest = removeRoomService;
        this.updateRoomCondtionRequest = updateRoomConditionService;
        this.getRoomConditionReportUseCase = getRoomConditionsReportService;
    }
    createRoom = async (req: Request | any, res: Response) => {
        const { name, price, details, levelId, categoryId } = req.body;
        const { hotelId } = req.params;
        console.log('-------------body', req.body);
        const newRoom = await this.createNewRoomRequest.createNewRoom(
            new RoomCommand(parseInt(hotelId)),

            // 0 : means without room
            new RoomData(0, name, parseInt(price), details, parseInt(levelId), parseInt(categoryId)),
        );

        res.json(newRoom);
    };
    updateRoom = async (req: Request | any, res: Response) => {
        const { name, price, details, levelId, categoryId } = req.body;
        const { hotelId, roomId } = req.params;

        const roomUpdated = await this.updateTheRoomRequest.updateTheRoom(
            new RoomCommand(parseInt(hotelId)),
            new RoomData(
                parseInt(roomId),
                name,
                parseInt(price),
                details,
                parseInt(levelId),
                parseInt(categoryId),
            ),
        );

        res.json(roomUpdated);
    };
    getRoomsByLevel = async (req: Request | any, res: Response) => {
        const { hotelId, levelId } = req.params;
        const { conditionId = SETTINGS.base.roomConditionIds.freeConditionId } = req.query;

        const rooms = await this.getRoomsRequest.getRoomsByLevel(
            parseInt(levelId),
            parseInt(conditionId),
            new RoomCommand(parseInt(hotelId)),
        );
        res.json(rooms);
    };
    getAllRooms = async (req: Request | any, res: Response) => {
        const { hotelId } = req.params;
        const {
            limit = SETTINGS.base.queries.limit,
            offset = SETTINGS.base.queries.offset,
            orderby = SETTINGS.base.queries.orderBy,
            searchText = '',
        } = req.query as unknown as IQueries;

        const queries: IQueries = {
            limit: Number(limit),
            offset: Number(offset),
            orderby,
            searchText,
        };

        const rooms = await this.getRoomsRequest.getAllRooms(parseInt(hotelId), queries);
        res.json(rooms);
    };
    getRoomConditionsReport = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        const report = await this.getRoomConditionReportUseCase.getTheRoomConditionReport(parseInt(hotelId));
        res.json(report);
    };
    removeRoom = async (req: Request | any, res: Response) => {
        const { hotelId, levelId, roomId } = req.params;

        const roomRemoved = await this.removeTheRoomRequest.removeTheRoom(
            parseInt(levelId),
            parseInt(roomId),
            new RoomCommand(parseInt(hotelId)),
            new RoomWithLevelCommand(parseInt(levelId)),
        );
        res.json(roomRemoved);
    };
    updateRoomCondition = async (req: Request | any, res: Response) => {
        const { roomId, roomConditionId } = req.params;

        const roomRemoved = await this.updateRoomCondtionRequest.updateTheCondtionOfRoom(
            parseInt(roomId),
            parseInt(roomConditionId),
        );
        res.json(roomRemoved);
    };
}
