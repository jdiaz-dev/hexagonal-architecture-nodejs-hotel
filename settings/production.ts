import { base } from "./base";
import { IEnvironment } from "./settings.interfaces";

export const production: IEnvironment = {
  base,
  database: {
    databaseName: process.env.NAME || "",
    user: process.env.USERNAME || "",
    password: process.env.PASSWORD || "",
    host: process.env.HOST || "",
    dialect: process.env.DIALECT || "",
  },
};
