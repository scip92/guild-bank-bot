import {Item} from "./item";

export interface BagSlot {
    slotId: number;
    bagId: number;
    quantity: number;
    item?: Item;
}