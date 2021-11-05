interface IDatabase {
    databaseName: string;
    usernameDB: string;
    password: string;
    host: string;
    dialect: string;
}

export interface IBase {
    roles: {
        adminRole: number;
    };
    databaseIds: {
        busyConditionId: number;
        freeConditionId: number;
        cleaningConditionId: number;
    };
    queries: {
        limit: number;
        offset: number;
        orderBy: string;
    };
}

export interface IEnvironment {
    base: IBase;
    database: IDatabase;
}
