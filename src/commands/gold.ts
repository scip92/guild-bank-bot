import { Message } from "discord.js";
import { ApiRequest } from "../api/guild-bank.api";
import { Character, goldToString } from "../models/character";
import { User } from "../models/user";


module.exports = {
    name: 'gold',
    description: 'Get gold report',
    async execute(message: Message, args) {
        const user = await User.findByDiscordId(message.guild.id);
        let response = "```\nGold report:\n";
        let total = 0;
        const characters = await getCharacters(user);
        characters.forEach(c => {
            response += `${c.name}: ${goldToString(c.gold)}\n`;
            total += c.gold;
        });
        response += `-------------------\nTotal: ${goldToString(total)}`;
        response += "\n```"
        await message.channel.send(response);
    },
};

const getCharacters = async (user: User): Promise<Character[]> => {
    return new ApiRequest().forUser(user).getCharacters();
}