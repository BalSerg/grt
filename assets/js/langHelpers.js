import { CookieName } from '@/assets/js/const';

export const detectLanguage = (cookies, nav, i18n) => {
  if (i18n.locale !== 'en') {
    return i18n.locale;
  }

  const cookieLang = cookies.get(CookieName.LANGUAGE);
  if (cookieLang) {
    return cookieLang;
  } else if (typeof nav !== 'undefined' && nav.languages) {
      const lang = matchBrowserLocale(i18n.locales, nav.languages);

      if (lang) {
        return lang;
      }
    }

  return undefined;
}

const matchBrowserLocale = (appLocales, browserLocales) => {
    const matchedLocales = []

    // Normalise appLocales input
    const normalizedAppLocales = []
    for (const appLocale of appLocales) {
      const { code } = appLocale
      const iso = appLocale.iso || code
      normalizedAppLocales.push({ code, iso })
    }

    // First pass: match exact locale.
    for (const [index, browserCode] of browserLocales.entries()) {
      const matchedLocale = normalizedAppLocales.find(appLocale => appLocale.iso.toLowerCase() === browserCode.toLowerCase())
      if (matchedLocale) {
        matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length })
        break
      }
    }

    // Second pass: match only locale code part of the browser locale (not including country).
    for (const [index, browserCode] of browserLocales.entries()) {
      const languageCode = browserCode.split('-')[0].toLowerCase()
      const matchedLocale = normalizedAppLocales.find(appLocale => appLocale.iso.split('-')[0].toLowerCase() === languageCode)
      if (matchedLocale) {
        // Deduct a thousandth for being non-exact match.
        matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length })
        break
      }
    }

    // Sort the list by score (0 - lowest, 1 - highest).
    if (matchedLocales.length > 1) {
      matchedLocales.sort((localeA, localeB) => {
        if (localeA.score === localeB.score) {
          // If scores are equal then pick more specific (longer) code.
          return localeB.code.length - localeA.code.length
        }

        return localeB.score - localeA.score
      })
    }

    return matchedLocales.length ? matchedLocales[0].code : undefined
  }
