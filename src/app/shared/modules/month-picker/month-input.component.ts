import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {Moment} from 'moment';

@Component({
    selector: 'app-month-input',
    templateUrl: './month-input.component.html',
    styleUrls: ['./month-input.component.scss']
})
export class MonthInputComponent {
    @Input() control: FormControl;
    @Input() label = 'Месяц';

    chosenYearHandler(current: Moment): void {
        const value = (this.control.value as Moment).clone().startOf('month');
        value.year(current.year());
        this.control.setValue(value);
    }

    chosenMonthHandler(current: Moment, datepicker: MatDatepicker<any>): void {
        const value = (this.control.value as Moment).clone().startOf('month');
        value.month(current.month());
        this.control.setValue(value);
        datepicker.close();
    }

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
