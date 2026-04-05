<template>
  <div class="product-chip">
    Скидка {{ discountPercent }}%
  </div>
</template>

<script>
export default {
  props: {
    mainPrice: {
      type: Number,
      default: 0
    },
    retailPriceWithDiscount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    discountPercent() {
      if (this.retailPriceWithDiscount) {
        const price = Number(this.mainPrice);
        const discountedPrice = Number(this.retailPriceWithDiscount);

        return Math.floor((price - discountedPrice) / price * 100);
      }
    },
  }
}
</script>

<style lang="scss">
.product-chip {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  font-size: 10px;
  line-height: 1.3;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;

  background-color: $fuchsia;
  border-radius: 3px;
}
</style>
