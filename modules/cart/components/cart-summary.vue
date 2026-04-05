<template>
  <section class="cart-summary">
    <div v-if="isSuppliersLength">
      <h2 class="visually-hidden">{{ $t("cart.result") }}</h2>
      <div
        v-for="supplier of fullSuppliers" :key="supplier.supplierId"
        class="cart-summary__company-summary cart-company-summary"
      >
        <cart-summary-suppliers
          :supplier="supplier"
        />
      </div>

      <div class="cart-summary__action">
        <GrtCustomCheckbox_vModel :get-function="getToAgreement"
                                  :is-error="isAgreementClear"
                                  :set-function="setToAgreement"
                                  :value="'agree'"
                                  class="cart-summary__checkbox"
        />
        <p class="cart-summary__agreement">
          <i18n path="footer.subscribe.agreement">
            <template #user_agreement>
              <nuxt-link :to="localePath(`/docs/terms-of-use/`)">{{
                  $t('footer.subscribe.user_agreement')
                }}
              </nuxt-link>
            </template>
            <template #policy>
              <nuxt-link :to="localePath(`/docs/privacy-policy/`)">{{
                  $t('footer.subscribe.policy')
                }}
              </nuxt-link>
            </template>
          </i18n>
        </p>
      </div>
    </div>

    <div v-else class="cart-summary__empty">
      <img src="~/static/nimages/cart/noCartOrder.svg"/>
      <div class="cart-summary__empty--tip-off">{{ $t("cart.tip-off") }}</div>
    </div>

    <cart-buy-button
      :is-agreement="isAgreement"
      @changeAgreementClear="isAgreement=true"
      @changePosition="changePosition"
    />

    <div class="cart-summary__payment-systems">
    </div>
  </section>
</template>

<script>
import {mapGetters, mapState} from "vuex"
import GrtCustomCheckbox_vModel from "@/components/common/grt-custom-checkbox_v-model"
import CartSummarySuppliers from "~/modules/cart/components/cart-summary-suppliers";
import CartBuyButton from "~/modules/cart/components/cart-buy-button";

export default {
  components: {
    CartBuyButton,
    CartSummarySuppliers,
    GrtCustomCheckbox_vModel,
  },
  props: {
    isChangeAgreement: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isAgreement: ['agree'],
    isAgreementClear: false,
    agreementChange: false,
  }),
  watch: {
    isChangeAgreement(val) {
      if (val) {
        this.agreementChange = true
        this.$emit('changeArgeement')
      }
    }
  },
  computed: {
    ...mapState('cart', ['cartSet']),
    ...mapGetters({
      user: 'userData/user',
    }),
    fullSuppliers() {
      return this.cartSet.suppliers.reduce((total, supplier) => supplier.count ? total.concat(supplier) : total, [])
    },
    isSuppliersLength() {
      return this.fullSuppliers.length > 0
    },
  },
  methods: {
    changePosition() {
      this.$emit('changePosition')
    },
    getToAgreement() {
      return this.isAgreement.length ? ['agree'] : []
    },
    setToAgreement(newVal) {
      if (newVal.includes('agree')) {
        this.isAgreement = newVal
      } else {
        this.isAgreement = []
      }
      this.isAgreementClear = false
      this.$emit('getAgreement', this.isAgreement)
    },
  },

}
</script>

<style lang="scss">
.cart-summary {
  position: relative;

  box-sizing: border-box;
  min-width: 240px;
  max-width: 343px;
  margin: 8px 0 54px 24px;
  padding: 16px;

  background-color: $white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: $pad) {
    margin: 8px auto;
  }
}

.cart-summary__payment-systems {
  position: absolute;
  right: 0;
  bottom: -54px;
  left: 0;

  height: 30px;

  background-image: url("/nimages/icons/pay.png");
  background-repeat: no-repeat;
  background-position: -27px 0;
  background-size: contain;

  &::before,
  &::after {
    position: absolute;
    top: 0;

    content: "";
  }

  &::before {
    left: 204px;
    top: -4px;
    z-index: 1;

    display: block;
    width: 66px;
    height: 41px;

    background-image: url("/nimages/icons/union_pay.png");
    background-size: cover;
  }

  &::after {
    left: 0;

    width: 73px;
    height: 35px;

    background: $white;
  }
}

.cart-company-summary {
  margin-top: 14px;
}

.cart-company-summary:first-of-type {
  margin-top: 0;
}

.cart-summary__action {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid $mid-grey-ui;
  display: flex;

  .cart-summary__checkbox {
    align-self: flex-start;
    margin-top: 4px;
  }

  .cart-summary__agreement {
    margin: 0 0 12px 10px;
    color: $text-black;
  }
}

.cart-buy-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;

  font-size: 16px;
  line-height: 1.3;
  text-align: center;
  color: $white;
  font-weight: 600;

  background-color: $azure3;
  border-radius: 4px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: $azure4;
    transition: all 0.3s ease;
  }

  &.cart_buy_button_disabled {
    background-color: #bdcbca;

    &:hover {
      background-color: #babdbd;
    }
  }
}

.cart-company-summary__list-key__title {
  display: flex;
}

.cart-summary__empty {
  min-width: 208px;
  max-width: 311px;
  margin: 0 auto 24px auto;
  text-align: center;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  color: $text-black;

  &--tip-off {
    margin-top: 30px;
  }
}
</style>
