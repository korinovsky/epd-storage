import {Record} from './record.model';
import {Moment} from 'moment';
import {Tariff} from '~models/tariff.model';
import {Address} from '~models/address.model';

export interface Epd extends Record {
    date: Moment;
    waterSupply: number[];
    heatSupply: number[];
    powerSupply: number[];
    powerSupplyCommon: number[];
    otherPayments: number[];
    receiptTotalPayment: number;
    prev: Epd;
    tariff: Tariff;
    address: Address;
}
