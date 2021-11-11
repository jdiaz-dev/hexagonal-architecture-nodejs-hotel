import { IBase } from './settings.interfaces';

export const base: IBase = {
    roles: {
        adminRoleId: parseInt(process.env.ADMIN_ROLE_ID || ''),
    },
    roomConditionIds: {
        busyConditionId: parseInt(process.env.CONDITION_BUSY_ID || ''),
        freeConditionId: parseInt(process.env.CONDITION_FREE_ID || ''),
        cleaningConditionId: parseInt(process.env.CONDITION_CLEANING_ID || ''),
    },
    queries: {
        limit: 20,
        offset: 0,
        orderBy: 'id',
    },
};
