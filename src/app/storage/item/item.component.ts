import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../core/auth.service";
import {Epd} from "../storage.model";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    @Input() epd: Epd;
    @Output() delete = new EventEmitter();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }
}
