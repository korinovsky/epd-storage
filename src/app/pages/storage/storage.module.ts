import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageComponent} from './storage.component';
import {MatButtonModule} from "@angular/material/button";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {ItemModule} from "./item/item.module";
import {StorageRoutingModule} from "./storage-routing.module";

@NgModule({
    declarations: [
        StorageComponent
    ],
    imports: [
        StorageRoutingModule,
        CommonModule,
        AngularFirestoreModule,
        MatButtonModule,
        ItemModule
    ]
})
export class StorageModule {
}
