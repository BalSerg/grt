export const getCurrencyByLang = (i18n) => {
    return i18n.locale === 'ru' ? 'RUB' : 'USD';
}

export const getCurrencyByPassedLang = (lang) => {
    return lang === 'ru' ? 'RUB' : 'USD';
}