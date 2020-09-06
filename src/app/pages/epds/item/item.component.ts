import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '~core/auth.service';
import {Epd} from '~models/epd.model';

@Component({
    selector: 'app-epds-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class EpdsItemComponent {
    @Input() epd: Epd;
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
