<template>
  <div class="wrapper_buttons">
    <InputNumberCounterInKt v-if="showCounter"
                            v-model="count"
                            :disabled="isNotPublish"
                            :has-label="false"
                            :in-catalog="inCatalog"
                            :is-in-product-card="true"
                            :max="max"
                            :min="min"
                            :product-id="product.id"
                            class="cart-product__counter"
                            @decreaseProducts="decreaseProducts"
                            @increaseProducts="buyProduct"
                            @removeProduct="removeProduct"
                            @showToast="showToast"
    >
      <template v-if="!inCatalog">
        <span class="big_text_to_cart">{{ $t('product.goods_in_the_cart') }}: </span>
        <span class="small_text_to_cart">{{ $t('product.in_the_cart') }}: </span>
      </template>
    </InputNumberCounterInKt>

    <ProductBuyButton
      v-if="!showCounter"
      :class="{'product-options__buy-btn__product': !inCatalog}"
      :disabled="isNotPublish"
      :in-catalog="inCatalog"
      class="product-options__buy-btn"
      @click="buyProduct"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import debounce from "debounce";
import PATH from "@/assets/js/const.path";

import InputNumberCounterInKt from "~/components/common/input-number-counter-in-kt";
import ProductBuyButton from "~/components/product-buy-button";

const DEBOUNCE_TIME = 300;

export default {
  name: "ProductButtons",
  components: {
    InputNumberCounterInKt,
    ProductBuyButton,
  },
  props: {
    inCatalog: {
      type: Boolean,
    },
    product: {
      type: Object,
    },
    max: {
      type: Number,
      default: 10000,
    },
    min: {
      type: Number,
      default: 0,
    },
    isTemporarilyOutOfStock: {
      type: Boolean,
    },
    isDiscontinued: {
      type: Boolean,
    }
  },
  data() {
    return {
      count: 1,
      showCounter: false,
      toastOptions: {}
    }
  },
  computed: {
    ...mapState('cart', ['displayedCartTab']),
    ...mapGetters({
      GET_PRODUCT_COUNT: 'cart/GET_PRODUCT_COUNT',
    }),
    isNotPublish() {
      return this.isTemporarilyOutOfStock || this.isDiscontinued
    },
  },
  mounted() {
    if (this.countInCart() > 0) {
      this.count = this.countInCart()
      this.showCounter = true
    } else {
      this.showCounter = false
    }
    this.toastOptions = {
      router: this.$router,
      action: {
        text: this.$t('go_to_cart'),
        push: this.localePath({
          path: PATH.CART,
          query: {grab: 'buy'}
        })
      }
    }
  },
  methods: {
    ...mapActions({
      POST_PRODUCT_TO_CART: 'cart/POST_PRODUCT_TO_CART',
      REMOVE_PRODUCTs: 'cart/REMOVE_PRODUCTs',
    }),
    remove: debounce(function () {
      this.REMOVE_PRODUCTs({type: 'productId', volume: this.product.id})
    }, DEBOUNCE_TIME),
    removeProduct() {
      this.remove()
      this.count = 1;
      this.showCounter = false;
      this.showToast('cart.product_removed')
    },
    showToast(text) {
      this.$toast.show(this.$t(text), this.toastOptions);
    },
    setProductsDebounced: debounce(function (params) {
      this.POST_PRODUCT_TO_CART(params);
    }, DEBOUNCE_TIME),
    countInCart() {
      return this.GET_PRODUCT_COUNT(this.product.id)
    },
    decreaseProducts(params = {id: this.product.id, count: this.count}) {
      this.setProductsDebounced(params)
    },
    buyProduct(params = {id: this.product.id, count: this.count}) {
      const {count} = params;

      this.setProductsDebounced(params)
      this.showCounter = true;
      if (count === 1) {
        this.showToast('cart.product_added')
      }
    }
  },
}
</script>

<style lang="scss">
.wrapper_buttons {
  width: 100%;
  margin-right: 10px;
}

.product-options__buy-btn__product {
  margin-top: 20px;
}
</style>
