import { format as formatJalali } from 'date-fns-jalali';

export function formatLocalizedDate(date: Date | string, formatStr = 'yyyy/MM/dd HH:mm'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return formatJalali(d, formatStr);
}
