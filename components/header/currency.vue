<template>
  <div :class="{ 'dropdown-active': active }" class="dropdown">
    <div class="dropdown-label" @click="active = !active">
      {{ currencyView }}
    </div>
    <div v-if="active" class="dropdown-options">
      <div class="dropdown-container">
        <div
          v-for="code in sortCurrencyList"
          :key="code"
          class="dropdown-option"
          @click="selectCurrency(code)"
        >
          {{ code }}&nbsp;&bull;&nbsp;{{ $t(`currency.${code.toLowerCase()}`) }}
        </div>
      </div>
    </div>
    <div class="dropdown-overlay" @click="active = !active"></div>
  </div>
</template>

<script>
import LongCookiesMixin from '@/mixins/long-cookies-mx';
import CurrencyMixin from '@/mixins/currency-mx';
import {sortCurrency} from "~/assets/js/util";

export default {
  mixins: [LongCookiesMixin, CurrencyMixin],
  props: {
    currencyList: Array,
  },
  data() {
    return {
      active: false,
      selectedCurrency: null,
    };
  },
  computed: {
    currencyView() {
      return this.$store.getters['tech/currency'] || this.$t('selectCurrency');
    },
    sortCurrencyList() {
      return sortCurrency(this.currencyList)
    }
  },
  methods: {
    selectCurrency(code) {
      this.handleCurrencySelect(code);

      if (process.client) {
        this.active = false;
        window.location.reload(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  margin-left: 20px;
}
</style>
