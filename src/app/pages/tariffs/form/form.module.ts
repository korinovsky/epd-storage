import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TariffsFormComponent} from './form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '~modules/loader/loader.module';
import {MonthPickerModule} from '~modules/month-picker/month-picker.module';

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
        MonthPickerModule,
    ]
})
export class TariffsFormModule {}
