import { REDIRECT_CODE } from '@/assets/js/const';

export default ({ redirect }, inject) => {
  inject('nuxtRedirect', (to, code = REDIRECT_CODE) => {
    if (process.server) {
      return redirect(code, to);
    } else {
      return window.$nuxt.$router.push(to);
    }
  });

  inject('oldRedirect', ({ title, to }) => {
    return window.history.replaceState(null, title, to);
  });
};
