import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressDialogComponent} from './address-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NumberInputModule} from '~modules/number-input/number-input.module';
import {StringInputModule} from '~modules/string-input/string-input.module';

@NgModule({
    declarations: [
        AddressDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        NumberInputModule,
        StringInputModule
    ]
})
export class AddressDialogModule {}
