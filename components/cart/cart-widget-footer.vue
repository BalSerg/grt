<template>
  <div class="cart-widget__footer">
    <dl class="cart-widget__total-sum">
      <dt class="cart-widget__total-sum-title">
        {{ $t('header.user_cart.total') }}:
      </dt>
      <dd class="cart-widget__total-sum-price">
        {{ localizedTotalPrice }}
        <span class="cart-widget__currency">{{ currentCurrency }}</span>
      </dd>
    </dl>
    <old-link class="grt-btn grt-btn--filled" :to="PATH.CART">{{
      $t('header.user_cart.goto')
    }}</old-link>
  </div>
</template>

<script>
import PATH from 'assets/js/const.path'

export default {
  props: {
    totalPrice: {
      type: Number,
      default: 0
    },
    currentCurrency: {
      type: String,
      default: ''
    }
  },
  computed: {
    localizedTotalPrice() {
      return this.totalPrice.toLocaleString(this.$i18n.locale) || 0;
    },
    PATH() {
      return PATH
    }
  }
}
</script>

<style lang="scss">
.cart-widget__footer {
  position: relative;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: auto;
  padding-top: 8px;

  @media (min-width: $desktop-mid) {
    flex-direction: row;
    padding-top: 20px;
  }
}

.cart-widget__total-sum {
  margin: 0;
  margin-bottom: 12px;
  display: inline-flex;
  align-items: baseline;

  @media screen and (min-width: $desktop-mid) {
    display: block;
    margin-bottom: 0;
  }
}

.cart-widget__total-sum-title {
  margin-right: auto;

  font-size: 15px;
  line-height: 1.6;
  font-weight: 600;
  color: $text-black;
}

.cart-widget__total-sum-price {
  margin: 0;

  font-size: 17px;
  line-height: 1.3;
  font-weight: 600;
  color: $text-black;
}

.cart-widget__currency {
  font-weight: 400;
}
</style>
