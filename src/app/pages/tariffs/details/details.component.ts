import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TariffService} from '~services/tariff.service';
import {Observable} from 'rxjs';
import {Tariff} from '~models/tariff.model';

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class TariffsDetailsComponent {
    tariff$: Observable<Tariff>;

    constructor(
        roure: ActivatedRoute,
        tariffService: TariffService,
    ) {
        this.tariff$ = tariffService.get(roure.snapshot.params.id);
    }
}
