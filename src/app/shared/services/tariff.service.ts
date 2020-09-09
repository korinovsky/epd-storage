import {Injectable} from '@angular/core';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Tariff} from '~models/tariff.model';
import moment from 'moment';

const transformTariff = tariff => tariff.date = moment(tariff.date.toDate());

@Injectable({
    providedIn: 'root'
})
export class TariffService extends AbstractRecordService<Tariff> {
    constructor(firestore: AngularFirestore) {
        super('tariffs', firestore);
    }

    get$(id: string): Observable<Tariff> {
        return super.get$(id).pipe(
            tap(transformTariff)
        );
    }

    list$(): Observable<Tariff[]> {
        return super.list$().pipe(
            tap(tariffs => tariffs.forEach(transformTariff)),
            map(tariffs => tariffs.sort((a, b) => a.date < b.date ? -1 : 0))
        );
    }
}
