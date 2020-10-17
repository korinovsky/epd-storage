import {Record} from './record.model';
import {Epd} from '~models/epd.model';
import {Tariff} from '~models/tariff.model';

export interface Address extends Record {
    name: string;
    area: number;
    totalArea: number;
    epds: Epd[];
    tariffs: Tariff[];
}
