import {Guild} from "../models/guild";
import * as fs from "fs";

export class GuildRepository {
    private static _instance: GuildRepository;
    private readonly guilds: { [discordId: string]: Guild } = {};
    private path = "./data/guilds.json";

    public static getInstance() {
        if (!this._instance) {
            this._instance = new GuildRepository();
        }
        return this._instance;
    }

    constructor() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '{}');
        }
        const savedGuilds = fs.readFileSync(this.path);
        this.guilds = JSON.parse(savedGuilds.toString());
    }

    public getById(discordId: string): Guild {
        try {
            return this.guilds[discordId];
        } catch (e) {
            return null;
        }
    }

    public create(guild: Guild) {
        this.guilds[guild.discordId] = guild;
        fs.writeFileSync(this.path, JSON.stringify(this.guilds));
        console.log(`New guild created: ${JSON.stringify(guild)}`);
    }
}