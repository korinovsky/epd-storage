import {NgModule} from '@angular/core';
import {TariffsComponent} from './tariffs.component';
import {TariffsRoutingModule} from "~app/pages/tariffs/tariffs-routing.module";

@NgModule({
    declarations: [
        TariffsComponent
    ],
    imports: [
        TariffsRoutingModule
    ]
})
export class TariffsModule {}
