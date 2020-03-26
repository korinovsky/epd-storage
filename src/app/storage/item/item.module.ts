import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemComponent} from './item.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [ItemComponent],
    exports: [
        ItemComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class ItemModule {
}
