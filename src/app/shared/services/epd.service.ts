import {Injectable} from '@angular/core';
import {Epd} from '~models/epd.model';
import {AbstractRecordService} from '~classes/record.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import moment from 'moment';
import {AppService} from '~services/app.service';
import {AddressService} from '~services/address.service';
import {TariffService} from '~services/tariff.service';
import {Tariff} from '~models/tariff.model';

const transformEpd = epd => epd.date = moment(epd.date.toDate());

@Injectable({
    providedIn: 'root'
})
export class EpdService extends AbstractRecordService<Epd> {
    private listSubject$ = new BehaviorSubject<Epd[]>(null);
    private tariffs: Tariff[];

    constructor(
        private appService: AppService,
        addressService: AddressService,
        tariffService: TariffService,
        firestore: AngularFirestore
    ) {
        super(firestore);
        tariffService.list$().subscribe(tariffs => {
            this.tariffs = tariffs;
            this.listChanged();
        });
        this.appService.address$.subscribe(
            address => {
                this.path = address ? addressService.getDocumentRef$(address.id).path + '/epds' : null;
                this.listChanged();
            }
        );
    }

    private listChanged(): void {
        const list$ = super.list$();
        if (list$ && this.tariffs) {
            list$.pipe(
                tap(epds => epds.forEach(transformEpd)),
                map(epds => epds.sort((a, b) => a.date < b.date ? -1 : 0)),
                tap(epds => {
                    let prev: Epd;
                    let tariffIndex = -1;
                    epds.forEach(epd => {
                        while (this.tariffs[tariffIndex + 1] && epd.date.isSameOrAfter(this.tariffs[tariffIndex + 1].date)) {
                            tariffIndex++;
                        }
                        epd.address = this.appService.address;
                        epd.prev = prev;
                        epd.tariff = this.tariffs[tariffIndex];
                        prev = epd;
                    });
                })
            ).subscribe(
                list => this.listSubject$.next(list)
            );
        } else if (this.listSubject$.value) {
            this.listSubject$.next(null);
        }
    }

    get$(id: string): Observable<Epd> {
        return super.get$(id).pipe(
            tap(transformEpd)
        );
    }

    list$(): Observable<Epd[]> {
        return this.listSubject$;
    }


    update$({prev, tariff, address, ...item}: Epd): Observable<Epd> {
        return super.update$(item as Epd);
    }
}
