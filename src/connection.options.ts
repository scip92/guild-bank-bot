import {ConnectionOptions, DatabaseType} from "typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions";
import {Account} from "./models/account";
import { Role } from "./models/role";

export const buildConnectionOptions = (): ConnectionOptions => {
    const connectionType = process.env.DATABASE_TYPE as DatabaseType;
    if (connectionType === "postgres") {
        return {
            entities: [Account, Role],
            synchronize: true,
            type: "postgres",
            url: process.env.DATABASE_URL,
            ssl: true,
        } as PostgresConnectionOptions;
    }
    if (connectionType === "sqlite") {
        return {
            database: "./data/cgb.db",
            entities: [Account, Role],
            synchronize: true,
            type: "sqlite",
        } as SqliteConnectionOptions
    }
    throw new Error(`ConnectionType "${connectionType}" not supported!`);
};