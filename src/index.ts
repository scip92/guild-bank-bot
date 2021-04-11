import { config } from 'dotenv';

import { createConnection } from 'typeorm';
import { buildConnectionOptions } from './connection.options';
import { createDiscordClient } from './discord.client';

config();

const main = async () => {
  await createConnection(buildConnectionOptions());
  await createDiscordClient();
};
main().catch(console.error);
