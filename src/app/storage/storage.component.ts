import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Epd} from "./storage.model";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {AuthService} from "../core/auth.service";

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StorageComponent {
    epds$: Observable<Epd[]>;
    isUserLoggedIn$: Observable<boolean>;

    constructor(
        private storage: StorageService,
        private auth: AuthService,
    ) {
        this.epds$ = storage.list();
        this.isUserLoggedIn$ = this.auth.isUserLoggedIn$;
    }

    remove({id}: Epd) {
        this.storage.delete(id);
    }

    addEpd() {
        this.storage.add();
    }
}
