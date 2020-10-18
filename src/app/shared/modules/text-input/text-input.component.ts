import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
    @Input() control: FormControl;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() suffix: string;
    @Output() suffixClick = new EventEmitter();

    get errorMessage(): string {
        const error = Object.keys(this.control.errors)[0];
        switch (error) {
            case 'required': {
                return 'Поле обязательно для заполнения';
            }
        }
        return error;
    }
}
