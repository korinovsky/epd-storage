import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EpdService} from '~services/epd.service';
import {Observable} from 'rxjs';
import {Epd} from '~models/epd.model';

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class EpdsDetailsComponent {
    epd$: Observable<Epd>;

    constructor(
        roure: ActivatedRoute,
        epdService: EpdService,
    ) {
        this.epd$ = epdService.get(roure.snapshot.params.id);
    }
}
