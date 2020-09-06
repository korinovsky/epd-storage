import {Component} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Tariff} from '~models/tariff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TariffService} from '~services/tariff.service';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import moment from 'moment';
import autobind from 'autobind-decorator';

@Component({
    selector: 'app-tariffs-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class TariffsFormComponent {
    tariff$: Observable<Tariff>;
    disabled = false;
    form = this.formBuilder.group({
        date: [null, Validators.required],
        waterSupply: [null, Validators.required],
        waterDisposal: [null, Validators.required],
    });
    private id: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tariffService: TariffService,
        private roure: ActivatedRoute,
    ) {
        this.id = roure.snapshot.params.id;
        this.tariff$ = (
            this.isNew
                ? tariffService.list().pipe(
                take(1),
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
            catchError(error => {
                this.navigateToList();
                return throwError(error);
            })
        );
    }

    get isNew(): boolean {
        return !this.id;
    }

    get date(): FormControl {
        return this.form.get('date') as FormControl;
    }

    get waterSupply(): FormControl {
        return this.form.get('waterSupply') as FormControl;
    }

    get waterDisposal(): FormControl {
        return this.form.get('waterDisposal') as FormControl;
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }
        this.form.disable();
        (
            this.isNew
                ? this.tariffService.add(this.form.value)
                : this.tariffService.update({
                    id: this.id,
                    ...this.form.value
                })
        ).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    delete(): void {
        this.form.disable();
        this.tariffService.delete(this.id).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    @autobind
    private navigateToList(): void {
        this.router.navigate(['tariffs']);
    }
}
