import { Message } from "discord.js";
import { GuildRepository } from "../repositories/guild.repository";
import { ApiRequest } from "../api/guild-bank.api";
import { Character, goldToString } from "../models/character";
import { Guild } from "../models/guild";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'gold',
    description: 'Get gold report',
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
    return new ApiRequest().forGuild(guild).getCharacters();
}