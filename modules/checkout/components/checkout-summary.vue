<template>
  <div class="checkout-summary">
    <div v-for="parcel in checkout.parcels"
         :key="parcel.number"
         class="checkout-summary__package"
    >
      <div class="checkout-summary__title">
        {{ $t('checkout.parcel') }} {{ parcel.number }}
      </div>
      <div class="checkout-summary__details">
        <div class="checkout-summary__detail">
          <div class="checkout-summary__label">
            {{ $t('checkout.goods') }}&nbsp;({{ parcel.count }}&nbsp;{{ $t('cart.thing') }})
          </div>
          <div class="checkout-summary__value">
            {{ toSafeLocaleString(parcel.products.reduce((sum, item) => sum + item.total, 0)) }}&nbsp;{{ currency }}
          </div>
        </div>
        <template v-if="parcel.weightKg > 0">
          <div class="checkout-summary__detail">
            <div class="checkout-summary__label">
              {{ $t('cart.weigh_total') }}
            </div>
            <div class="checkout-summary__value">
              {{ parcel.weightKg }}&nbsp;{{ $t('mass_unit.kg') }}
            </div>
          </div>
        </template>
        <template v-if="parcel.discount > 0">
          <div class="checkout-summary__detail">
            <div class="checkout-summary__label">
              {{ $t('checkout.discount') }}
            </div>
            <div class="checkout-summary__value">
              {{ parcel.discount }}&nbsp;{{ currency }}
            </div>
          </div>
        </template>
        <template v-if="parcel.deliveryTariffRate > 0">
          <div class="checkout-summary__detail">
            <div class="checkout-summary__label">
              {{ $t('cart.delivery') }}
            </div>
            <div class="checkout-summary__value">
              {{ toSafeLocaleString(parcel.deliveryTariffRate) }}&nbsp;{{ currency }}
            </div>
          </div>
        </template>
        <!--div class="checkout-summary__detail">
          <div class="checkout-summary__label">
            {{ $t('cart.total') }}
          </div>
          <div class="checkout-summary__value">
            {{ toSafeLocaleString(getParcelTotalWithRates(parcel)) }}&nbsp;{{ currency }}
          </div>
        </div-->
      </div>
    </div>
    <div class="checkout-summary__total">
      <div class="checkout-summary__label">
        {{ $t('cart.total') }}
      </div>
      <div class="checkout-summary__value">
        {{ toSafeLocaleString(checkout.summaryPrice) }}&nbsp;{{ currency }}
      </div>
    </div>

    <checkout-summary-button @changeVisible="$emit('changeVisible')"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import CheckoutSummaryButton from "~/modules/cart/components/checkout-summary-button";

export default {
  components: {
    CheckoutSummaryButton,
  },
  props: {
    isCustomerValid: Boolean,
    currency: String
  },
  computed: {
    ...mapState('checkout', ['checkout']),
  },
  methods: {
    toSafeLocaleString(number) {
      if (number)
        return number.toLocaleString();
      else return 0;
    },
    getParcelTotalWithRates(parcel) {
      const parcelRates = parcel.deliveryTariffRate;
      let sum = parcel.total
      if (parcelRates) {
        sum += parcelRates
      }
      if (sum)
        return sum;
    },
  },
}
</script>

<style lang="scss">
.checkout-summary {
  padding: 16px;
  background-color: $white;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: $text-black;
    line-height: 1.5;
  }

  &__package {
    margin-bottom: 16px;
  }

  &__details {
    padding: 8px 0;
  }

  &__detail {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    padding: 2px 0;
    font-size: 14px;
    line-height: 20px;
    color: $text-grey-2;
  }

  &__value {
    max-width: 50%;
    color: #090305;
  }

  &__submit {
    position: relative;
    margin-top: 20px;
  }

  &__button {
    border: none;
    outline: none;
    display: block;
    background-color: $azure3;
    color: $white;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s cubic-bezier(0, 1.03, 1, 0.01);

    &:active {
      transform: translateY(2px);
    }

    &:disabled {
      background-color: $grey;
      cursor: default;
    }

    &.checkout-invalid {
      background-color: #bdcbca;

      &:hover {
        background-color: #babdbd;
      }
    }
  }

  &__total {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 16px;
    color: #090305;
  }
}
</style>
