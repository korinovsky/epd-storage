import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TariffsItemComponent} from './item.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MomentPipeModule} from '~modules/moment/moment-pipe.module';

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
        MatButtonModule,
        MomentPipeModule
    ]
})
export class TariffsItemModule {}
