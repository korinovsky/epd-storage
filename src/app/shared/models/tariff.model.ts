import {Record} from './record.model';
import {Moment} from 'moment';

export interface Tariff extends Record {
    date: Moment;
    waterSupply: number;
    waterDisposal: number;
}
