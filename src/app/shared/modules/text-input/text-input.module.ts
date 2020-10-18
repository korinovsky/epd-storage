import {NgModule} from '@angular/core';
import {TextInputComponent} from './text-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        TextInputComponent
    ],
    exports: [
        TextInputComponent
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
export class TextInputModule {}
