import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '~core/auth.service';
import {Tariff} from '~models/tariff.model';

@Component({
    selector: 'app-tariffs-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class TariffsItemComponent {
    @Input() tariff: Tariff;
    @Output() edit = new EventEmitter();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }

    editClicked(event: MouseEvent): void {
        event.preventDefault();
        this.edit.emit();
    }
}
