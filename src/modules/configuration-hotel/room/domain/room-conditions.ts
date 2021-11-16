import { SETTINGS } from '../../../../shared/settings/settings';

export interface IRoomConditions {
    roomId: number;
    conditionId: number;
}

export class RoomConditions {
    private roomConditionIds = SETTINGS.base.roomConditionIds;

    constructor(private readonly roomConditions: IRoomConditions[]) {}

    generateReport() {
        const report = {
            free: 0,
            busy: 0,
            cleaning: 0,
        };

        this.roomConditions.forEach((room: IRoomConditions) => {
            if (room.conditionId == this.roomConditionIds.freeConditionId) report.free += 1;
            if (room.conditionId == this.roomConditionIds.busyConditionId) report.busy += 1;
            if (room.conditionId == this.roomConditionIds.cleaningConditionId) report.cleaning += 1;
        });

        return report;
    }
}
