import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { Guild } from "../models/guild";
import { prefix } from "../util/constants";

module.exports = {
    name: 'setGuildId',
    description: `Setup a public guild bank: \`${prefix}setGuildId \${guildId}\``,
    async execute(message: Message, args: string[]) {
        const guildRepository = GuildRepository.getInstance();
        const guildId = args[0];
        if (!guildId) {
            message.reply("No Guild Id provided, please provide a valid Guild Id: `!gb:setGuildId ${guildId}`")
            return;
        }
        const newGuild: Guild = { id: guildId, discordId: message.guild.id, apiToken: null, isReadonly: true }
        guildRepository.create(newGuild);
        await message.delete();
        await message.channel.send("Guild Bank configured: type '!gb:help' to see list of commands.\nHappy raiding :)");
    },
};
