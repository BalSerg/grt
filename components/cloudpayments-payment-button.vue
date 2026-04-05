<template>
  <button type="button" @click.stop="pay">{{ $t('pay') }}</button>
</template>

<script>
const AuthenticationUnavailableCode = '5207'

export default {
  props: {
    orderId: {
      type: String,
      required: true
    },
    loadOnOpen: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  async mounted() {
    if (this.loadOnOpen) {
      await this.pay();
    }
  },
  methods: {
    async pay() {
      const {result} = await this.$axios.$get(`napi/order-processing/orders/${this.orderId}/payment`);
      const language = this.getLanguage();
      const widget = new cp.CloudPayments({language});
      const instance = this

      await widget.pay('charge',
        {
          publicId: result.publicId,
          description: this.$t('payment_description'),
          email: result.email,
          amount: result.amount,
          currency: result.currency,
          accountId: result.accountId,
          invoiceId: result.invoiceId,
          skin: "mini",
        },
        {
          onSuccess () {
            // TODO: обновлять страницу средствами nuxt
            window.location.reload();
          },
          onComplete (paymentResult, options) {
            if (paymentResult.code === AuthenticationUnavailableCode || paymentResult.code === AuthenticationFailedCode) {
              instance.$emit('3d-error')
            }
          }
        }
      );
    },
    getLanguage() {
      const mapLangs = {
        'ru': 'ru-RU',
        'en': 'en-US',
        'de': 'de-DE',
        'lv': 'lv',
        'az': 'az',
        'kk': 'kk-KZ',
        'uk': 'uk',
        'pl': 'pl',
        'pt': 'pt',
        'cs': 'cs-CZ',
        'vi': 'vi-VN',
        'tr': 'tr-TR',
        'es': 'es-ES',
        'it': 'it',
      };
      const localeLang = this.$i18n.locale;

      return mapLangs[localeLang] || 'en-US';
    },
  }
}
</script>
