import {Pipe, PipeTransform} from '@angular/core';

function formatAmount(amount: number | string, decimalCount = 2, decimal = ',', thousands = ' '): string {
    const negativeSign = amount < 0 ? '-' : '';
    amount = Math.abs(Number(amount) || 0).toFixed(decimalCount);
    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;
    return negativeSign
        + (j ? i.substr(0, j) + thousands : '')
        + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
        + (decimalCount ? decimal + Math.abs(Number(amount) - Number(i)).toFixed(decimalCount).slice(2) : '');
}

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {
    transform(value: number): string {
        return (value !== null && value !== undefined) ? formatAmount(value) + ' ₽' : '';
    }
}
