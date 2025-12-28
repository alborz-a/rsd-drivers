const currencies = [
    {
        iso2: 'IR',
        name: 'ایران',
        emoji: '🇮🇷',
        code: 'IRR',
        title: 'ریال',
        symbol: '﷼',
        precision: 0,
        thousandSeparator: ',',
        decimalSeparator: '',
        symbolPlacement: 'after',
    },
    {
        iso2: 'IR',
        name: 'ایران',
        emoji: '🇮🇷',
        code: 'IRT',
        title: 'تومان',
        symbol: 'تومان',
        precision: 0,
        thousandSeparator: ',',
        decimalSeparator: '',
        symbolPlacement: 'after',
    },
];

export default function getCurrency(code) {
    if (!code) {
        return currencies;
    }

    return currencies.find((currency) => {
        if (code.length === 2) {
            return currency.iso2.toLowerCase() === code.toLowerCase();
        }

        if (code.length === 3) {
            return currency.code.toLowerCase() === code.toLowerCase();
        }

        return currency.name.toLowerCase() === code.toLowerCase();
    });
}
