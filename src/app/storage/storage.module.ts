import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageComponent} from './storage.component';
import {MatButtonModule} from "@angular/material/button";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {ItemModule} from "./item/item.module";

@NgModule({
    declarations: [StorageComponent],
    exports: [
        StorageComponent
    ],
    imports: [
        CommonModule,
        AngularFirestoreModule,
        MatButtonModule,
        ItemModule
    ]
})
export class StorageModule {
}
