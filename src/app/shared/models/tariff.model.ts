import {Record} from './record.model';
import {Moment} from 'moment';

export interface Tariff extends Record {
    date: Moment;
    maintenance: number;
    waterSupply: number;
    waterDisposal: number;
    heatSupply: number;
    powerSupply: number[];
}
