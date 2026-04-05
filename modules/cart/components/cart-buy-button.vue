<template>
  <div>
    <button
      :class="{cart_buy_button_disabled: !isSuppliersLength || isDisabledButton || isNotAllAvailable}"
      :disabled="isDisabledButton"
      class="cart-buy-button"
      @click="checkout"
    >
      {{ $t("cart.go_to_checkout") }}
    </button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {ModalBus} from "~/event-bus/modal-bus";
import CartModal from "~/modules/cart/components/cart-modal";
import localStorageService from "~/utils/service.localStorage";
import {mergeEmptyFields} from "~/assets/js/util";
import AuthorizationModalPhone from "~/components/authorization/authorization-modal";
import {SmsVerificationBus} from "~/event-bus/sms-verification-bus";
import {OrderMethodsBus} from "~/event-bus/order-bus";
import SmsVerification from "~/components/sms-verification";
import PushOrderStatusMx from "~/mixins/push-order-status-mx";
import RequestUserVerification from "~/mixins/request-user-verification-mx";
import {COUNTRY_CODE} from "~/assets/js/const.LocalStorage";

export default {
  name: "CartBuyButton",
  mixins: [PushOrderStatusMx, RequestUserVerification],
  props: {
    isAgreement: Array,
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOrder(value) {
      if (value) {
        this.sendOrder()
        this.CHANGE_STATUS_ORDER(false)
      }
    }
  },
  mounted() {
    SmsVerificationBus.$on('validationSuccess', this.validationSuccess)
    SmsVerificationBus.$on('saveUserQuickOrder', this.saveUserQuickOrder)
    SmsVerificationBus.$on('changeNumber', this.changeNumber)
    OrderMethodsBus.$on('nextStep', this.nextStep)
    OrderMethodsBus.$on('getPosition', this.getPosition)

    this.checkOnGoogle()
  },
  beforeDestroy() {
    SmsVerificationBus.$off('validationSuccess')
    SmsVerificationBus.$off('saveUserQuickOrder')
    SmsVerificationBus.$off('changeNumber')
    OrderMethodsBus.$off('nextStep')
    OrderMethodsBus.$off('getPosition')
  },
  computed: {
    ...mapState('cart', ['isOrder', 'cartSet', 'cartForRegistration', 'notValidSuppliers', 'displayedCartTab']),
    ...mapState('userData', ['user']),
    ...mapGetters({
      CHECK_cartForRegistration_DATA: 'cart/CHECK_cartForRegistration_DATA',
    }),
    isSuppliersLength() {
      return this.fullSuppliers.length > 0
    },
    fullSuppliers() {
      return this.cartSet.suppliers.reduce((total, supplier) => supplier.count ? total.concat(supplier) : total, [])
    },
    isDisabledButton() {
      return this.cartForRegistration.some(({statusProduct}) => statusProduct === 'empty' && this.fullSuppliers.length === 0)
    },
    isNotAllAvailable() {
      const isCurrentTab = this.notValidSuppliers.some(({checked, type}) => {
        return checked === true && type === this.displayedCartTab
      })
      return this.notValidSuppliers.length > 0 && isCurrentTab
    }
  },
  methods: {
    ...mapActions({
      REFRESH_CHECKOUT: 'checkout/REFRESH_CHECKOUT',
      CHECK_LOGIN: 'auth/CHECK_LOGIN',
      SEND_ORDER: 'cart/SEND_ORDER',
      CHANGE_CART: 'cart/CHANGE_CART',
      FETCH_CART: 'cart/FETCH_CART'
    }),
    ...mapMutations({
      CHANGE_STATUS_ORDER: 'cart/CHANGE_STATUS_ORDER'
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
    async nextStep() {
      this.$emit('changePosition')
      const cartToSend = this.cartForRegistration.reduce((newCartList, cart) => {
        if (this.notValidSuppliers.some(notValidSupplier => notValidSupplier.supplierId === cart.supplierId)) {
          newCartList.push({
            checked: false,
            count: cart.count,
            id: cart.productId
          })
        }
        return newCartList
      }, [])

      await this.CHANGE_CART({
        cartToSend
      })

      if (this.fullSuppliers.length <= 0) {
        this.$toast.error(this.$t('cart.mark_product'));
        return
      }

      this.formOrder();
    },
    openModalPopup() {
      ModalBus.$emit('open', {
        component: CartModal,
        classes: 'block-collection-modal',
      });
    },
    checkout() {
      const isCurrentTab = this.notValidSuppliers.some(({type}) => type === this.displayedCartTab)

      if (!this.isAgreement?.length) {
        this.$emit('changeAgreementClear')
        return
      }

      if (this.fullSuppliers.length <= 0) {
        this.$toast.error(this.$t('cart.mark_product'));
        return
      }

      if (this.notValidSuppliers.length > 0 && this.fullSuppliers.length <= 1 && isCurrentTab) {
        this.$emit('changePosition')
        return
      }

      if (this.notValidSuppliers.length > 0 && isCurrentTab) {
        this.openModalPopup()
        return
      }

      this.formOrder()
    },
    openAuthorizationForm(phoneNumber) {
      ModalBus.$emit('open', {
        component: AuthorizationModalPhone,
        componentData: {phoneNumber, type: 'phone', isOrder: true}
      })
    },
    changeNumber() {
      ModalBus.$emit('close')
      this.openAuthorizationForm()
    },
    async saveUserQuickOrder() {
      await this.checkout()
    },
    openSmsModalForm(guid, timeLimitSec, verificationData) {
      ModalBus.$emit('open', {
        component: SmsVerification,
        componentData: {guid, timeLimitSec, verificationData}
      })
    },
    validationSuccess() {
      this.$axios.$get('/napi/cart/items?grab=order')
        .then(() => this.checkout())
    },
    getPosition() {
      this.$emit('changePosition')
    },
    async formOrder() {
      if (this.CHECK_cartForRegistration_DATA({
        targetGroup: 'all',
        targetVolume: 'allChecked',
        checkedField: 'checked',
        checkedValue: true,
        result: 5,
        inverseResult: true
      })) return

      if (this.displayedCartTab === 'buy') {
        await this.REFRESH_CHECKOUT({body: {}})
        this.$router.push(this.localePath('/checkout/'))
      } else if (this.displayedCartTab === 'order') {
        const {userData, userQuickOrderData} = this.getUserData()

        const {result} = await this.CHECK_LOGIN()
        if (!result.authorized) {
          this.openAuthorizationForm(userQuickOrderData.phone);
        } else {
          const resultUserData = await this.SEND_ORDER({userData})

          await this.FETCH_CART({grab: 'order'})
          this.pushToOrderStatus(resultUserData)
        }
      }
    },
    getUserData() {
      let userQuickOrderData = localStorageService.GET_USER_FROM_LOCALSTORAGE()
      userQuickOrderData = mergeEmptyFields(userQuickOrderData, this.user)

      const userData = {
        firstName: userQuickOrderData.name,
        email: userQuickOrderData.email,
        phoneNumber: userQuickOrderData.phone,
        countryAlpha2: userQuickOrderData.countryAlpha2
      }
      return {userData, userQuickOrderData}
    },
    async sendOrder() {
      const {userData} = this.getUserData()
      const resultUserData = await this.SEND_ORDER({userData})
      await this.FETCH_CART({grab: 'order'})
      this.pushToOrderStatus(resultUserData)
    }
  }
}
</script>
