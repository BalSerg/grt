export default {
  methods: {
    pushToOrderStatus(result) {
      this.$router.push({
        path: this.localePath(`/order-status/${result.orderId}`),
        query: {sign: result.sign, thanks: 'true'},
      })
    },
  },
}
