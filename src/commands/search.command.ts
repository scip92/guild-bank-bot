import * as Discord from "discord.js";
import { Message } from "discord.js";
import { ApiRequest } from "../api/guild-bank.api";
import { prefix } from "../util/constants";
import { BaseCommand } from "./base.command";

export class SearchCommand extends BaseCommand {

    public readonly name = "search";


    private readonly usage = `Usage:   \`${prefix}${this.name} {ITEM_ID/ITEM_NAME}\`\nExample:\`${prefix}${this.name} greater fire\``

    public description = `Find specific item in inventory\n${this.usage}`;

    public async action(message: Message, args: string[]) {
        if (args.length === 0) {
            await message.channel.send(`No search value specified.\n${this.usage}`)
            return;
        }
        const searchString = args.join(' ');
        const account = await this.getAccount();
        const items = await new ApiRequest().forAccount(account).getItems();
        const result = items.filter(i => {
            return i.name.toLowerCase().includes(searchString.toLowerCase()) || i.id.toString() == searchString;
        });
        if (result.length === 0) {
            await message.channel.send(`No search result for '${searchString}'`);
            return;
        }
        const responseMsg = new Discord.RichEmbed().setTitle(`Guild Bank Inventory - Search Result for '${searchString}'`);
        result.forEach(r => {
            responseMsg.addField(`${r.name} [Id: ${r.id}]`, `${r.quantity}x`);
        });
        await message.channel.send(responseMsg);
    }
}


