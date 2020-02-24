import {Bag} from "./bag";

export interface Character {
    id: string;
    name: string;
    bags: Bag[];
    gold: number;
}