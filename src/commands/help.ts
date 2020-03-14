import { Message, RichEmbed } from "discord.js";
import { getAllCommands } from "../util/command-helper";
import { prefix } from "../util/constants";

module.exports = {
    name: 'help',
    description: 'Help command',
    async execute(message: Message, args: string[]) {
        const commands = getAllCommands().filter(f => f.name != "help");
        const commandCheat = new RichEmbed().setTitle('Classic Bank Commands');
        commands.forEach(command => {
            commandCheat.addField(`${prefix}${command.name}`, command.description, false);
        });
        await message.delete();
        await message.channel.send(commandCheat);
    },
};