<template>
  <div class="checkout_wrapper">
    <client-only>
      <component :is="checkoutComp" v-if="isCheckoutLoaded" :lang="$i18n.locale" :country-code="countryCode"></component>
    </client-only>
  </div>
</template>

<script>
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'

const random = Math.random();
export default {
  data() {
    return {
      isCheckoutLoaded: false,
      checkoutComp: null,
      countryCode: null
    };
  },
  head() {
    return {
      title: 'checkout',
      script: [
        {
          hid: 'stripe',
          // type: "module",
          src: `https://488105.selcdn.ru/checkout_dev/checkout.umd.js?v=${random}`,
          defer: true,
          callback: () => {
            this.checkoutComp = checkout;
            this.isCheckoutLoaded = true;
          },
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: `https://488105.selcdn.ru/checkout_dev/checkout.css?v=${random}`,
        },
      ],
    };
  },
  created() {
    if (process.client) {
      if (localStorage[COUNTRY_CODE]) {
        this.countryCode = localStorage[COUNTRY_CODE];
      }
    }
  },
};
</script>

