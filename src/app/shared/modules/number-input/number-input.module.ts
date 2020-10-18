import {NgModule} from '@angular/core';
import {NumberInputComponent} from './number-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        NumberInputComponent
    ],
    exports: [
        NumberInputComponent
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class NumberInputModule {}
