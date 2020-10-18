import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
    @Input() control: FormControl;
    @Input() label: string;
    @Input() decimal = 2;
    @Input() placeholderPostfix: string;
    @Input() suffix: string;
    @Output() suffixClick = new EventEmitter();

    get placeholder(): string {
        return 1..toFixed(this.decimal) + (this.placeholderPostfix ? ' ' + this.placeholderPostfix : '');
    }

    get step(): number {
        return this.decimal > 1 ? (1 / Math.pow(10, this.decimal)) : 1;
    }
}
