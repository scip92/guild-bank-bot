import {Message} from "discord.js";
import {User} from "../models/user";
import {prefix} from "../util/constants";

module.exports = {
    name: 'setGuild',
    description: `Setup a public guild bank: \`${prefix}setGuild YOUR_GUILD_ID\``,
    async execute(message: Message, args: string[]) {
        const guildId = args[0];
        if (!guildId) {
            await message.reply("No Guild Id provided, please provide a valid Guild Id: `!gb:setGuild YOUR_GUILD_ID`");
            return;
        }
        const user = new User();
        user.classicGuildBankId = guildId;
        user.discordGuildId = message.guild.id;
        user.isPublic = true;
        await user.save();

        await message.delete();
        await message.channel.send("Guild Bank configured: type '!gb:help' to see list of commands.\nHappy raiding :)");
    },
};
