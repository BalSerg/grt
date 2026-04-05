<template>
  <div
    class="cart-product__sum-wrapper"
    :class="{'cart-supplier__with-empty-supplier': isEmpty}"
  >
    <p v-if="product.priceWithDiscount" class="cart-product__without_discount">
      {{ product.price * product.count }} {{ currency }}
    </p>
    <p class="cart-product__total-sum">
      {{ localizedTotalPrice }} {{ currency }}
    </p>
    <!--button class="cart-product__sum-hint" type="button">
{{ $t("cart.how_to_decrease_the_price") }}
</button-->
  </div>
</template>

<script>
import debounce from "debounce";

const DEBOUNCE_TIME = 100;

export default {
  name: "CartProductPrice",
  props: {
    product: {
      type: Object
    },
    currency: {
      type: String,
    },
    isEmpty: {
      type: Boolean,
    },
  },
  computed: {
    localizedTotalPrice() {
      return this.product.total
        ? this.product.total.toLocaleString(this.$i18n.locale)
        : this.$t("price_demand");
    },
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.changeSizePrice);
    }
  },
  mounted() {
    this.changeSizePrice()
  },
  methods: {
    changeSizePrice: debounce(function () {
      const priceProductsWrapperList = document.querySelectorAll('.cart-product__sum-wrapper')
      const cartProductList = document.querySelectorAll('.cart-product__info-wrapper')
      this.setWidth(priceProductsWrapperList, 'auto')
      this.setWidth(cartProductList, 'auto')
      if (window.innerWidth < 1024) return
      const maxWidth = this.getWidth(priceProductsWrapperList, 'max')
      this.setWidth(priceProductsWrapperList, maxWidth)
      if (window.innerWidth < 1440) {
        const minWidth = this.getWidth(cartProductList, 'min')
        this.setWidth(cartProductList, minWidth)
      }
    }, DEBOUNCE_TIME),
    getWidth(nodeList, type) {
      let width;

      nodeList.forEach(currentNode => {
        if (!width) {
          width = currentNode.clientWidth
          return
        }
        if (type === 'max' && currentNode.clientWidth > width) width = currentNode.clientWidth
        if (type === 'min' && currentNode.clientWidth < width) width = currentNode.clientWidth
      })
      return width
    },
    setWidth(nodeList, width) {
      nodeList.forEach(currentNode => {
        currentNode.style.width = typeof width === 'number' ? `${width}px` : width
      })
    },
  },
}
</script>
