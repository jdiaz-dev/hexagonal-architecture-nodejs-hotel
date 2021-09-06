import { IBase } from "./settings.interfaces";

export const base: IBase = {
  databaseIds: {
    busyConditionId: parseInt(process.env.CONDITION_BUSY_ID || ""),
    conditionFreeId: parseInt(process.env.CONDITION_FREE_ID || ""),
  },
  queries: {
    limit: 20,
    offset: 0,
    orderBy: "id",
  },
};
