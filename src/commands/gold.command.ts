import { Message } from "discord.js";
import { ApiRequest } from "../api/guild-bank.api";
import { Character, goldToString } from "../models/character";
import { Account } from "../models/account";
import { BaseCommand } from "./base.command";

export class GoldCommand extends BaseCommand {

    public name = "gold";

    public description = "Get gold report\nUsage: `!gb:gold`";

    public async action(message: Message, args) {
        const account = await this.getAccount();
        let response = "```\nGold report:\n";
        let total = 0;
        const characters = await getCharacters(account);
        characters.forEach(c => {
            response += `${c.name}: ${goldToString(c.gold)}\n`;
            total += c.gold;
        });
        response += `-------------------\nTotal: ${goldToString(total)}`;
        response += "\n```"
        await message.channel.send(response);
    }
};

const getCharacters = async (account: Account): Promise<Character[]> => {
    return new ApiRequest().forAccount(account).getCharacters();
}