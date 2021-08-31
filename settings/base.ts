import { Ibase } from "./settings.interfaces";

export const base: Ibase = {
    databaseIds: {
        busyConditionId: parseInt(process.env.CONDITION_BUSY_ID || ''),
        conditionFreeId: parseInt(process.env.CONDITION_FREE_ID || ''),
    }
}