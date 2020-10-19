import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {Observable} from 'rxjs';
import {Epd} from '~models/epd.model';
import {
    calcMaintenance, calcWaterSupply, calcHeatSupply, calcPowerSupply, calcPowerSupplyCommon, calcOtherPayments, calcTotal
} from '~app/pages/epds/epds.functions';
import {filter, map} from 'rxjs/operators';
import _identity from 'lodash/identity';

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class EpdsDetailsComponent {
    epd$: Observable<Epd>;

    constructor(
        route: ActivatedRoute,
        epdService: EpdService,
    ) {
        const {id: epdId} = route.snapshot.params;
        this.epd$ = epdService.list$().pipe(
            map(epds => epds?.find(({id}) => id === epdId)),
            filter(_identity)
        );
    }

    calcMaintenance(epd: Epd): number {
        return calcMaintenance(epd);
    }

    calcWaterSupply(epd: Epd): number {
        return calcWaterSupply(epd);
    }

    calcHeatSupply(epd: Epd): number {
        return calcHeatSupply(epd);
    }

    calcPowerSupply(epd: Epd): number {
        return calcPowerSupply(epd);
    }

    calcPowerSupplyCommon(epd: Epd): number {
        return calcPowerSupplyCommon(epd);
    }

    calcOtherPayments(epd: Epd): number {
        return calcOtherPayments(epd);
    }

    calcTotal(epd: Epd): number {
        return calcTotal(epd);
    }
}
