import {Injectable} from '@angular/core';
import {AbstractRecordService} from "~classes/record.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Tariff} from "~models/tariff.model";

@Injectable({
    providedIn: 'root'
})
export class TariffService extends AbstractRecordService<Tariff> {
    constructor(afs: AngularFirestore) {
        super('tariffs', afs);
    }

    list(): Observable<Tariff[]> {
        return super.list().pipe(
            tap(tariffs => tariffs.forEach(tariff => tariff.date = (tariff.date as any).toDate())),
            map(tariffs => tariffs.sort((a, b) => a.date < b.date ? -1 : 0))
        );
    }

    add() {
        return super.add({
            date: new Date()
        } as Tariff);
    }
}
