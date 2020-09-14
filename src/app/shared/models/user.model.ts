import {Record} from './record.model';
import {DocumentReference} from '@angular/fire/firestore';

export interface User extends Record {
    addresses: DocumentReference[];
}
