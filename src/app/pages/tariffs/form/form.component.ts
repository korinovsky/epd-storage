import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Tariff} from '~models/tariff.model';
import {ActivatedRoute} from '@angular/router';
import {TariffService} from '~services/tariff.service';
import {map, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'app-tariffs-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class TariffsFormComponent {
    tariff$: Observable<Tariff>;
    private id: string;
    private form = this.formBuilder.group({
        date: [null, Validators.required],
        waterSupply: [null, Validators.required],
        waterDisposal: [null, Validators.required],
    });

    constructor(
        private formBuilder: FormBuilder,
        roure: ActivatedRoute,
        tariffService: TariffService,
    ) {
        this.id = roure.snapshot.params.id;
        this.tariff$ = (this.isNew
            ? tariffService.list().pipe(
                map(tariffs => {
                    const {length} = tariffs;
                    const prevTariff = length > 0 ? tariffs[length - 1] : {} as Tariff;
                    return Object.assign({}, prevTariff, {
                        date: moment()
                    }) as Tariff;
                })
            )
            : tariffService.get(this.id)
        ).pipe(
            tap(tariff => this.form.reset(tariff)),
        );

    }

    get isNew(): boolean {
        return !this.id;
    }

    get date(): FormControl {
        return this.form.get('date') as FormControl;
    }
}
