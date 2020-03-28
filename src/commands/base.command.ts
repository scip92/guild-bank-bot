import { Message } from "discord.js";
import { Account } from "../models/account";
export abstract class BaseCommand {
    public abstract readonly name: string;
    public abstract readonly description: string;
    public abstract action(message: Message, args: string[]): Promise<void>;

    protected getAccount: () => Promise<Account>;

    public async execute(message: Message, args: string[]): Promise<void> {
        this.getAccount = async () => {
            const account = await Account.findByDiscordId(message.guild.id);
            return account;
        }
        this.action(message, args);
    }

}
