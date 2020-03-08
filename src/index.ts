import {config} from "dotenv";
config();

import {createConnection} from "typeorm";
import {buildConnectionOptions} from "./connection.options";
import {createDiscordClient} from "./discord.client";

const main = async () => {
    await createConnection(buildConnectionOptions());
    await createDiscordClient();
};
main().catch(console.error);
