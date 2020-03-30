import { Message, RichEmbed } from "discord.js";
import { getAllCommands } from "../util/command-helper";
import { prefix } from "../util/constants";
import { BaseCommand } from "./base.command";

export class HelpCommand extends BaseCommand {

    public name = "help";

    public description = 'Help command';

    public async action(message: Message, args: string[]) {
        const commands = getAllCommands().filter(f => f.name != "help");
        const commandCheat = new RichEmbed().setTitle('Guild Bank Commands');
        commands.forEach(command => {
            commandCheat.addField(`${prefix}${command.name}`, command.description, false);
        });
        await message.delete();
        await message.channel.send(commandCheat);
    }
};