import { Ibase } from "./settings.interfaces";

export const base: Ibase = {
    databaseIds: {
        roomConditionId: parseInt(process.env.ROOM_CONDITION_ID || '') || 1
    }
}