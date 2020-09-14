import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressDialogComponent} from './address-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

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
        MatDialogModule
    ]
})
export class AddressDialogModule {}
