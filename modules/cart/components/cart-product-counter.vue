<template>
  <div class="cart-product__counter-wrapper">
    <template v-if="!isEmpty">
      <input-number-counter-in-kt
        v-model.lazy="count"
        :has-label="false"
        :is-in-cart="true"
        :max="displayedCartTab === 'order' ? Number.MAX_SAFE_INTEGER : product.available"
        :min="minPermittedAmount"
        class="cart-product__counter"
      />
      <div>
        <p
          v-if="statusProduct === 'available'"
          class="cart-product__counter-hint"
        >
          {{ localizedPrice }} {{ currency }} {{ $t("cart.at_this_one") }}.
        </p>
        <div v-else class="cart-product__caution">
          {{ $t("cart.amount_is_changed") }}
        </div>
      </div>
    </template>
    <div v-else class="cart-product__counter-wrapper_empty">
      <p class="cart-supplier__with-empty-supplier">{{ $t("cart.not_available") }}</p>
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
import {mapActions, mapState} from "vuex";
import inputNumberCounterInKt from "~/components/common/input-number-counter-in-kt";

const DEBOUNCE_TIME = 300;

export default {
  name: "CartProductCounter",
  components: {inputNumberCounterInKt},
  props: {
    product: {
      type: Object,
    },
    currency: {
      type: String,
    },
    isEmpty: {
      type: Boolean,
    },
    statusProduct: {
      type: String
    }
  },
  data: () => ({
    minPermittedAmount: 1,
  }),
  computed: {
    ...mapState('cart', ['displayedCartTab']),
    localizedPrice() {
      const price = this.product.priceWithDiscount !== null && this.product.priceWithDiscount !== 0
        ? this.product.priceWithDiscount
        : this.product.price
      return price
        ? price.toLocaleString(this.$i18n.locale)
        : this.$t("price_demand");
    },
    count: {
      get() {
        return this.product.count
      },
      set(newVal) {
        if (this.product.count === newVal) return
        if (!this.isProductLoaded) return
        this.debounceSendCountProducts(newVal)
      }
    },
    isProductLoaded() {
      return !!(this.product && this.product.productId)
    },
  },
  methods: {
    ...mapActions({
      MAKE_ITEM_ALTERATION: 'cart/MAKE_ITEM_ALTERATION'
    }),
    debounceSendCountProducts: debounce(function (products) {
      this.MAKE_ITEM_ALTERATION({
        target: {type: 'productId', volume: this.product.productId},
        changedField: 'count',
        newVal: products,
      })
    }, DEBOUNCE_TIME),
  }
}
</script>

<style lang="scss">
.cart-product__counter-wrapper_empty {
  justify-content: center;
}

.cart-product__counter-wrapper {
  grid-area: counter;

  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: $desktop-mid) {
    margin: 0 8px;
  }

  @media (min-width: $desktop-large) {
    margin-right: 12px;
  }
}
</style>
