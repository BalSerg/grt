<template>
  <p class="product-card-price">
    <span class="visually-hidden">{{ $t('price_as_title') }}</span>
    <span
      v-if="priceWithDiscount"
      class="product-card-price__current-price"
      :class="{ 'product-card-price__current-price--highlighted': priceWithDiscount }"
    >
      {{ localizedPriceWithDiscount }}<span class="product-card-price__currency"> {{ localizedCurrency }}</span>
    </span>
    <span
      class="product-card-price__current-price"
      :class="{
        'product-card-price__current-price--crossed-out': priceWithDiscount,
        'product-card-price__current-price--demand': !retailPrice
      }"
    >
      {{ localizedRetailPrice }} <span v-if="retailPrice" class="product-card-price__currency"> {{
        localizedCurrency
      }}</span>
    </span>
  </p>
</template>

<script>
import {Currency} from '@/assets/js/const';

export default {
  props: {
    retailPrice: Number,
    priceWithDiscount: Number,
    currency: String,
  },
  computed: {
    localizedCurrency() {
      return Currency[this.currency];
    },
    localizedRetailPrice() {
      return this.retailPrice ? this.retailPrice.toLocaleString(this.$i18n.locale) : this.$t('price_demand');
    },
    localizedPriceWithDiscount() {
      return this.priceWithDiscount ? this.priceWithDiscount.toLocaleString(this.$i18n.locale) : '';
    },
  }
}
</script>

<style lang="scss">
.product-card-price {
  padding: 7px 0;

  @media (min-width: $pad) {
    min-height: 28px;
    padding: 5px 0;
  }
}

.product-card-price__current-price {
  margin-top: auto;
  margin-right: 4px;

  font-size: 16px;
  line-height: 1.3;
  font-weight: 600;
  color: $text-black;
  white-space: nowrap;

  @media (min-width: $pad) {
    margin-right: 7px;

    font-size: 20px;
  }
}

.product-card-price__currency {
  font-weight: 400;
  line-height: 1.4;
}

.product-card-price__current-price--crossed-out {
  margin-right: 0;

  font-size: 12px;
  font-weight: 600;
  color: $text-grey-2;
  text-decoration: line-through;

  @media (min-width: $pad) {
    font-size: 14px;
  }

  .product-card-price__currency {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;

    @media (min-width: $pad) {
      font-size: 14px;
    }
  }
}

.product-card-price__current-price--highlighted {
  color: $fuchsia;
}

.product-card-price__current-price--demand {
  align-self: flex-end;
  margin-bottom: -2px;

  font-size: 14px;
}

</style>
