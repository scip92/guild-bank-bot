import {GuildRepository} from "../repositories/guild.repository";
import {Message} from "discord.js";
import {GuildBankApi} from "../api/guild-bank.api";

const guildRepository = GuildRepository.getInstance();

module.exports = {
    name: 'report',
    description: 'Get guild bank report',
    async execute(message: Message, args: string[]) {
        const guild = guildRepository.getById(message.guild.id);
        const guildBankClient = new GuildBankApi(guild.apiToken);
        const guildId = await guildBankClient.getGuildId();
        const characters = await guildBankClient.getCharacters(guildId);
        characters.forEach(c => {
            let response = "Guild Bank Report:\n";
            response += `Character: ${c.name}`;
            c.bags.forEach(b => {
                b.bagSlots.forEach(bs => {
                    response += `${bs.quantity}x ${bs.item.name} \n`;
                });
            });
            for (let i = 0; i < response.length; i += 2000) {
                const toSend = response.substring(i, Math.min(response.length, i + 2000));
                message.channel.send(toSend);
            }
        });
        await message.delete();
    },
};
