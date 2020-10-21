import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsDetailsComponent} from './details.component';
import {LoaderModule} from '~modules/loader/loader.module';
import {MomentPipeModule} from '~modules/moment/moment-pipe.module';
import {AmountPipeModule} from '~modules/amount/amount-pipe.module';

@NgModule({
    declarations: [
        EpdsDetailsComponent
    ],
    exports: [
        EpdsDetailsComponent
    ],
    imports: [
        CommonModule,
        LoaderModule,
        MomentPipeModule,
        AmountPipeModule
    ]
})
export class EpdsDetailsModule {}
