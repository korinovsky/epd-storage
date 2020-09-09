import {Injectable} from '@angular/core';
import {Epd} from '~models/epd.model';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import moment from 'moment';

const transformEpd = epd => epd.date = moment(epd.date.toDate());

@Injectable({
    providedIn: 'root'
})
export class EpdService extends AbstractRecordService<Epd> {
    constructor(afs: AngularFirestore) {
        super('epds', afs);
    }

    get$(id: string): Observable<Epd> {
        return super.get$(id).pipe(
            tap(transformEpd)
        );
    }

    list$(): Observable<Epd[]> {
        return super.list$().pipe(
            tap(epds => epds.forEach(transformEpd)),
            map(epds => epds.sort((a, b) => a.date < b.date ? -1 : 0))
        );
    }

    add$(): Observable<Epd> {
        return super.add$({
            date: moment()
        } as Epd);
    }
}
