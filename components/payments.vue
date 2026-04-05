<template>
  <div class="block-buttons-payment">
    <CloudpaymentsPaymentButton v-if="paymentType === 0" :order-id="orderId" class="status-order__wrapper-button"/>
    <PaypalPaymentButton v-if="paymentType === 1" :order-id="orderId"/>
    <div
      v-if="paymentType === 1"
      class="block-buttons-payment__alternative"
    >
      <div class="block-buttons-payment__alternative-text">{{$t('status_order.awaiting_payment.problem')}}</div>
      <button class="block-buttons-payment__alternative-button">
        <span>{{$t('status_order.awaiting_payment.button')}}</span>
      </button>
    </div>
  </div>
</template>

<script>
import PaypalPaymentButton from "@/components/paypal-payment-button";
import CloudpaymentsPaymentButton from "@/components/cloudpayments-payment-button";

export default {
  components: {PaypalPaymentButton, CloudpaymentsPaymentButton},
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      paymentType: null
    }
  },
  async fetch() {
    const {result} = await this.$axios.$get(`/napi/order-processing/orders/${this.orderId}/available-payment`)
    this.paymentType = result
  }
}
</script>

<style lang="scss">
.block-buttons-payment {
  max-width: 460px;
  margin: 0 auto;

  &__alternative {
    width: 100%;
    margin: 24px 0 0;

    &-text {
      font-size: 12px;
      line-height: 17px;

      color: $text-grey-2;
    }

    &-button {
      box-sizing: border-box;
      padding: 21px 0;
      display: flex;
      justify-content: center;
      margin: 16px 0 0;
      width: 100%;

      border: 1px solid $mid-grey-ui;
      border-radius: 6px;
      background: $white;

      cursor: pointer;

      transition: opacity ease-out 250ms;

      >span {
        position: relative;
        padding: 0 0 0 86px;

        font-size: 14px;
        font-weight: 600;

        color: $text-black;

        &::after {
          position: absolute;
          left: 0;
          top: 1px;

          display: block;
          width: 78px;
          height: 18px;

          background-image: url("/nimages/icons/visa-master.png");
          background-size: contain;

          content: "";
        }
      }

      &:hover {
        opacity: 0.9;
        transition: opacity ease-in 250ms;
      }
    }
  }
}
</style>
