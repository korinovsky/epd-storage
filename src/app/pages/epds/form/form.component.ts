import {Component} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Epd} from '~models/epd.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {AbstractControl, FormArray, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import moment from 'moment';
import autobind from 'autobind-decorator';
import _identity from 'lodash/identity';

@Component({
    selector: 'app-epds-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class EpdsFormComponent {
    epd$: Observable<Epd>;
    disabled = false;
    form = this.formBuilder.group({
        date: [null, Validators.required],
        waterSupply: this.formBuilder.array([
            [null, Validators.required],
            [null, Validators.required]
        ]),
        heatSupply: this.formBuilder.array([
            [null, Validators.required],
            [null, Validators.required]
        ]),
        powerSupply: this.formBuilder.array([
            [null, Validators.required],
            [null, Validators.required],
            [null, Validators.required]
        ]),
        powerSupplyCommon: this.formBuilder.array([
            [null, this.powerSupplyCommonValidator],
            [null, this.powerSupplyCommonValidator],
            [null, this.powerSupplyCommonValidator]
        ]),
        otherPayments: this.formBuilder.array([[null]]),
        receiptTotalPayment: [null, Validators.required],
    });
    private powerSupplyCommonRequired = false;
    private readonly id: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private epdService: EpdService,
        route: ActivatedRoute,
    ) {
        this.id = route.snapshot.params.id;
        this.powerSupplyCommonFormArray.valueChanges.subscribe(values => {
            const required = values.some(value => value !== null);
            if (this.powerSupplyCommonRequired !== required) {
                this.powerSupplyCommonRequired = required;
                this.powerSupplyCommon.forEach(control => control.updateValueAndValidity({onlySelf: true}));
            }
        });
        this.epd$ = (
            this.isNew
                ? epdService.list$().pipe(
                    take(1),
                    map(epds => {
                        const {length} = epds;
                        const prevEpd = length > 0 ? epds[length - 1] : {
                            date: moment().subtract(2, 'month').startOf('month'),
                        } as Epd;
                        return Object.assign({}, prevEpd, {
                            date: moment(prevEpd.date).add(1, 'month'),
                            powerSupplyCommon: [],
                            otherPayments: [],
                            receiptTotalPayment: null,
                        } as Epd) as Epd;
                    })
                )
                : epdService.get$(this.id).pipe(
                    tap(epd => {
                        const length = epd.otherPayments?.length ?? 0;
                        while (length > this.otherPaymentsArray.length) {
                            this.addOtherPayment();
                        }
                    })
                )
        ).pipe(
            tap(epd => this.form.reset(epd)),
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

    get waterSupply(): FormControl[] {
        return (this.form.get('waterSupply') as FormArray).controls as FormControl[];
    }

    get heatSupply(): FormControl[] {
        return (this.form.get('heatSupply') as FormArray).controls as FormControl[];
    }

    get powerSupply(): FormControl[] {
        return (this.form.get('powerSupply') as FormArray).controls as FormControl[];
    }

    get powerSupplyCommonFormArray(): FormArray {
        return this.form.get('powerSupplyCommon') as FormArray;
    }

    get powerSupplyCommon(): FormControl[] {
        return this.powerSupplyCommonFormArray.controls as FormControl[];
    }

    get otherPayments(): FormControl[] {
        return this.otherPaymentsArray.controls as FormControl[];
    }

    private get otherPaymentsArray(): FormArray {
        return this.form.get('otherPayments') as FormArray;
    }

    get receiptTotalPayment(): FormControl {
        return this.form.get('receiptTotalPayment') as FormControl;
    }

    @autobind
    private powerSupplyCommonValidator(control: AbstractControl): ValidationErrors {
        return this.powerSupplyCommonRequired ? Validators.required(control) : null;
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }
        this.form.disable();
        const value = this.form.value as Epd;
        value.otherPayments = value.otherPayments.filter(_identity);
        (
            this.isNew
                ? this.epdService.add$(value)
                : this.epdService.update$({
                    id: this.id,
                    ...value
                })
        ).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    delete(): void {
        this.form.disable();
        this.epdService.delete$(this.id).pipe(
            finalize(() => this.form.enable()),
        ).subscribe(this.navigateToList);
    }

    @autobind
    private navigateToList(): void {
        this.router.navigate(['epds']);
    }

    get canRemoveOtherPayment(): boolean {
        return this.otherPaymentsArray.length > 1;
    }

    addOtherPayment(): void {
        this.otherPaymentsArray.push(this.formBuilder.control(null));
    }

    removeOtherPayment(index: number): void {
        this.otherPaymentsArray.removeAt(index);
    }
}
