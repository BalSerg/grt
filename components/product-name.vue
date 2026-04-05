<template>
  <h1 class="product-page__name product-name">
    {{ productName }}
  </h1>
</template>

<script>
export default {
  props: {
    productName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.product-name {
  position: relative;

  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: $text-black;

  @media (min-width: $pad) {
    font-size: 22px;
  }

  @media (min-width: $desktop-large) {
    font-size: 28px;
  }
}
</style>
