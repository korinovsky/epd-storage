import {Pipe, PipeTransform} from '@angular/core';
import {formatAmount} from '~app/shared/functions/util.functions';

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {
    transform(value: number): string {
        return value ? formatAmount(value, 3) : '';
    }
}
