import {Record} from "./record.model";

export interface Epd extends Record {
    date: Date;
    waterSupply: number[];
    waterDisposal: number;
}
