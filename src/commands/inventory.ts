import {GuildRepository} from "../repositories/guild.repository";
import * as Discord from "discord.js";
import {Message} from "discord.js";
import {ApiRequest} from "../api/guild-bank.api";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'inventory',
    description: 'Get complete guild bank inventory report',
    async execute(message: Message, args: string[]) {
        const guild = guildRepository.getById(message.guild.id);
        const characters = await new ApiRequest().forGuild(guild).getCharacters();
        const items: { [id: string]: { name: string, quantity: number } } = {};

        characters.forEach(c => {
            c.bags.forEach(b => {
                b.bagSlots.forEach(bs => {
                    if (!items[bs.item.id]) {
                        items[bs.item.id] = {name: bs.item.name, quantity: 0};
                    }
                    items[bs.item.id].quantity += bs.quantity;
                });
            });
        });

        const reports = Object.keys(items).map(r => items[r]);

        const chunk = 25;
        let parts = 1;
        for (let i = 0; i < reports.length; i += chunk) {
            const responseMsg = new Discord.RichEmbed().setTitle(`Guild Bank Inventory - Part #${parts}`);
            const tmpResponse = reports.slice(i, i + chunk);
            tmpResponse.forEach((res) => responseMsg.addField(res.name, `${res.quantity} x`, true));
            await message.channel.send(responseMsg);
            parts++;
        }
        await message.delete();
    },
};
