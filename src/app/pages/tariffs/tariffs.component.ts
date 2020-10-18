import {Component, TrackByFunction} from '@angular/core';
import {Observable} from 'rxjs';
import {TariffService} from '~services/tariff.service';
import {Tariff} from '~models/tariff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '~models/address.model';
import {AppService} from '~services/app.service';

@Component({
    selector: 'app-tariffs',
    templateUrl: './tariffs.component.html',
    styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent {
    readonly tariffs$: Observable<Tariff[]>;
    readonly address$: Observable<Address>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        tariffService: TariffService,
        appService: AppService,
    ) {
        this.tariffs$ = tariffService.list$();
        this.address$ = appService.address$;
    }

    trackBy: TrackByFunction<Tariff> = (_, {id}) => id;

    details({id}: Tariff): void {
        this.router.navigate([id], {relativeTo: this.route});
    }

    edit({id}: Tariff): void {
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
