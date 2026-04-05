import { Header } from '@/assets/js/const';
import { getCurrencyByLang } from '@/assets/js/currHelper';

export default function({ app, store, $axios }) {

  $axios.onRequest(config => {
    config.context = config.context || {};
    config.context.startTimeMs = Date.now();
    // config.headers.common[Header.LANG] = app.i18n.locale; // TODO раскомментить когда избавимся от старого сайта

    if (process.server) {
      const oldCookies = config.headers.common.cookie || '';
      const oldCookiesWithoutLangs = oldCookies.split(';')
                                               .filter(s => s && s !== '' && !s.trim().startsWith('lang='))
                                               .map(s => s.trim());
      const newCookies = [...oldCookiesWithoutLangs, 'lang=' + app.i18n.locale].join('; ');
      config.headers.common.cookie = newCookies;
    }
    let curr = store.getters['tech/currency'];
    if (!curr) {
      curr = getCurrencyByLang(app.i18n);
    }
    const isFner = store.state.tech.isFner ?? true;
    config.headers.common[Header.FOREIGNER] = isFner;
    config.headers.common[Header.CURRENCY] = curr;
  });

  $axios.onResponse(response => {
    const isAuthorizedString = response && response.headers[Header.AUTHORIZED];
    const isAuthorized =
      isAuthorizedString && isAuthorizedString.toLowerCase() === 'true';
    response.context = response.context || {};
    response.context.isAuthorized = isAuthorized;
    if (isAuthorized && !store.getters['userData/user']) {
      store.dispatch('userData/fetchUserData');
    } else if (!isAuthorized && store.getters.user) {
      store.commit('userData/removeUser');
    }
  });

  $axios.onError(error => {
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 500)
    ) {
      if (process.server) {
        console.error('process.server', error);
      } else {
        store.commit('tech/globalError');
      }
    }
    try {
      const endTimeMs = Date.now();
      const duration = endTimeMs - error.config.context.startTimeMs;
      const errorMessage = {
        level: 'error',
        url: error.config.url,
        duration: `${duration} ms`
      };
      console.log(errorMessage);
    } catch {
      // no op
    }
  });
}
