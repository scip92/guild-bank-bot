import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { Guild } from "../models/guild";
import { GuildBankApi } from "../api/guild-bank.api";

module.exports = {
    name: 'setup',
    description: 'Setup classic guild bank',
    async execute(message: Message, args: string[]) {
        const guildRepository = GuildRepository.getInstance();
        const token = getArgValueOrNull(args, "--token");
        console.log(token);
        const guildId = await getGuildId(args, token);
        if (!guildId) {
            message.reply("Cannot get Guild ID, either provide a valid token or the guildId")
            return;
        }
        const newGuild: Guild = { id: guildId, discordId: message.guild.id, apiToken: token, isReadonly: token ? false : true }
        console.log(newGuild);
        guildRepository.create(newGuild);
        await message.delete();
        await message.channel.send("Guild Bank configured: type '!gb:help' to see list of commands.\nHappy raiding :)");
    },
};

const getGuildId = async (args: string[], token: string): Promise<string> => {
    if (token) {
        return await getGuildIdByToken(token);
    }
    return getArgValueOrNull(args, "--guildId")
}

const getGuildIdByToken = async (apiToken: string) => {
    const guildBankApi = new GuildBankApi(apiToken);
    const guildId = await guildBankApi.getGuildId();
    return guildId;
}

const getArgValueOrNull = (args: string[], indentifier: string) => {
    const argIndex = args.findIndex(a => a === indentifier);
    if (argIndex === -1) {
        return null
    }
    return args[argIndex + 1];
}

