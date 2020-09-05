import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
import {Epd} from "~models/epd.model";
import {Observable} from "rxjs";
import {EpdService} from "~services/epd.service";
import {AuthService} from "~core/auth.service";

@Component({
    selector: 'app-storage',
    templateUrl: './epds.component.html',
    styleUrls: ['./epds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpdsComponent {
    readonly epds$ = this.storage.list();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        private storage: EpdService,
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
