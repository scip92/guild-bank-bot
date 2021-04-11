import { Message } from "discord.js";
import { ApiRequest } from "../api/guild-bank.api";
import { BaseCommand } from "./base.command";

const example = "Command: `!gb:request {ITEM_ID} {CHARACTER_NAME} {QUANTITY?(default 1)}`\nExample: `!gb:request 9252 Shadowblade 1`";

export class RequestCommand extends BaseCommand {

    public name = "request";

    public description = `Request specific item for character:\n${example}`

    public async action(message: Message, args) {
        const account = await this.getAccount();
        if (!account.apiToken) {
            await message.channel.send("You need to configure an API Token to make item requests. Run `!gb:setToken YOUR_API_TOKEN` to configure your guild.")
            return;
        }
        const itemId = args[0]
        const characterName = args[1];
        const quantity = args[2] ?? 1;
        if (!itemId || !characterName) {
            await this.sendError(message);
            return;
        }
        try {
            await new ApiRequest().forAccount(account).requestItem(itemId, characterName, quantity)
            await message.channel.send("Your item request has been submitted :)")
        } catch (e) {
            await this.sendError(message);
        }
    }

    private async sendError(message: Message) {
        await message.channel.send(`You need to specify a valid {ITEM_ID} and {CHARACTER_NAME}.\n${example}`)
    }
}
