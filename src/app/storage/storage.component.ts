import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
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
    readonly epds$ = this.storage.list();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        private storage: StorageService,
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }

    trackBy: TrackByFunction<Epd> = (_, {id}) => id;

    delete({id}: Epd) {
        this.storage.delete(id);
    }

    addEpd() {
        this.storage.add();
    }
}
