import {Message} from "discord.js";
import {GuildRepository} from "../repositories/guild.repository";
import { GuildBankApi } from "../api/guild-bank.api";
import { Character, goldToString } from "../models/character";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'gold',
    description: 'Get gold amount', 
    async execute(message: Message, args) {
        const guild = guildRepository.getById(message.guild.id);
        const guildBankClient = new GuildBankApi(guild.token);
        const guildId = await guildBankClient.getGuildId();
        const characters = await guildBankClient.getCharacters(guildId); 
        let response = "```\nGold report:\n";
        let total = 0;
        characters.forEach(c => {
            response += `${c.name}: ${goldToString(c.gold)}\n`;
            total += c.gold;
        });
        response += `-------------------\nTotal: ${goldToString(total)}`;
        response += "\n```"
        await message.channel.send(response);
    },
};