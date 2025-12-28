import { I18nManager } from 'react-native';

const PERSIAN_NUMERALS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts a standard number to a string with Persian numerals.
 * @param value The number to convert.
 * @returns The number as a string in Persian numerals.
 */
export const toPersianNumber = (value: number | string | null | undefined): string => {
    if (value === null || typeof value === 'undefined') {
        return '';
    }
    return String(value).replace(/\d/g, (digit) => PERSIAN_NUMERALS[parseInt(digit, 10)]);
};

/**
 * Formats a number based on the current locale.
 * In RTL mode (Farsi), converts to Persian numerals.
 * @param value The number to format.
 * @param forceRTL Optional override for RTL check.
 * @returns The formatted number string.
 */
export const formatLocalizedNumber = (
    value: number | string | null | undefined,
    forceRTL?: boolean
): string => {
    const isRTL = forceRTL ?? I18nManager.isRTL;
    if (value === null || typeof value === 'undefined') {
        return '';
    }
    return isRTL ? toPersianNumber(value) : String(value);
};

/**
 * Gets the RTL-aware transform style for flipping icons.
 * @returns Style object with scaleX: -1 for RTL, undefined for LTR.
 */
export const getRTLIconStyle = () => {
    return I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : undefined;
};
