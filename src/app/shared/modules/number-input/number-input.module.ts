import {NgModule} from '@angular/core';
import {NumberInputComponent} from './number-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

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
    ]
})
export class NumberInputModule {}
