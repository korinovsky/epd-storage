import {Record} from './record.model';
import {Moment} from 'moment';

export interface Epd extends Record {
    date: Moment;
    waterSupply: number[];
    waterDisposal: number;
}
