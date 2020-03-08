import { Message } from "discord.js";
import { User } from "../models/user";
import { ApiRequest } from "../api/guild-bank.api";

module.exports = {
    name: 'setToken',
    description: 'Setup a private classic guild bank account: `!gb:setToken API_TOKEN`',
    async execute(message: Message, args: string[]) {
        const token = args[0];
        const guildId = await getGuildIdByToken(token);
        if (!guildId) {
            await message.reply("Cannot get User ID, please provide a valid token!");
            return;
        }
        const newUser = new User();
        newUser.discordGuildId = message.guild.id;
        newUser.classicGuildBankId = guildId;
        newUser.apiToken = token;
        newUser.isPublic = false;
        await newUser.save();
        await message.delete();
        await message.channel.send("Guild Bank configured: type `!gb:help` to see list of commands.\nHappy raiding :)");
    },
};


const getGuildIdByToken = async (apiToken: string) => {
    return new ApiRequest().withToken(apiToken).getGuildId();
}
