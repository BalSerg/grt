<template functional>
  <div class="cart-product-features">
    <div v-for="({propertyName, value}, ind) of props.features"
         :key="ind"
         class="cart-product-features__item"
    >
      <span class="cart-product-features__name">{{ propertyName }}</span>
      <span class="cart-product-features__value">{{ value }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.cart-product-features {
  position: relative;

  margin-top: 16px;
  margin-right: 16px;

  @media (min-width: $pad) {
    display: inline-flex;
    flex-wrap: wrap;
    margin-top: 8px;
    margin-right: 0;
    margin-left: -12px;
  }
}

.cart-product-features__name,
.cart-product-features__value {
  display: inline;
  margin: 0;

  font-size: 14px;
  line-height: 22px;
}

.cart-product-features__name {
  color: #7e7e7e;
}

.cart-product-features__value {
  color: $text-black;
}

.cart-product-features__item {
  @media (min-width: $pad) {
    display: inline-block;
    vertical-align: middle;
    margin-left: 12px;
  }
}
</style>
