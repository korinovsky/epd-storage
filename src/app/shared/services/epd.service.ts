import {Injectable} from '@angular/core';
import {Epd} from "~models/epd.model";
import {AbstractRecordService} from "~classes/record.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EpdService extends AbstractRecordService<Epd> {
    constructor(afs: AngularFirestore) {
        super('epds', afs);
    }

    list(): Observable<Epd[]> {
        return super.list().pipe(
            tap(epds => epds.forEach(epd => epd.date = (epd.date as any).toDate())),
            map(epds => epds.sort((a, b) => a.date < b.date ? -1 : 0))
        );
    }

    add() {
        return super.add({
            date: new Date()
        } as Epd);
    }
}
