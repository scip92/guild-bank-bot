import {Character} from "../models/character";
import {User} from "../models/user";
import {createHttpClient} from "./http-client";
import {AxiosInstance} from "axios";
import {ItemWithQuantity} from "../models/item";

export class ApiRequest {
    public forUser(user: User) {
        return new UserRequest(user);
    }

    public withToken(token: string) {
        return new TokenRequest(token);
    }
}

export class TokenRequest {
    constructor(private token: string) {
    }

    public getGuildId(): Promise<string> {
        return createHttpClient(this.token).get("/guild/GetGuilds").then((result) => {
            return result.data[0].id;
        })
    }
}

export class UserRequest {

    private httpClient: AxiosInstance;

    constructor(private user: User) {
        this.httpClient = createHttpClient(user.apiToken);
    }

    public async getItems(): Promise<ItemWithQuantity[]> {
        const characters = await this.getCharacters();
        const itemsDictionary: { [id: string]: ItemWithQuantity } = {};

        characters.forEach(c => {
            c.bags.forEach(b => {
                b.bagSlots.forEach(bs => {
                    if (!itemsDictionary[bs.item.id]) {
                        itemsDictionary[bs.item.id] = {...bs.item, quantity: bs.quantity};
                    }
                    itemsDictionary[bs.item.id].quantity += bs.quantity;
                });
            });
        });

        return Object.keys(itemsDictionary)
            .map(r => itemsDictionary[r])
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    public getCharacters(): Promise<Character[]> {
        if (this.user.isPublic) {
            return this.getPublicCharacters();
        }
        return this.getPrivateCharacters();
    }

    private getPrivateCharacters(): Promise<Character[]> {
        return this.httpClient.get(`/guild/GetCharacters/${this.user.classicGuildBankId}`).then((content) => {
            return content.data;
        })
    }

    private getPublicCharacters(): Promise<Character[]> {
        return this.httpClient.get(`/guild/GetFromReadonlyToken/${this.user.classicGuildBankId}`).then((content) => {
            return content.data.characters;
        })
    }
}
