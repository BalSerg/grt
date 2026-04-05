<template>
  <div class="checkout-summary__submit">
    <button
      :class="{'checkout-invalid': !isCheckoutValid}"
      class="checkout-summary__button"
      @click="checkout"
    >
      {{ $t('checkout.submit') }}
    </button>
    <Loader v-if="checkoutLoading"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PATH from "~/assets/js/const.path";
import {ModalBus} from "~/event-bus/modal-bus";
import AuthorizationModal from "~/components/authorization/authorization-modal";
import {SmsVerificationBus} from "~/event-bus/sms-verification-bus";
import {AuthorizationModalBus} from "~/event-bus/authorization-modal-bus";
import RequestUserVerification from "~/mixins/request-user-verification-mx";
import PushOrderStatusMx from "~/mixins/push-order-status-mx";
import Loader from "~/components/common/loader";
import {COUNTRY_CODE} from "~/assets/js/const.LocalStorage";
import localStorageService from "~/utils/service.localStorage";

export default {
  name: "CheckoutSummaryButton",
  computed: {
    ...mapState('checkout', ['isCheckoutValid']),
    ...mapState({
      checkoutData: 'checkout',
    }),
    ...mapState('userData', ['user'])
  },
  components: {Loader},
  mixins: [RequestUserVerification, PushOrderStatusMx],
  data() {
    return {
      checkoutLoading: false,
    }
  },
  mounted() {
    SmsVerificationBus.$on('validationSuccess', this.validationSuccess)
    AuthorizationModalBus.$on('sendOrder', this.sendOrder)

    this.checkOnGoogle()
  },
  beforeDestroy() {
    SmsVerificationBus.$off('validationSuccess')
    AuthorizationModalBus.$off('sendOrder')
  },
  methods: {
    ...mapActions({
      CHECK_LOGIN: 'auth/CHECK_LOGIN',
      REFRESH_CHECKOUT: 'checkout/REFRESH_CHECKOUT',
      SAVE_CHECKOUT: 'checkout/SAVE_CHECKOUT',
      SEND_ORDER: 'cart/SEND_ORDER',
      FETCH_CART: 'cart/FETCH_CART',
    }),
    async checkOnGoogle() {
      const withGoogleAuth = localStorage.getItem('GOOGLE')
      if (!withGoogleAuth) return
      localStorage.removeItem('GOOGLE')
      const {result} = await this.CHECK_LOGIN();
      if (!result.authorized) return
      const forms = {
        'email': this.user.email || null,
        'countryAlpha2': localStorage.getItem('quick_order_alpha2') || localStorage[COUNTRY_CODE],
        'phone': this.user.phoneNumber || null,
      }
      localStorageService.SAVE_USER_INTO_LOCALSTORAGE(forms)
      await this.sendOrder()
    },
    toastForNullParcels() {
      const toastOptions = {
        router: this.$router,
        action: {
          text: this.$t('go_to_cart'),
          push: this.localePath({
            path: PATH.CART,
            query: {grab: this.displayedCartTab}
          })
        }
      }
      this.$toast.error(this.$t('checkout.has-no-parcels'), toastOptions);
    },
    scrollToEmptyFields() {
      if (document.querySelectorAll('.target-invalid')[0]) {
        this.$toast.error(this.$t('checkout.target_invalid'));
        document.querySelectorAll('.target-invalid')[0].closest('section').scrollIntoView({
          'block': 'nearest',
          'behavior': 'smooth'
        });
        if (document.querySelectorAll('.target-invalid')[0]) {
          setTimeout(() => {
            document.querySelectorAll('.target-invalid').forEach(invalidField => {
              invalidField.classList.add('pointed');
            });
            if (document.querySelectorAll('.target-invalid')[0].querySelector('input')) {
              document.querySelectorAll('.target-invalid')[0].querySelector('input').focus();
            }
          }, 200);
        }
      }
    },
    async validationSuccess() {
      await this.REFRESH_CHECKOUT({})
        .then(async () => await this.SAVE_CHECKOUT(this.checkoutData.checkout))
      // TODO как будет верификая раскоментить
      // .then(() => this.checkout())
    },
    openAuthorizationForm({phone, email}) {
      ModalBus.$emit('open', {
        component: AuthorizationModal,
        componentData: {phone, email, type: 'phone', isOrder: true, fullName: this.checkoutData.checkout.customer.name}
      })
    },
    async sendOrder() {
      const result = await this.SEND_ORDER({userData: {}, params: 'grab=buy'})
      await this.FETCH_CART({grab: 'buy'})
      this.pushToOrderStatus(result)
      this.checkoutLoading = false;
    },
    async checkout() {
      this.checkoutLoading = true;
      try {
        if (this.checkoutData.checkout.parcels.length < 1) {
          this.toastForNullParcels();
          return;
        }
        if (!this.isCheckoutValid) {
          this.$emit('changeVisible')
          this.scrollToEmptyFields();
        } else {
          this.checkoutLoading = true

          const {result} = await this.CHECK_LOGIN();
          if (result.authorized === false) {
            this.openAuthorizationForm(this.checkoutData.checkout.customer);
          } else {
            await this.sendOrder()
          }
        }
      } catch (err) {

      } finally {
        this.checkoutLoading = false;
      }
    }
  }
}
</script>
