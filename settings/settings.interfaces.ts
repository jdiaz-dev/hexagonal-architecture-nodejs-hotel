interface IDatabase {
  databaseName: string;
  user: string;
  password: string;
  host: string;
  dialect: string;
}

export interface IBase {
  databaseIds: {
    busyConditionId: number;
    conditionFreeId: number;
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
