import { Message } from "discord.js";
import { prefix } from "../util/constants";
import { BaseCommand } from "./base.command";
import { Role } from "../models/role";

export class OffizerCommand extends BaseCommand {

    public name = "offizer";

    public description = `Add a offizer to use the guild bank bot: \`${prefix}offizer YOUR_OFFIZER_ROLE\``;

    async action(message: Message, args: string[]) {
        const roleTag = args[0];
        if (!roleTag) {
            await message.reply("No role provided, please provide a valid role: `!gb:offizer YOUR_OFFIZER_ROLE`");
            return;
        }

        const roleId = roleTag.match(/\d/g).join("");
        console.log(roleId);
        const discordRole = message.guild.roles.find("id", roleId)
        console.log(discordRole);

        if (!discordRole) {
            await message.reply(`Role not found on your discord server, please provide a valid role`);
            return;
        }

        const account = await this.getAccount();

        const offizerRole = new Role();
        offizerRole.account = account;
        offizerRole.discordRoleId = discordRole.id;
        if (!account.offizerRoles) {
            account.offizerRoles = [offizerRole];
        }
        offizerRole.save();

        await account.save();
        await message.delete();
        await message.channel.send("Offizer added!");
    }
};
