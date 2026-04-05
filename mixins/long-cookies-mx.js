import { ONE_YEAR_IN_MS } from '@/assets/js/const';
import { DetectHost } from '@/assets/js/util';

export default {
  methods: {
    setLongTermCookies(name, value) {
      const expires = new Date(new Date().getTime() + ONE_YEAR_IN_MS);
      const host = process.env.NUXT_ENV_COOKIE_DOMAIN || DetectHost();

      this.$cookies.set(name, value, {
        domain: host,
        expires,
        path: '/'
      });
    }
  }
}
