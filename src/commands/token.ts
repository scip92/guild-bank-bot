import {Message} from "discord.js";
import {GuildRepository} from "../repositories/guild.repository";

module.exports = {
    name: 'token',
    description: 'Save token for api',
    async execute(message: Message, args) {
        const guildRepository = GuildRepository.getInstance();
        guildRepository.create(message.guild.id, args);
        await message.delete();
        await message.channel.send("Guild Bank configured: type '!gb:report' for guild report");
    },
};