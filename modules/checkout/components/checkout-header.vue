<template>
  <section class="checkout-header">
    <button :aria-label="$t('go_back')"
            class="checkout-header__back-btn" @click="backToCart"></button>
    <h1 class="checkout-header__heading">{{ $t('checkout.heading') }}</h1>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import PATH from '@/assets/js/const.path'

export default {
  computed: {
    ...mapState('cart', ['displayedCartTab'])
  },
  methods: {
    backToCart() {
      this.$router.replace(this.localePath({
        path: PATH.CART,
        query: {grab: this.displayedCartTab}
      }))
    }
  }
}
</script>

<style lang="scss">
.checkout-header {
  max-width: 1440px;
  box-sizing: border-box;
  margin: 10px auto 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  @media screen and(max-width: $pad) {
    padding: 20px 0 6px;
  }

  @media screen and (max-width: $desktop-large) {
    width: 96%;
  }

  @media screen and (max-width: $desktop-mid - 1) {
    width: 100%;
  }

  @media screen and(max-width: $pad - 1) {
    padding: 54px 0 6px;
  }

  &__back-btn {
    display: block;
    width: 24px;
    height: 24px;

    background-color: transparent;
    background-image: url("/nimages/icons/arrow-back.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
  }

  &__heading {
    margin-left: 16px;

    font-size: 28px;
    line-height: 1.4;
    font-weight: 700;
    color: $text-black;

    @media screen and(max-width: $pad) {
      font-size: 22px;
    }
  }
}
</style>
