import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-string-input',
    templateUrl: './string-input.component.html',
    styleUrls: ['./string-input.component.scss']
})
export class StringInputComponent {
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
