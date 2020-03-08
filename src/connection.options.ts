import {ConnectionOptions, DatabaseType} from "typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions";
import {User} from "./models/user";

export const buildConnectionOptions = (): ConnectionOptions => {
    const connectionType = process.env.DATABASE_TYPE as DatabaseType;
    if (connectionType === "postgres") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL
        } as PostgresConnectionOptions;
    }
    if (connectionType === "sqlite") {
        return {
            entities: [User],
            type: "sqlite",
            synchronize: true,
            database: "./data/cgb.sql"
        } as SqliteConnectionOptions
    }
    throw new Error(`ConnectionType "${connectionType}" not supported!`);
};