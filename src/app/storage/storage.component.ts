import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Epd} from "./storage.model";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StorageComponent {
    epds: Observable<Epd[]>;

    constructor(private storage: StorageService) {
        this.epds = storage.list();
    }

    remove({id}: Epd) {
        this.storage.delete(id);
    }

    addEpd() {
        this.storage.add();
    }
}
