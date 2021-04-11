import { BaseCommand } from "../commands/base.command";
import { GoldCommand } from "../commands/gold.command";
import { HelpCommand } from "../commands/help.command";
import { InventoryCommand } from "../commands/inventory.command";
import { OfficerCommand } from "../commands/officer.command";
import { SearchCommand } from "../commands/search.command";
import { SetGuildCommand } from "../commands/set-guild.command";
import { SetTokenCommand } from "../commands/set-token.command";
import { VersionCommand } from "../commands/version.command";
import { RequestCommand } from "../commands/request.command";

export const getAllCommands = (): BaseCommand[] => {
    return [
        new SearchCommand(),
        new GoldCommand(),
        new InventoryCommand(),
        new RequestCommand(),
        new OfficerCommand(),
        new SetGuildCommand(),
        new SetTokenCommand(),
        new HelpCommand(),
        new VersionCommand(),
    ];
}