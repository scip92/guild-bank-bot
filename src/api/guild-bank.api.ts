import axios, { AxiosInstance } from "axios";
import { Character } from "../models/character";

export class GuildBankApi {
    private httpClient: AxiosInstance;
    private baseUrl = "https://classicguildbankapi.azurewebsites.net/api";

    constructor(apiToken: string = null) {
        this.httpClient = this.createHttpClient(apiToken);
        this.httpClient.interceptors.request.use(request => {
            console.log({ request });
            return request
        })
    }

    public getGuildId(): Promise<string> {
        return this.httpClient.get("/guild/GetGuilds").then((result) => {
            return result.data[0].id;
        })
    }

    public getCharacters(guildId): Promise<Character[]> {
        return this.httpClient.get(`/guild/GetCharacters/${guildId}`).then((content) => {
            return content.data;
        })
    }

    public getFromReadonlyGuild(guildId): Promise<Character[]> {
        return this.httpClient.get(`/guild/GetFromReadonlyToken/${guildId}`).then((content) => {
            return content.data.characters;
        })
    }

    private createHttpClient(apiToken: string): AxiosInstance {
        let headers = {};
        if (apiToken) {
            headers = { "Authorization": `Bearer ${apiToken}` }
        }
        return axios.create({ baseURL: this.baseUrl, headers });
    }
}