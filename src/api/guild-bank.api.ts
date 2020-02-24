import axios, {AxiosInstance} from "axios";
import {Character} from "../models/character";

export class GuildBankApi {
    private httpClient: AxiosInstance;
    private baseUrl = "https://classicguildbankapi.azurewebsites.net/api";

    constructor(token: string) {
        this.httpClient = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        this.httpClient.interceptors.request.use(request => {
            console.log({request});
            return request
        })
    }

    getGuildId(): Promise<string> {
        return this.httpClient.get("/guild/GetGuilds").then((result) => {
            return result.data[0].id;
        })
    }

    getCharacters(guildId): Promise<Character[]> {
        return this.httpClient.get(`/guild/GetCharacters/${guildId}`).then((content) => {
            return content.data;
        })
    }
}