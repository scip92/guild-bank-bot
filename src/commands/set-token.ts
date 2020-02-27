import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { Guild } from "../models/guild";
import { GuildBankApi } from "../api/guild-bank.api";

module.exports = {
    name: 'setToken',
    description: 'Setup a private classic guild bank account: `!gb:setToken ${apiToken}`',
    async execute(message: Message, args: string[]) {
        const guildRepository = GuildRepository.getInstance();
        const token = args[0];
        const guildId = await getGuildIdByToken(token);
        if (!guildId) {
            message.reply("Cannot get Guild ID, please provide a valid token!")
            return;
        }
        const newGuild: Guild = { id: guildId, discordId: message.guild.id, apiToken: token, isReadonly: false }
        guildRepository.create(newGuild);
        await message.delete();
        await message.channel.send("Guild Bank configured: type `!gb:help` to see list of commands.\nHappy raiding :)");
    },
};


const getGuildIdByToken = async (apiToken: string) => {
    const guildBankApi = new GuildBankApi(apiToken);
    const guildId = await guildBankApi.getGuildId();
    return guildId;
}
