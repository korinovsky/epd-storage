import {NgModule} from '@angular/core';
import {TariffsComponent} from './tariffs.component';
import {TariffsRoutingModule} from '~app/pages/tariffs/tariffs-routing.module';
import {CommonModule} from '@angular/common';
import {TariffsItemModule} from '~app/pages/tariffs/item/item.module';
import {MatButtonModule} from '@angular/material/button';
import {TariffsFormModule} from '~app/pages/tariffs/form/form.module';
import {TariffsDetailsModule} from '~app/pages/tariffs/details/details.module';
import {LoaderModule} from '~modules/loader/loader.module';

@NgModule({
    declarations: [
        TariffsComponent
    ],
    imports: [
        TariffsRoutingModule,
        TariffsFormModule,
        TariffsDetailsModule,
        CommonModule,
        TariffsItemModule,
        MatButtonModule,
        LoaderModule
    ]
})
export class TariffsModule {}
