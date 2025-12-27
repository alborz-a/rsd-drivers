import { getLangNameFromCode } from 'language-name-map';
import { getString } from '../utils/storage';
import { get, navigatorConfig } from '../utils';
import en from '../locales/en.js';
import fa from '../locales/fa.js';
// import mn from '../../translations/mn.json';
import I18n from 'react-native-i18n';

export const translations = {
    en,
    fa,
    // mn,
};

export function getAvailableLocales() {
    const availableLocales = navigatorConfig('availableLocales', ['fa']);
    return Object.fromEntries(Object.entries(translations).filter(([locale]) => availableLocales.includes(locale)));
}

export function getLocale() {
    return getString('_locale_v2') ?? navigatorConfig('defaultLocale', 'fa');
}

export function getLanguage() {
    const locale = getLocale();
    return { code: locale, ...getLangNameFromCode(locale) };
}

export function translate(key, options) {
    return I18n.t(key, options);
}
