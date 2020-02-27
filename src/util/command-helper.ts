import * as fs from "fs";
import { Command } from "../models/command";

export const getAllCommands = (): Command[] => {
    const commandFiles = fs.readdirSync(`${process.cwd()}/src/commands`).filter(file => file.endsWith('.ts'))
    return commandFiles.map(file => require(`${process.cwd()}/src/commands/${file}`))
}