import { Service } from 'typedi';
import { RoomPersistenceAdapter } from '../../adapters/out/persistence/room-persistence.adapter';
import { RoomConditions } from '../../domain/room-conditions';
import { IGetRoomConditionReportUseCase } from '../ports/in/get-room-condition-report-use.case';
import { IGetRoomsWithConditionPort } from '../ports/out/self-domain/get-room-with-condition.port';

@Service()
export class GetRoomConditionsReportService implements IGetRoomConditionReportUseCase {
    private getRoomsWithConditionPort: IGetRoomsWithConditionPort;

    constructor(roomPersistenceAdapter: RoomPersistenceAdapter) {
        this.getRoomsWithConditionPort = roomPersistenceAdapter;
    }
    async getTheRoomConditionReport(hotelId: number): Promise<{}> {
        const rooms: RoomConditions = await this.getRoomsWithConditionPort.getRoomsWithCondition(hotelId);
        const roomReport = rooms.generateReport();
        return roomReport;
    }
}
