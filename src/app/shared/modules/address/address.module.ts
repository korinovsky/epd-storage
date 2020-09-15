import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressComponent} from './address.component';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [AddressComponent],
    exports: [
        AddressComponent
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        RouterModule,
        MatButtonModule
    ]
})
export class AddressModule {}
