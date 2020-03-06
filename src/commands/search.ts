import {GuildRepository} from "../repositories/guild.repository";
import * as Discord from "discord.js";
import {Message} from "discord.js";
import {ApiRequest} from "../api/guild-bank.api";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'search',
    description: 'Find specific item in inventory',
    async execute(message: Message, args: string[]) {
        const searchString = args.join(' ');
        console.log({searchString});
        const guild = guildRepository.getById(message.guild.id);
        const items = await new ApiRequest().forGuild(guild).getItems();
        console.log(items);
        const result = items.filter(i => {
            return i.name.toLowerCase().includes(searchString) || i.id.toString() == searchString;
        });
        if (result.length === 0) {
            await message.channel.send(`No search result for '${searchString}'`);
            return;
        }
        const responseMsg = new Discord.RichEmbed().setTitle(`Guild Bank Inventory - Search Result for '${searchString}'`);
        result.forEach(r => {
            responseMsg.addField(r.name, r.quantity);
        });
        await message.channel.send(responseMsg);
    },
};
