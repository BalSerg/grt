<template>
  <section class="checkout">
    <CheckoutHeader/>
    <template v-if="!!CHECKOUT.messages">
      <CheckoutWarnings
        v-if="CHECKOUT.messages.length > 0"
      />
    </template>
    <div class="checkout-container">
      <main class="checkout-main">
        <CheckoutForm v-if="isLoaded" ref="forms"/>
        <CheckoutPackages
          :currency="prettyCurrency"
          :isChangeVisible="isChangeVisible"
          @onChangeVisible="isChangeVisible=false"
        />
      </main>
      <aside class="checkout-aside">
        <template v-if="!!CHECKOUT.parcels">
          <CheckoutSummary
            :currency="prettyCurrency"
            @changeVisible="isChangeVisible=true" />
        </template>
      </aside>
    </div>
    <cart-footer :is-checkout="true" />
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CheckoutHeader from '@/modules/checkout/components/checkout-header';
import CheckoutWarnings from '@/modules/checkout/components/checkout-warnings';
import CheckoutForm from '@/modules/checkout/components/checkout-form';
import CheckoutSummary from '@/modules/checkout/components/checkout-summary';
import CheckoutPackages from '@/modules/checkout/components/checkout-packages';
import CartFooter from "~/modules/cart/components/cart-footer";

let googleMapsWasAdded = false

export default {
  components: {
    CartFooter,
    CheckoutHeader,
    CheckoutWarnings,
    CheckoutForm,
    CheckoutSummary,
    CheckoutPackages
  },
  data() {
    return {
      isChangeVisible: false,
      isLoaded: false,
      checkout: {
        warnings: [],
        customer: {
          name: '',
          phone: '',
          email: ''
        }
      },
    }
  },
  computed: {
    isCustomerValid() {
      // if (this.checkout.customer.name != null) {
      //   // console.log('this.$v.checkout.customer.$invalid', this.$v.checkout.customer.$invalid)
      //   console.log('this.checkout.customer.name', this.checkout.customer.name)
      //   console.log('this.checkout.customer.phone', this.checkout.customer.phone)
      //   console.log('this.checkout.customer.email', this.checkout.customer.email)
      //
      //   return !!(
      //     this.checkout.customer.name &&
      //     this.checkout.customer.phone &&
      //     this.checkout.customer.email)
      // }
      // else
      return false
    },
    prettyCurrency() {
      if (this.CHECKOUT.currency === 'RUB') return '₽';
      return this.CHECKOUT.currency;
    },
    ...mapGetters({
      CHECKOUT: 'checkout/CHECKOUT',
    })
  },
  methods: {
    ...mapActions({
      GET_CHECKOUT: 'checkout/GET_CHECKOUT'
    }),
    generalSending() {
      const isFormValid = this.$refs.forms.retrieveValidation()
      if (isFormValid) {
        // код из grt-3256 - верификация телефона


        this.$toast.show('SEND')
      } else
        this.$toast.show('БЫСТРО ЗАПОЛНИТЕ ПОЛЯ!')
    },
  },
  async mounted() {
    try {
      await this.GET_CHECKOUT();
    } catch (err) {
    } finally {
      this.isLoaded = true
    }
  },
  head() {
    const skip = googleMapsWasAdded
    googleMapsWasAdded = true

    return {
      script: [
        {
          hid: 'google-map',
          once: true,
          skip,
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NUXT_ENV_GOOGLE_MAPS_API_KEY}&libraries=places`,
          async: true
        }
      ],
      title: this.$t('checkout.heading')
    }
  },
}
</script>

<style lang="scss">
.invalid-input {
  input {
    border-color: $coral !important;
  }
}

.pointed {
  input {
    border-color: $coral !important;
  }
}

.checkout {
  position: relative;
  z-index: 9;
  padding-top: 16px;
  background-color: #fafafa;

  @media screen and (max-width: $desktop-mid - 1) {
    padding: 0 20px;
  }

  &-container {
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 24px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: flex-start;
    position: relative;

    @media screen and (max-width: $desktop-mid - 1) {
      flex-flow: column;
    }

    @media screen and (max-width: 1440px) {
      width: 96%;
    }

    @media screen and (max-width: $desktop-mid - 1) {
      width: 100%;
    }
  }

  &-main {
    flex-grow: 1;
    max-width: 1087px;
    box-sizing: border-box;

    @media screen and (max-width: $desktop-mid - 1) {
      max-width: unset;
      width: 100%;
    }
  }

  &-aside {
    max-width: 327px;
    min-width: 223px;
    flex-grow: 1;
    margin-left: 24px;
    flex-shrink: 1;
    position: sticky;
    top: 24px;
    margin-bottom: 16px;

    @media screen and (max-width: $desktop-mid - 1) {
      position: static;
      width: 100%;
      margin: 24px 0 0;
      max-width: unset;
    }
  }
}
</style>
