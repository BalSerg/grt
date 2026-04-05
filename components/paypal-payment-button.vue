<template>
  <div id="paypal-button-container"></div>
</template>

<script>
import {loadScript} from "@paypal/paypal-js";

export default {
  props: {
    orderId: {
      type: String,
      required: true
    },
  },
  async mounted() {
    const paypal = await this.loadPaypalScript()
    const context = this

    await paypal.Buttons({
      async createOrder(data, actions) {
        const {result} = await context.$axios.$post(`/napi/order-processing/paypal/grt-orders/${context.orderId}/create`);
        return result
      },

      async onApprove(data, actions) {
        await context.$axios.$post(`/napi/order-processing/paypal/paypal-orders/${data.orderID}/capture`);
        window.location.reload()
      },
    }).render('#paypal-button-container')

  },
  methods: {
    async loadPaypalScript() {
      try {
        return await loadScript({"client-id": process.env.NUXT_ENV_PAYPAL_CLIENT_ID, currency: 'RUB'})
      } catch (error) {
      }
    }
  }
}
</script>
