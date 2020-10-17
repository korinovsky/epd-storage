import {Injectable} from '@angular/core';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '~models/user.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractRecordService<User> {
    constructor(firestore: AngularFirestore) {
        super(firestore, 'users');
    }

    add$(item: User): Observable<User> {
        return super.update$(item);
    }
}
