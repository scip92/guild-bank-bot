import { BaseCommand } from "../commands/base.command";
import { GoldCommand } from "../commands/gold.command";
import { HelpCommand } from "../commands/help.command";
import { InventoryCommand } from "../commands/inventory.command";
import { SearchCommand } from "../commands/search.command";
import { SetGuildCommand } from "../commands/set-guild.command";
import { SetTokenCommand } from "../commands/set-token.command";

export const getAllCommands = (): BaseCommand[] => {
    const allCommands = [
        new GoldCommand(),
        new HelpCommand(),
        new InventoryCommand(),
        new SearchCommand(),
        new SetGuildCommand(),
        new SetTokenCommand(),
    ]
    return allCommands;
}