import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsComponent} from './epds.component';
import {MatButtonModule} from "@angular/material/button";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {ItemModule} from "./item/item.module";
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
        ItemModule
    ]
})
export class EpdsModule {}
