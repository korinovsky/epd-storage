import {Pipe, PipeTransform} from '@angular/core';
import {formatAmount} from '~app/shared/functions/util.functions';

@Pipe({
    name: 'price'
})
export class PricePipe implements PipeTransform {
    transform(value: number): string {
        return value ? formatAmount(value) + ' ₽' : '';
    }
}
