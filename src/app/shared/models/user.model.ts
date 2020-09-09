import {Record} from './record.model';
import {Address} from '~models/address.model';

export interface User extends Record {
    addresses: Address[];
}
