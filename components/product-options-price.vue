<template>
  <div>
    <div v-if="!display" class="product-options-price">
      <span class="visually-hidden">{{ $t('price_as_title') }}</span>
      <span
        v-if="price.priceWithDiscount"
        class="product-options-price__current-price"
        :class="{ 'product-options-price__current-price--highlighted': price.priceWithDiscount }"
      >
      {{ localizedPriceWithDiscount }}<span class="product-options-price__currency"> {{ localizedCurrency }}</span>
    </span>
      <span
        class="product-options-price__current-price"
        :class="{ 'product-options-price__current-price--crossed-out': price.priceWithDiscount }"
      >
      {{ localizedRetailPrice }} <span class="product-options-price__currency"> {{ localizedCurrency }}</span>
    </span>

      <ProductCurrencyTooltip
        v-if="isDifferentCurrency && (localizedCurrency.length !== 0)"
        :original-currency="price.originalCurrency"
      />
    </div>
    <span v-else class="product-options-price_temporarilyOutOfStock">
      <span v-if="temporarilyOutOfStock">{{$t('product_is_over')}}</span>
      <span v-if="discontinued">{{$t('withdrawn_from_sale')}}</span>
    </span>


  </div>
</template>

<script>
import { Currency } from '@/assets/js/const';
import ProductCurrencyTooltip from '@/components/common/product/product-currency-tooltip.vue';

export default {
  components: {
    ProductCurrencyTooltip,
  },
  props: {
    display: {
      type: Boolean,
      default: false,
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
    temporarilyOutOfStock: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Object,
      default() {
        return {
          retailPrice: 0,
          priceWithDiscount: 0,
          currency: Currency,
          originalCurrency: Currency
        }
      }
    }
  },
  computed: {
    localizedCurrency() {
      return this.price.retailPrice && this.price.currency ? Currency[this.price.currency] : '';
    },
    localizedRetailPrice() {
      return this.price.retailPrice ?
              this.price.retailPrice.toLocaleString(this.$i18n.locale) :
              this.$t('price_demand');
    },
    localizedPriceWithDiscount() {
      return this.price.priceWithDiscount ?
              this.price.priceWithDiscount.toLocaleString(this.$i18n.locale) :
              '';
    },
    isDifferentCurrency() {
      return this.price.currency !== this.price.originalCurrency;
    },
  }
}
</script>

<style lang="scss">
.product-tooltip {
  margin-top: 5px;

  .product-tooltip__body {
    right: -80px;
  }
}

.product-page__options-temporarilyOutOfStock {
  .product-options-price {
    flex-flow: wrap;
  }

  .product-options-price__current-price {
    margin: 0 20px 0 0;

    color: $text-grey-2;
  }

  .product-options-price_temporarilyOutOfStock {
    font-size: 14px;
    font-weight: bold;
    color: $text-black;
  }
}

.product-options-price {
  display: flex;
  align-items: baseline;
  padding: 5px 0;
}

.product-options-price__current-price {
  flex-shrink: 0;

  font-size: 28px;
  line-height: 1.4;
  font-weight: 700;
  color: $text-black;
}

.product-options-price__current-price--highlighted {
  color: $fuchsia;
}

.product-options-price__current-price--crossed-out {
  margin-left: 16px;

  font-size: 18px;
  font-weight: 600;
  color: rgba(40, 40, 40, 0.5);
  text-decoration: line-through;
}

.product-options-price__currency {
  font-size: 22px;
  font-weight: 400;
}

.product-options-price__current-price--crossed-out .product-options-price__currency {
  font-size: 14px;
  font-weight: 600;
}
</style>
