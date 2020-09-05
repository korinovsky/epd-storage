import {Record} from "../classes/record.service";

export interface Epd extends Record {
    date: Date;
    waterSupply: number[];
    waterDisposal: number;
}

export interface Tariff extends Record {
    date: Date;
    waterSupply: number;
    waterDisposal: number;
}
