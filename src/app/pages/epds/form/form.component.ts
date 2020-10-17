import {Component} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Epd} from '~models/epd.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import moment from 'moment';
import autobind from 'autobind-decorator';

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
        otherPayments: this.formBuilder.array([]),
    });
    private readonly id: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private epdService: EpdService,
        route: ActivatedRoute,
    ) {
        this.id = route.snapshot.params.id;
        this.epd$ = (this.isNew
            ? epdService.list$().pipe(
                take(1),
                map(epds => {
                    const {length} = epds;
                    const prevEpd = length > 0 ? epds[length - 1] : {} as Epd;
                    return Object.assign({}, prevEpd, {
                        date: moment()
                    }) as Epd;
                })
            )
            : epdService.get$(this.id)
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

    get otherPayments(): FormControl[] {
        return (this.form.get('otherPayments') as FormArray).controls as FormControl[];
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }
        this.form.disable();
        (
            this.isNew
                ? this.epdService.add$(this.form.value)
                : this.epdService.update$({
                    id: this.id,
                    ...this.form.value
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
}
