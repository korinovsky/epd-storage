import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TariffsItemComponent} from './item.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        TariffsItemComponent
    ],
    exports: [
        TariffsItemComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class TariffsItemModule {}
