// @ts-nocheck
import {config} from "dotenv";
import * as Discord from "discord.js";
import * as fs from "fs";

config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`${process.cwd()}/src/commands`).filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(`${process.cwd()}/src/commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", async msg => {
    const prefix = "!gb:";
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) {
        return;
    }
    try {
        client.commands.get(command).execute(msg, args);

    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});

client.login(process.env.DISCORD_TOKEN);