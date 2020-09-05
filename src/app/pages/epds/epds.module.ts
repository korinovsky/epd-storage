import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsComponent} from './epds.component';
import {MatButtonModule} from "@angular/material/button";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {EpdsItemModule} from "./item/item.module";
import {EpdsRoutingModule} from "./epds-routing.module";

@NgModule({
    declarations: [
        EpdsComponent
    ],
    imports: [
        EpdsRoutingModule,
        CommonModule,
        AngularFirestoreModule,
        MatButtonModule,
        EpdsItemModule
    ]
})
export class EpdsModule {}
