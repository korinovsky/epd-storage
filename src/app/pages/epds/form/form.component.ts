import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Epd} from '~models/epd.model';
import {ActivatedRoute} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {map, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'app-epds-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class EpdsFormComponent {
    epd$: Observable<Epd>;
    private id: string;
    private form = this.formBuilder.group({
        date: [null, Validators.required],
        waterSupply: [null, Validators.required],
        waterDisposal: [null, Validators.required],
    });

    constructor(
        private formBuilder: FormBuilder,
        roure: ActivatedRoute,
        epdService: EpdService,
    ) {
        this.id = roure.snapshot.params.id;
        this.epd$ = (this.isNew
            ? epdService.list().pipe(
                map(epds => {
                    const {length} = epds;
                    const prevEpd = length > 0 ? epds[length - 1] : {} as Epd;
                    return Object.assign({}, prevEpd, {
                        date: moment()
                    }) as Epd;
                })
            )
            : epdService.get(this.id)
        ).pipe(
            tap(epd => this.form.reset(epd)),
        );
    }

    get isNew(): boolean {
        return !this.id;
    }

    get date(): FormControl {
        return this.form.get('date') as FormControl;
    }
}
