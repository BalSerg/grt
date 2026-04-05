<template>
  <div class="cart-widget-product-price">
    <span class="visually-hidden">{{ $t('price_as_title') }}</span>
    <p
      v-if="localizedPriceWithDiscount"
      class="cart-widget-product-price__price"
    >
      {{ localizedPriceWithDiscount }}
      <span class="cart-widget-product-price__currency">{{ localizedCurrency }}</span>
    </p>
    <p
      class="cart-widget-product-price__price"
      :class="{'cart-widget-product-price__price--old-price': localizedPriceWithDiscount}"
    >
      {{ localizedPrice }}
      <span class="cart-widget-product-price__currency">{{ localizedCurrency }}</span>
    </p>
  </div>
</template>

<script>
import { Currency } from '@/assets/js/const';

export default {
  props: {
    price: {
      type: Number,
      default: 0
    },
    priceWithDiscount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: ''
    },
  },
  computed: {
    localizedPrice() {
      return this.price.toLocaleString(this.$i18n.locale);
    },
    localizedPriceWithDiscount() {
      return this.priceWithDiscount ?
        this.priceWithDiscount.toLocaleString(this.$i18n.locale) : 0;
    },
    localizedCurrency() {
      return Currency[this.currency];
    },
  }
}
</script>

<style lang="scss">
.cart-widget-product-price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  width: 100%;
  align-self: start;

  text-align: right;

  @media screen and (min-width: $desktop-mid) {
    display: block;
    width: auto;
  }
}

.cart-widget-product-price__price {
  display: block;

  font-weight: 600;
  font-size: 15px;
  line-height: 1.6;
  color: $text-black;
  text-align: right;

  @media (max-width: $desktop-mid - 1) {
    &:first-of-type {
      margin-right: 6px;
    }
  }
}

.cart-widget-product-price__currency {
  font-weight: 400;
}

.cart-widget-product-price__price--old-price {
  font-size: 13px;
  line-height: 1.4;
  color: $text-grey;
  text-decoration: line-through;

  .cart-widget-product-price__currency {
    text-decoration: line-through;
  }
}
</style>
