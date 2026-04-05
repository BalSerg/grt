<template>
  <h2 class="cart-widget__header">
    {{ $t('header.user_cart.title') }}
    <span class="cart-widget__header-count">
      {{ $tc('goods', productsCount) }}
    </span>
  </h2>
</template>

<script>
export default {
  props: {
    productsCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.cart-widget__header {
  margin: 0;
  margin-bottom: 20px;

  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
  color: $text-black;
}

.cart-widget__header-count {
  margin-left: 10px;

  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: $text-grey;
}
</style>
