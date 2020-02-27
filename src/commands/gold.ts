import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { GuildBankApi } from "../api/guild-bank.api";
import { Character, goldToString } from "../models/character";
import { Guild } from "../models/guild";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'gold',
    description: 'Get gold amount',
    async execute(message: Message, args) {
        const guild = guildRepository.getById(message.guild.id);
        let response = "```\nGold report:\n";
        let total = 0;
        const characters = await getCharacters(guild);
        characters.forEach(c => {
            response += `${c.name}: ${goldToString(c.gold)}\n`;
            total += c.gold;
        });
        response += `-------------------\nTotal: ${goldToString(total)}`;
        response += "\n```"
        await message.channel.send(response);
    },
};

const getCharacters = async (guild: Guild): Promise<Character[]> => {
    const guildBankClient = new GuildBankApi(guild.apiToken);
    if (guild.isReadonly) {
        return guildBankClient.getFromReadonlyGuild(guild.id);
    }
    return guildBankClient.getCharacters(guild.id);
}