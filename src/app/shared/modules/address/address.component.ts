import {Component, OnInit} from '@angular/core';
import {AppService} from '~services/app.service';
import {Address} from '~models/address.model';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    address$ = this.appService.address$;
    addresses: Address[];

    constructor(
        private appService: AppService,
    ) {}

    ngOnInit(): void {
    }

    add(): void {
        this.appService.addAddress();
    }

    edit(): void {

    }

    select(): void {

    }
}
