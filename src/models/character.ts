import {Bag} from "./bag";

export interface Character {
    id: string;
    name: string;
    bags: Bag[];
    gold: number;
}

export const goldToString = (gold: number) => {
    const g = Math.floor(gold / 10000);
    const s = Math.floor((gold / 100) % 100)
    const c = gold % 100;
    return `${g}g ${s}s ${c}c`;
}