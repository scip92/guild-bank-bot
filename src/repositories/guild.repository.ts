import {Guild} from "../models/guild";
import * as fs from "fs";

export class GuildRepository {
    private static _instance: GuildRepository;
    private readonly guilds: { [id: string]: Guild } = {};
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

    public getById(id: string): Guild {
        try {
            return this.guilds[id];
        } catch (e) {
            return null;
        }
    }

    public create(id: string, token: string) {
        console.log(`Create new guild ${id}`);
        this.guilds[id] = {id: id, token: token};
        fs.writeFileSync(this.path, JSON.stringify(this.guilds));
    }
}