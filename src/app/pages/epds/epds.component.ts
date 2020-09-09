import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
import {Epd} from '~models/epd.model';
import {Observable} from 'rxjs';
import {EpdService} from '~services/epd.service';
import {AuthService} from '~core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-storage',
    templateUrl: './epds.component.html',
    styleUrls: ['./epds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpdsComponent {
    readonly epds$ = this.epdService.list$();
    readonly isUserLoggedIn$: Observable<boolean>;

    constructor(
        private epdService: EpdService,
        private router: Router,
        private route: ActivatedRoute,
        auth: AuthService,
    ) {
        this.isUserLoggedIn$ = auth.isUserLoggedIn$;
    }

    trackBy: TrackByFunction<Epd> = (_, {id}) => id;

    details({id}: Epd): void {
        this.router.navigate([id], {relativeTo: this.route});
    }

    edit({id}: Epd): void {
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
