import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {Moment} from 'moment';

@Component({
    selector: 'app-month-picker',
    templateUrl: './month-picker.component.html',
    styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent {
    @Input() control: FormControl;

    chosenYearHandler(normalizedYear: Moment): void {
        const ctrlValue = this.control.value as Moment;
        ctrlValue.year(normalizedYear.year());
        this.control.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<any>): void {
        const ctrlValue = this.control.value as Moment;
        ctrlValue.month(normalizedMonth.month());
        this.control.setValue(ctrlValue);
        datepicker.close();
    }
}
