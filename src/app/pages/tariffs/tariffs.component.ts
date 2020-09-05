import {Component, TrackByFunction} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "~core/auth.service";
import {TariffService} from "~services/tariff.service";
import {Tariff} from "~models/tariff.model";

@Component({
    selector: 'app-tariffs',
    templateUrl: './tariffs.component.html',
    styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent {
    readonly tariffs$ = this.tariffService.list();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        private tariffService: TariffService,
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }

    trackBy: TrackByFunction<Tariff> = (_, {id}) => id;

    delete({id}: Tariff) {
        this.tariffService.delete(id);
    }

    add() {
        this.tariffService.add();
    }
}
