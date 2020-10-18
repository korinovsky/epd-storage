import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressDialogComponent} from './address-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NumberInputModule} from '~modules/number-input/number-input.module';
import {TextInputModule} from '~modules/text-input/text-input.module';

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
        TextInputModule
    ]
})
export class AddressDialogModule {}
