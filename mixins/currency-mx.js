import { CookieName } from '@/assets/js/const';
import { getCurrencyByLang } from '@/assets/js/currHelper';

export default {
  methods: {
    initCurrency() {
      if (this.$cookies.get(CookieName.CURRENCY)) {
        const curr = this.$cookies.get(CookieName.CURRENCY);
        this.handleCurrencySelect(curr);
      } else {
        this.handleCurrencySelect(getCurrencyByLang(this.$i18n));
      }
    },
    handleCurrencySelect(code) {
      this.selectedCurrency = code;

      const SET_CURRENCY = 'tech/setCurrency';
      this.$store.commit(SET_CURRENCY, code);

      // TODO убрать удаление кук
      this.$cookies.remove(CookieName.CURRENCY);

      // Устанавливаем куку на год (Если менять параметры, меняйте и на старом сайте, иначе куки дублируются!)
      this.setLongTermCookies(CookieName.CURRENCY, code);
    }
  }
};
