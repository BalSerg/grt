<template>
  <div class="product-tooltip">
    <button class="product-tooltip__toggle" type="button" :aria-label="$t('additional_info')"></button>
    <div class="product-tooltip__body">
      <p class="product-tooltip__text">{{$t('current_exchange_rate')}} {{symbol}} ({{originalCurrency}})</p>
    </div>
  </div>
</template>

<script>
import {CurrencyFull, CURRENCY_RUB} from '@/assets/js/const';

export default {
  props: {
    originalCurrency: {
      type: String,
      default: CURRENCY_RUB
    }
  },
  computed: {
    symbol() {
      return CurrencyFull[this.originalCurrency];
    }
  }
}
</script>

<style lang="scss">
.product-tooltip {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-self: center;
  margin: 0 10px 0 0;
  max-width: 204px;
  padding-left: 14px;
}

.product-tooltip__toggle {
  position: relative;
  width: 16px;
  height: 16px;
  background-image: url("/nimages/icons/tooltip.svg");
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;


  &::before {
    content: "";
    position: absolute;
    top: -22px;
    left: 1px;
    z-index: 1;
    width: 14px;
    height: 14px;
    opacity: 0;
    background-color: $white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
    transform: rotate(45deg);
    transition: opacity 0.25s ease-in;
  }

  &:hover,
  &:focus {
    &::before,
    ~ .product-tooltip__body {
      opacity: 1;
      visibility: visible;
    }
  }
}

.product-tooltip__body {
  position: absolute;
  bottom: 30px;
  right: 0;
  width: 190px;
  padding: 5px;
  opacity: 0;
  visibility: hidden;
  background-color: $white;
  border-radius: 4px;
  border: 1px solid $grey;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

  transition: opacity 0.25s ease-in;
}

.product-tooltip__text {
  position: relative;
  z-index: 2;
  background-color: $white;
}
</style>
