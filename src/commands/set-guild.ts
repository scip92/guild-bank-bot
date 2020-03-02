import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { Guild } from "../models/guild";
import { prefix } from "../util/constants";

module.exports = {
    name: 'setGuild',
    description: `Setup a public guild bank: \`${prefix}setGuild YOUR_GUILD_ID`,
    async execute(message: Message, args: string[]) {
        const guildRepository = GuildRepository.getInstance();
        const guildId = args[0];
        if (!guildId) {
            message.reply("No Guild Id provided, please provide a valid Guild Id: `!gb:setGuild ${guildId}`")
            return;
        }
        const newGuild: Guild = { id: guildId, discordId: message.guild.id, apiToken: null, isPublic: true }
        guildRepository.create(newGuild);
        await message.channel.send("Guild Bank configured: type '!gb:help' to see list of commands.\nHappy raiding :)");
    },
};
