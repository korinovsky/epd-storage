import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TariffsFormComponent} from './form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '~modules/loader/loader.module';
import {MonthInputModule} from '~modules/month-picker/month-input.module';
import {MatButtonModule} from '@angular/material/button';
import {NumberInputModule} from '~modules/number-input/number-input.module';
import {MomentPipeModule} from '~modules/moment/moment-pipe.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        TariffsFormComponent
    ],
    exports: [
        TariffsFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoaderModule,
        MonthInputModule,
        FormsModule,
        MatButtonModule,
        NumberInputModule,
        MomentPipeModule,
        MatIconModule
    ]
})
export class TariffsFormModule {}
