import {Component} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Tariff} from '~models/tariff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TariffService} from '~services/tariff.service';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {AbstractControl, FormArray, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
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
        maintenance: [null, Validators.required],
        waterSupply: [null],
        waterDisposal: [null],
        heatSupply: [null],
        powerSupply: this.formBuilder.array([
            [null, this.powerSupplyValidator],
            [null, this.powerSupplyValidator],
            [null, this.powerSupplyValidator]
        ]),
    });
    private readonly id: string;
    private powerSupplyRequired = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tariffService: TariffService,
        route: ActivatedRoute,
    ) {
        this.id = route.snapshot.params.id;
        this.powerSupplyArray.valueChanges.subscribe(values => {
            const required = values.some(value => value !== null);
            if (this.powerSupplyRequired !== required) {
                this.powerSupplyRequired = required;
                this.powerSupply.forEach(control => control.updateValueAndValidity());
            }
        });
        this.tariff$ = (
            this.isNew
                ? tariffService.list$().pipe(
                    take(1),
                    map(tariffs => {
                        const {length} = tariffs;
                        const prevTariff = length > 0 ? tariffs[length - 1] : {
                            date: moment().subtract(2, 'month').startOf('month'),
                        } as Tariff;
                        return Object.assign({}, prevTariff, {
                            date: moment(prevTariff.date).add(1, 'month'),
                        }) as Tariff;
                    })
                )
                : tariffService.get$(this.id)
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

    get maintenance(): FormControl {
        return this.form.get('maintenance') as FormControl;
    }

    get waterSupply(): FormControl {
        return this.form.get('waterSupply') as FormControl;
    }

    get waterDisposal(): FormControl {
        return this.form.get('waterDisposal') as FormControl;
    }

    get heatSupply(): FormControl {
        return this.form.get('heatSupply') as FormControl;
    }

    private get powerSupplyArray(): FormArray {
        return this.form.get('powerSupply') as FormArray;
    }

    get powerSupply(): FormControl[] {
        return this.powerSupplyArray.controls as FormControl[];
    }

    @autobind
    private powerSupplyValidator(control: AbstractControl): ValidationErrors {
        return this.powerSupplyRequired ? Validators.required(control) : null;
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }
        const value = this.form.value as Tariff;
        if (!this.powerSupplyRequired) {
            delete value.powerSupply;
        }
        this.form.disable();
        (
            this.isNew
                ? this.tariffService.add$(this.form.value)
                : this.tariffService.update$({
                    id: this.id,
                    ...this.form.value
                })
        ).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    delete(): void {
        this.form.disable();
        this.tariffService.delete$(this.id).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    @autobind
    private navigateToList(): void {
        this.router.navigate(['tariffs']);
    }
}
