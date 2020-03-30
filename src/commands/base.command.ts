import { Message, GuildMember } from "discord.js";
import { Account } from "../models/account";

export abstract class BaseCommand {

    public abstract readonly name: string;

    public abstract readonly description: string;

    public abstract action(message: Message, args: string[]): Promise<void>;

    public offizerOnly = false;

    protected getAccount: () => Promise<Account>;

    public async execute(message: Message, args: string[]): Promise<void> {
        this.getAccount = async () => {
            const account = await Account.findByDiscordId(message.guild.id);
            return account;
        }

        if ((await this.hasPermission(message.member)) === false) {
            message.reply("sry permission denied. You need to be an offizer to do this")
            return;
        }

        this.action(message, args);
    }

    private async hasPermission(member: GuildMember): Promise<boolean> {
        if (this.offizerOnly === false) {
            return true;
        }
        return await this.hasMemberOffizerRole(member);

    }

    private async hasMemberOffizerRole(member: GuildMember): Promise<boolean> {
        const account = await this.getAccount();
        if (!account) {
            return true;
        }
        if (!account.offizerRoles || account.offizerRoles.length === 0) {
            return true;
        }
        const filtered = account.offizerRoles.filter(or => member.roles.array().find(r => r.id === or.discordRoleId));
        return filtered.length > 0;
    }

}
