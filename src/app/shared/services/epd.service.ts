import {Injectable} from '@angular/core';
import {Epd} from '~models/epd.model';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import moment from 'moment';
import {AppService} from '~services/app.service';
import {AddressService} from '~services/address.service';

const transformEpd = epd => epd.date = moment(epd.date.toDate());

@Injectable({
    providedIn: 'root'
})
export class EpdService extends AbstractRecordService<Epd> {
    private listSubject$ = new BehaviorSubject<Epd[]>(null);

    constructor(
        private appService: AppService,
        private addressService: AddressService,
        firestore: AngularFirestore
    ) {
        super(firestore);
        this.appService.address$.subscribe(
            address => {
                this.path = address ? addressService.getDocumentRef$(address.id).path + '/epds' : null;
                const list$ = super.list$();
                if (list$) {
                    list$.pipe(
                        tap(epds => epds.forEach(transformEpd)),
                        map(epds => epds.sort((a, b) => a.date < b.date ? -1 : 0))
                    ).subscribe(
                        list => this.listSubject$.next(list)
                    );
                } else if (this.listSubject$.value) {
                    this.listSubject$.next(null);
                }
            }
        );
    }

    get$(id: string): Observable<Epd> {
        return super.get$(id).pipe(
            tap(transformEpd)
        );
    }

    list$(): Observable<Epd[]> {
        return this.listSubject$;
    }

    add$(): Observable<Epd> {
        return super.add$({
            date: moment()
        } as Epd);
    }
}
