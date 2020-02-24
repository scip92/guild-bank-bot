import {Item} from "./item";
import {BagSlot} from "./bag-slot";

export interface Bag {
    id: number;
    characterId: number;
    isBank: boolean;
    bagItem?: Item;
    bagSlots: BagSlot[];
}