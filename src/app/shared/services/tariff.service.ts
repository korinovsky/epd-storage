import {Injectable} from '@angular/core';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Tariff} from '~models/tariff.model';
import moment from 'moment';
import {AppService} from '~services/app.service';
import {AddressService} from '~services/address.service';

const transformTariff = tariff => tariff.date = moment(tariff.date.toDate());

@Injectable({
    providedIn: 'root'
})
export class TariffService extends AbstractRecordService<Tariff> {
    private listSubject$ = new BehaviorSubject<Tariff[]>(null);

    constructor(
        private appService: AppService,
        private addressService: AddressService,
        firestore: AngularFirestore
    ) {
        super(firestore);
        this.appService.address$.subscribe(
            address => {
                this.path = address ? addressService.getDocumentRef$(address.id).path + '/tariffs' : null;
                const list$ = super.list$();
                if (list$) {
                    list$.pipe(
                        tap(tariffs => tariffs.forEach(transformTariff)),
                        map(tariffs => tariffs.sort((a, b) => a.date < b.date ? -1 : 0))
                    ).subscribe(
                        list => this.listSubject$.next(list)
                    );
                } else if (this.listSubject$.value) {
                    this.listSubject$.next(null);
                }
            }
        );
    }

    get$(id: string): Observable<Tariff> {
        return super.get$(id).pipe(
            tap(transformTariff)
        );
    }

    list$(): Observable<Tariff[]> {
        return this.listSubject$;
    }
}
