import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsItemComponent} from './item.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MomentPipeModule} from '~modules/moment/moment-pipe.module';
import {PricePipeModule} from '~modules/price/price-pipe.module';

@NgModule({
    declarations: [
        EpdsItemComponent
    ],
    exports: [
        EpdsItemComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MomentPipeModule,
        PricePipeModule
    ]
})
export class EpdsItemModule {}
