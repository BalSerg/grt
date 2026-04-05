<template>
  <div class="cart__wrapper">
    <div class="cart-controls">
      <GrtCustomCheckbox_vModel :get-function="getToSelectAllTotal"
                                :set-function="setToSelectAllTotal"
                                :value="'allChecked'"
                                :disabled="disabled"
      >
        <span>{{ $t("cart.grab_all") }}</span>
      </GrtCustomCheckbox_vModel>

      <div class="cart-controls__delete-btn"
           @click="removeProducts"
      >
        {{ $t("cart.remove_selected") }}
      </div>
    </div>

    <div class="cart__positions">
      <CartSupplier v-for="(supplierId, idx) in grubSupplierIds"
                    :key="supplierId"
                    :idx="idx"
                    :is-change="isChange"
                    :is-last="idx === grubSupplierIds.length-1"
                    :supplier="GET_SUPPLIER(supplierId)"
                    @changePosition="isChange=false"
      />
    </div>

    <CartSummary
      :is-change-agreement="isChangeAgreement"
      class="cart__summary"
      @changeArgeement="isChangeAgreement=false"
      @changePosition="isChange=true"
      @getAgreement="getAgreement"
    />

    <cart-footer
      :is-agreement="isAgreement"
      @changeAgreementClear="isChangeAgreement=true"
      @changePosition="isChange=true"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex"
import CartSupplier from "@/modules/cart/components/cart-supplier"
import CartSummary from "@/modules/cart/components/cart-summary"
import GrtCustomCheckbox_vModel from "@/components/common/grt-custom-checkbox_v-model"
import GrtCustomCheckbox from "@/components/common/grt-custom-checkbox"
import PATH from "~/assets/js/const.path";
import CartFooter from "~/modules/cart/components/cart-footer";

export default {
  components: {
    CartFooter,
    CartSupplier,
    CartSummary,
    GrtCustomCheckbox_vModel,
    GrtCustomCheckbox,
  },
  computed: {
    ...mapState('cart', ['grubSupplierIds', 'displayedCartTab', 'productsCount', 'cartForRegistration']),
    ...mapGetters({
      GET_SUPPLIER: "cart/GET_SUPPLIER",
      CHECK_cartForRegistration_DATA: "cart/CHECK_cartForRegistration_DATA",
    }),
    disabled() {
      const isDisabled = this.cartForRegistration.some(product => product.statusProduct === 'empty' || product.statusProduct === 'deleted')
      return isDisabled
    }
  },
  data() {
    return {
      isChange: false,
      isAgreement: ['agree'],
      isChangeAgreement: false,
    }
  },
  methods: {
    ...mapActions({
      REMOVE_PRODUCTs: "cart/REMOVE_PRODUCTs",
      MAKE_ITEM_ALTERATION: "cart/MAKE_ITEM_ALTERATION",
      FETCH_CART: 'cart/FETCH_CART',
    }),
    getAgreement(isAgreement) {
      this.isAgreement = isAgreement
    },
    getToSelectAllTotal() {
      return [this.CHECK_cartForRegistration_DATA({
        targetGroup: 'all',
        targetVolume: 'allChecked',
        checkedField: 'checked',
        checkedValue: false,
        result: 'allChecked',
        inverseResult: true
      })]
    },
    async removeProducts() {
      await this.REMOVE_PRODUCTs({
        type: 'checked',
        volume: true,
        grabTyp: this.displayedCartTab,
      })

      if (this.grubSupplierIds.length === 0) {
        const grab = this.displayedCartTab === 'order' ? 'buy' : 'order'
        this.changeTab(grab)
      }
    },
    changeTab(grab) {
      this.$router.replace(this.localePath({
        path: PATH.CART,
        query: {grab}
      }))
    },
    setToSelectAllTotal(newVal) {          // newVal = ['allChecked'] or []
      this.MAKE_ITEM_ALTERATION({
        target: {type: 'all', volume: null},
        changedField: 'checked',
        newVal: newVal.length > 0
      })
    }
  },
}
</script>

<style lang="scss">
.cart-controls {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px 16px;
}

.cart-controls__delete-btn {
  height: 100%;
  margin-left: auto;
  color: $fuchsia;
  cursor: pointer;

  @media (min-width: $pad) {
    margin-left: 16px;
  }
}

.cart__wrapper {
  @media (min-width: $pad) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "controls controls"
      "companies summary";
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
  }

  @media (min-width: $desktop-mid) {
    padding: 0 32px;
  }
}

.cart__controls {
  grid-area: controls;
}

.cart__positions {
  grid-area: companies;
  width: 100%;
}

.cart__summary {
  grid-area: summary;
  height: max-content;
}
</style>
