import {NgModule} from '@angular/core';
import {TariffsComponent} from './tariffs.component';
import {TariffsRoutingModule} from "~app/pages/tariffs/tariffs-routing.module";
import {CommonModule} from "@angular/common";
import {TariffsItemModule} from "~app/pages/tariffs/item/item.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        TariffsComponent
    ],
    imports: [
        TariffsRoutingModule,
        CommonModule,
        TariffsItemModule,
        MatButtonModule
    ]
})
export class TariffsModule {}
