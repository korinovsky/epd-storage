import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
import {Epd} from '~models/epd.model';
import {Observable} from 'rxjs';
import {EpdService} from '~services/epd.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '~services/app.service';
import {Address} from '~models/address.model';

@Component({
    selector: 'app-storage',
    templateUrl: './epds.component.html',
    styleUrls: ['./epds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpdsComponent {
    readonly epds$: Observable<Epd[]>;
    readonly address$: Observable<Address>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        epdService: EpdService,
        appService: AppService,
    ) {
        this.epds$ = epdService.list$();
        this.address$ = appService.address$;
    }

    trackBy: TrackByFunction<Epd> = (_, {id}) => id;

    details({id}: Epd): void {
        this.router.navigate([id], {relativeTo: this.route});
    }

    edit({id}: Epd): void {
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
