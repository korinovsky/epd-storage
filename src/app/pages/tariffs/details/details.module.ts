import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TariffsDetailsComponent} from './details.component';

@NgModule({
    declarations: [
        TariffsDetailsComponent
    ],
    exports: [
        TariffsDetailsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class TariffsDetailsModule {}
