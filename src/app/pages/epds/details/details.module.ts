import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsDetailsComponent} from './details.component';
import {LoaderModule} from '~modules/loader/loader.module';
import {MomentPipeModule} from '~modules/moment/moment-pipe.module';

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
        MomentPipeModule
    ]
})
export class EpdsDetailsModule {}
