export const formatAmount = (amount: number | string, decimalCount = 2, decimal = ',', thousands = ' '): string => {
    const negativeSign = amount < 0 ? '-' : '';
    amount = Math.abs(Number(amount) || 0).toFixed(decimalCount);
    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;
    return negativeSign
        + (j ? i.substr(0, j) + thousands : '')
        + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
        + (decimalCount ? decimal + Math.abs(Number(amount) - Number(i)).toFixed(decimalCount).slice(2) : '')
            .replace(/0+$/, '')
            .replace(new RegExp(decimal + '$'), '');
};

export const round = (num: number, decimals = 2) => Math.round(
    (num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
