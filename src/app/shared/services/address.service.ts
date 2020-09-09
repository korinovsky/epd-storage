import {Injectable} from '@angular/core';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Address} from '~models/address.model';

@Injectable({
    providedIn: 'root'
})
export class AddressService extends AbstractRecordService<Address> {
    constructor(firestore: AngularFirestore) {
        super('addresses', firestore);
    }
}
