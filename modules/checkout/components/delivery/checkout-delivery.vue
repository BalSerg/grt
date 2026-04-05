<template>
  <div class="package-delivery">
    <checkout-delivery-form
      :parcel="parcel" @save-recipient="saveDelivery"
      @clearDeliveryMethods="clearDelivery"
      @loadDeliveryRates="getDeliveryRates"
    />
    <checkout-delivery-types
      :currency="currency"
      :delivery-methods="deliveryMethods"
      :delivery-method="deliveryMethod"
      :is-loading="deliveryMethodsIsLoading"
      :parcel="parcel"
      @fillRateCalcId="fillRateCalcId"
    />
  </div>
</template>

<script>
import merge from "lodash.merge";
import {mapActions} from "vuex";
import CheckoutDeliveryTypes from '@/modules/checkout/components/delivery/checkout-delivery-types.vue';
import CheckoutDeliveryForm from '@/modules/checkout/components/delivery/checkout-delivery-form.vue';

export default {
  components: {
    CheckoutDeliveryForm,
    CheckoutDeliveryTypes
  },
  props: {
    parcel: Object,
    currency: String
  },
  data() {
    return {
      deliveryMethods: [],
      selectedDeliveryMethod: 0,
      rateCalcId: 0,
      deliveryMethodsIsLoading: false,
    }
  },
  computed: {
    getParcelProductIds() {
      const productIds = this.parcel.products.map(x => x.productId)
      return productIds;
    },
    recipient() {
      return this.parcel.recipient;
    },
    deliveryMethod() {
      return this.parcel.delivery.deliveryMethodId
    }
  },
  methods: {
    ...mapActions({
      SAVE_PARCEL: 'checkout/SAVE_PARCEL',
    }),
    clearDelivery() {
      this.deliveryMethods = [];
      this.selectedDeliveryMethod = 0;
      this.rateCalcId = 0;
    },
    async saveDelivery(recipientForm) {
      const parcel = merge({}, this.parcel, {
        delivery: {deliveryMethodId: this.selectedDeliveryMethod},
        rateCalcId: this.rateCalcId,
        recipient: {
          address: recipientForm.deliveryAddress,
          postalCode: recipientForm.index
        }
      })
      await this.SAVE_PARCEL(parcel)
    },
    async getDeliveryRates(deliveryAddress) {
      this.deliveryMethods = [];
      this.deliveryMethodsIsLoading = true
      await this.$axios.$post(`/napi/logistics/delivery-operators/rates`, {
        addressTo: deliveryAddress,
        productIds: this.getParcelProductIds
      })
        .then(({result}) => {
          if (!result.length) {
            document.querySelectorAll('.delivery-address__error')[0]?.classList.add('pointed')
            return;
          }
          document.querySelectorAll('.delivery-address__error')[0]?.classList.remove('pointed')
          this.deliveryMethods = result
          if (result.length === 1) {
            this.fillRateCalcId(result[0]?.deliveryMethodId)
          }
        })
        .catch(err => {
            this.$toast.error(err.toString());
            this.$sentry.captureException(`Error response at delivery operators: ${err}`);
          }
        )
        .finally(() => this.deliveryMethodsIsLoading = false)
    },
    fillRateCalcId(id) {
      if (id) {
        this.rateCalcId = this.deliveryMethods.find(x => x.deliveryMethodId == id)?.id;
        this.selectedDeliveryMethod = id;
      } else
        this.rateCalcId = this.deliveryMethods.find(x => x.deliveryMethodId == this.selectedDeliveryMethod)?.id;
      if (this.rateCalcId && this.rateCalcId !== this.parcel.rateCalcId)
        this.saveDelivery({deliveryAddress: this.recipient.address, index: this.recipient.postalCode});
    },

  }
}
</script>
<style lang="scss">
.package-delivery {
  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 0 12px 0;
  }

  &__heading {
    font-size: 18px;
    line-height: 1;
    font-weight: 600;
    color: $text-black;
  }

  &__action {
    color: $grt-blue;
    cursor: pointer;
    font-size: 16px;
  }

  &__form {
    padding-bottom: 16px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: stretch;

    @media screen and (max-width: $pad) {
      display: flex;
      flex-direction: column;
    }
  }

  &__address {
    flex-grow: 1;
    position: relative;

    @media screen and (max-width: $pad) {
      order: 0;
    }

    @media screen and (max-width: $desktop-mid) {
      & .autosuggest__results {
        position: absolute;
        top: 48px;
        left: unset;
        right: unset;
        bottom: unset;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 8px 8px;
      }
    }

    .autosuggest__results {
      border-radius: 0 0 8px 8px;
    }

    .autosuggest__results > ul {
      margin: 0;
      padding: 0;

      list-style: none;

      > li {
        padding: 0 11px;

        cursor: pointer;

        &:hover {
          background-color: #f3f3f3;
        }
      }
    }
  }

  &__index {
    width: calc(33.3333% - 16px);
    margin-left: 16px;

    @media screen and (max-width: $pad) {
      width: 100%;
      margin: 16px 0 0 0;
      order: 1;
    }
  }

  &__input {
    background: $white;
    height: 48px;
    outline: none;
    border: 1px solid $grey-default;
    padding: 8px 16px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 14px;
  }

  &__types {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0 -8px;
    padding: 0 0 8px 0;

    @media screen and(max-width: $pad) {
      flex-direction: column;
    }
  }

  //noinspection CssInvalidPropertyValue
  &__type {
    border: 1px solid $mid-grey-ui;
    margin: 8px;
    width: calc(25% - 16px);
    padding: 16px;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: $white;
    box-shadow: 0, 0, 0, rgba(0, 0, 0, 0);
    transition: 0.2s;
    cursor: pointer;
    position: relative;

    @media screen and (max-width: $desktop-mid - 1) {
      width: calc(50% - 16px);
    }

    @media screen and (max-width: $pad - 1) {
      width: calc(100% - 16px);
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 3px 4px rgba(9, 12, 2, 0.25);
    }

    &.skeleton {
      &:hover {
        box-shadow: none !important;
        transform: translateY(0);
      }

      & > * {
        border-radius: 4px;
        background: linear-gradient(270deg, #f5f5f5, #e9e9e9);
        background-size: 400% 400%;
        animation: type-skeleton 2s ease infinite;

        &:nth-child(1) {
          animation-delay: 0.25s;
        }

        &:nth-child(2) {
          animation-delay: 0.5s;
        }

        &:nth-child(3) {
          animation-delay: 0.75s;
        }

        &:nth-child(4) {
          animation-delay: 0.75s;
        }

        @keyframes type-skeleton {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }
      }
    }

    &.active {
      border-color: $grt-blue;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    &.selected {
      &::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 16px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19.375.453h-1.639a.746.746 0 0 0-.588.286L7.485 12.98 2.85 7.11a.75.75 0 0 0-.588-.287H.624a.187.187 0 0 0-.147.303l6.42 8.133c.3.38.876.38 1.178 0L19.522.753c.096-.12.01-.3-.147-.3Z' fill='%23007AFF'/%3e%3c/svg%3e");
        top: 20px;
        right: 20px;
      }
    }

    .delivery-type {
      &__name {
        color: $text-black;
        width: 100%;
        height: 40px;
        line-height: 20px;
        font-size: 16px;
        box-sizing: border-box;
        padding-right: 30%;
        margin-bottom: 10px;
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* stylelint-enable */
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__description {
        font-size: 12px;
        line-height: 16px;
        height: 32px;
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* stylelint-enable */
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        color: $text-grey-2;
        width: 100%;
        box-sizing: border-box;
      }

      &__date,
      &__price {
        width: 45%;
        font-size: 14px;
        box-sizing: border-box;
        color: $text-black;
      }

      &__price {
        text-align: right;
        margin-left: 10%;
      }
    }
  }

  &__methods {
    margin: -6px 0;

    &.methods-error {
      .delivery-method {
        &__control {
          input[type="radio"] {
            & ~ label {
              border-color: $coral !important;
            }
          }
        }
      }
    }
  }

  .delivery-method {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin: 6px 0;
    border-radius: 4px;
    border: 1px solid $mid-grey-ui;
    padding: 13px 16px;
    box-sizing: border-box;
    line-height: 1;
    background-color: $white;
    cursor: pointer;

    @media screen and (max-width: $pad - 1) {
      flex-flow: wrap;
      padding-left: 48px;
      position: relative;
    }

    &.selected {
      border-color: $grt-blue;
      box-shadow: 0 0 2px rgba(0, 122, 255, 0.2);
    }

    &__control {
      width: 16px;
      height: 16px;
      position: relative;

      @media screen and (max-width: $pad - 1) {
        position: absolute;
        left: 16px;
        top: calc(50% - 8px);
      }

      input[type="radio"] {
        display: none;

        & ~ label {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #d9d9d9;
          position: relative;
          box-sizing: border-box;

          &::before {
            width: 2px;
            height: 2px;
            background-color: transparent;
            transform: translate(-50%, -50%);
            transition: ease 400ms;
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
          }
        }

        &:checked {
          & ~ label {
            border-color: $grt-blue;
            background-color: $white;

            &::before {
              background-color: $grt-blue;
              width: 8px;
              height: 8px;
            }
          }
        }
      }
    }

    &__date {
      flex-grow: 1;
      white-space: nowrap;

      span {
        @media screen and (max-width: $pad) {
          display: none;
        }
      }
    }

    &__price {
      padding: 0 0 0 10px;

      white-space: nowrap;
    }

    &__title {
      padding-right: 16px;
      min-width: 40%;

      @media screen and (min-width: $desktop-mid) and (max-width: 1050px) {
        min-width: 30%;
      }

      @media screen and (max-width: $pad - 1) {
        margin-bottom: 8px;
        padding-right: 0;
        flex-grow: 1;
        min-width: 60%;
      }
    }

    &__logo {
      width: 96px;
      margin-left: 16px;

      @media screen and (max-width: $pad - 1) {
        margin-left: 0;
        margin-bottom: 8px;
      }

      img {
        width: 80px;
        height: 20px;
      }
    }
  }
}

.delivery-address__error {
  margin-left: 15px;
  font-size: 11px;
  line-height: 1.4;
  color: #eb5757;
  margin-top: 5px;
  display: none;
}

.delivery-method__error {
  margin-left: 15px;
  font-size: 11px;
  line-height: 1.4;
  color: #eb5757;
  padding-top: 7px;
  display: none;
}

.pointed {
  display: block;

  .delivery-method__error,
  .delivery-address__error {
    display: block !important;
  }

  & ~ .delivery-method__error,
  .delivery-address__error {
    display: block !important;
  }
}

.delivery-method__error.pointed {
  display: block;
}
</style>
