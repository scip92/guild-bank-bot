import {GuildRepository} from "../repositories/guild.repository";
import {Message} from "discord.js";
import {GuildBankApi} from "../api/guild-bank.api";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'report',
    description: 'Get guild bank report',
    async execute(message: Message, args) {
        const guild = guildRepository.getById(message.guild.id);
        console.log(guild);
        const guildBankClient = new GuildBankApi(guild.token);
        const guildId = await guildBankClient.getGuildId();
        const characters = await guildBankClient.getCharacters(guildId);
        characters.forEach(c => {
            let response = "```\nGuild Bank Report:\n";
            response += `Character: ${c.name}`;
            c.bags.forEach(b => {
                b.bagSlots.forEach(bs => {
                    response += `${bs.quantity}x ${bs.item.name} \n`;
                })
            });
            response += "```";
            message.channel.send(response);
            console.log(response);
        });
    },
};
