import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {Observable} from 'rxjs';
import {Epd} from '~models/epd.model';
import {
    calcCommonHeatSupply, calcHeatSupply, calcMaintenance, calcOtherPayments, calcOwnHeatSupply, calcPowerSupply,
    calcPowerSupplyCommon, calcTotal, calcWaterDisposal, calcWaterHeatSupply, calcWaterSupply, round
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

    waterSupply({waterSupply, prev: {waterSupply: prevWaterSupply}}: Epd, index: number): number {
        return waterSupply[index] && prevWaterSupply[index]
            ? round(waterSupply[index] - prevWaterSupply[index], 3)
            : null;
    }

    calcWaterSupply(epd: Epd, index?: number): number {
        return calcWaterSupply(epd, index);
    }

    waterDisposal({waterSupply, prev: {waterSupply: prevWaterSupply}}: Epd): number {
        return round([0, 1].reduce((result, index) => result + (
            waterSupply[index] && prevWaterSupply[index] ? waterSupply[index] - prevWaterSupply[index] : 0
        ), 0), 3);
    }

    calcWaterDisposal(epd: Epd): number {
        return calcWaterDisposal(epd);
    }

    ownHeatSupply({heatSupply: [heatSupply], prev}: Epd): number {
        return heatSupply && prev?.heatSupply && prev.heatSupply[0] ? heatSupply - prev.heatSupply[0] : null;
    }

    commonHeatSupply({heatSupply: [, heatSupply]}: Epd): number {
        return heatSupply;
    }

    waterHeatSupply({heatSupply: [, , heatSupply]}: Epd): number {
        return heatSupply;
    }

    calcOwnHeatSupply(epd: Epd): number {
        return calcOwnHeatSupply(epd);
    }

    calcCommonHeatSupply(epd: Epd): number {
        return calcCommonHeatSupply(epd);
    }

    calcWaterHeatSupply(epd: Epd): number {
        return calcWaterHeatSupply(epd);
    }

    calcHeatSupply(epd: Epd): number {
        return calcHeatSupply(epd);
    }

    powerSupply({powerSupply, prev}: Epd, index: number): number {
        return powerSupply && powerSupply[index] && prev?.powerSupply && prev.powerSupply[index]
            ? round(powerSupply[index] - prev.powerSupply[index], 3)
            : null;
    }

    calcPowerSupply(epd: Epd, index?: number): number {
        return calcPowerSupply(epd, index) || null;
    }

    powerSupplyCommon({powerSupplyCommon, prev}: Epd, index: number): number {
        return powerSupplyCommon && powerSupplyCommon[index] && prev?.powerSupplyCommon && prev.powerSupplyCommon[index]
            ? round(powerSupplyCommon[index] - prev.powerSupplyCommon[index], 3)
            : null;
    }

    calcPowerSupplyCommon(epd: Epd, index?: number): number {
        return calcPowerSupplyCommon(epd, index) || null;
    }

    calcOtherPayments(epd: Epd): number {
        return calcOtherPayments(epd);
    }

    calcTotal(epd: Epd): number {
        return calcTotal(epd);
    }
}
