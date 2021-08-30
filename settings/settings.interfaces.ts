interface Idatabase {
    databaseName: string
    user: string
    password: string,
    host: string,
    dialect: string
}

export interface Ibase {
    databaseIds: {
        roomConditionId: number
    }
}

export interface Ienvironment {
    base: Ibase
    database: Idatabase
}

