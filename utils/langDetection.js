import {CookieName} from '@/assets/js/const'

export default async (cookies, fullPath, i18n) => {
  // сначала проверяем куки,
  // затем, при неудаче, запрашиваем предпочитаемый язык броузера
  // затем, при неудаче, ставим язык En.
  // И это ТОЛЬКО для '/'.

  // Для всех остальных страниц - выбор языка ориентируется на префикс в броузерном url.

  const langCookie = cookies.get(CookieName.LANGUAGE)
  const browserLang = navigator.language.split(';')[0].split(',')[0].substring(0, 2)   // 'en-US,en;q=0.9,ru;q=0.8'
  const RE = /^(\/[a-z]{2}\/)/

  if(fullPath !== '/') {                            // fullPath like "/zh/products/workshop-serebrov---large-box/"
    if(RE.test(fullPath))                           // в url язык обозначен
      return await i18n.setLocale(fullPath.substr(1, 2))
    else
      return await Promise.resolve()
  }

  // if it's '/'
  if(langCookie) {
    return await i18n.setLocale(langCookie)
  } else if (browserLang) {
    return await i18n.setLocale(browserLang)
  } else {
    return await i18n.setLocale('en')
  }
}
