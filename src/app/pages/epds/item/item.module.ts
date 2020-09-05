import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsItemComponent} from './item.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [EpdsItemComponent],
    exports: [
        EpdsItemComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class EpdsItemModule {
}
