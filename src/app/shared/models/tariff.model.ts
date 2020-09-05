import {Record} from "./record.model";

export interface Tariff extends Record {
    date: Date;
    waterSupply: number;
    waterDisposal: number;
}
