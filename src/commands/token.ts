import {Message} from "discord.js";
import {GuildRepository} from "../repositories/guild.repository";

module.exports = {
    name: 'token',
    description: 'Save token for api',
    async execute(message: Message, args) {
        await message.channel.send('Pong.');
        const guildRepository = GuildRepository.getInstance();
        guildRepository.create(message.guild.id, args);
    },
};