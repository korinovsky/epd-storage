import {Component, TrackByFunction} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '~core/auth.service';
import {TariffService} from '~services/tariff.service';
import {Tariff} from '~models/tariff.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-tariffs',
    templateUrl: './tariffs.component.html',
    styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent {
    readonly tariffs$ = this.tariffService.list$();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        private tariffService: TariffService,
        private router: Router,
        private route: ActivatedRoute,
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }

    trackBy: TrackByFunction<Tariff> = (_, {id}) => id;

    details({id}: Tariff): void {
        this.router.navigate([id], {relativeTo: this.route});
    }

    edit({id}: Tariff): void {
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
