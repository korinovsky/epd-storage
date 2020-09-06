import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
    @Input() control: FormControl;
    @Input() label;
    @Input() decimal = 2;

    get placeholder(): string {
        return 1..toFixed(this.decimal);
    }

    get step(): number {
        return this.decimal > 1 ? (1 / Math.pow(10, this.decimal)) : 1;
    }
}
