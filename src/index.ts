// @ts-nocheck
import {config} from "dotenv";
import * as Discord from "discord.js";
import * as fs from "fs";
import { getAllCommands } from "./util/command-helper";
import { prefix } from "./util/constants";

config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
getAllCommands().forEach(c => client.commands.set(c.name, c));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    const args: string[] = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) {
        client.commands.get("help").execute(msg, args);
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