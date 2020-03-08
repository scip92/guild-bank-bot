import * as Discord from "discord.js";
import {Message} from "discord.js";
import {ApiRequest} from "../api/guild-bank.api";
import {User} from "../models/user";

module.exports = {
    name: 'search',
    description: 'Find specific item in inventory: `!gb:search QUERY/ITEM_ID`',
    async execute(message: Message, args: string[]) {
        const searchString = args.join(' ');
        const user = await User.findByDiscordId(message.guild.id);
        const items = await new ApiRequest().forUser(user).getItems();
        const result = items.filter(i => {
            return i.name.toLowerCase().includes(searchString) || i.id.toString() == searchString;
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
    },
};
