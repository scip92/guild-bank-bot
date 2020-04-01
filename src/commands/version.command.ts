
import { Message } from "discord.js";
import { BaseCommand } from "./base.command";

export class VersionCommand extends BaseCommand {

    public name = "version";

    public description = "Get bot version";

    public async action(message: Message, args) {
        const version = process.env.npm_package_version;
        message.reply(`Bot is running on version: ${version}`);
    }
};