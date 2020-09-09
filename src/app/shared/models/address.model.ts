import {Record} from './record.model';
import {Epd} from '~models/epd.model';
import {Tariff} from '~models/tariff.model';

export interface Address extends Record {
    name: string;
    epds: Epd[];
    tariffs: Tariff[];
}
