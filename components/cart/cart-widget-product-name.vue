<template>
  <nuxt-link
    v-if="semanticId"
    class="cart-widget-product__name"
    :to="productLink"
  >
    {{ productName }}
  </nuxt-link>
  <span v-else class="cart-widget-product__name">
    {{ productName }}
  </span>
</template>

<script>
export default {
  props: {
    semanticId: {
      type: String,
      default: '',
      required: true
    },
    productName: {
      type: String,
      default: ''
    }
  },
  computed: {
    productLink() {
      return this.semanticId ? this.localePath(`/products/${this.semanticId}`) : '';
    }
  }
}
</script>

<style lang="scss">
.cart-widget-product__name {
  grid-area: name;

  position: relative;
  display: block;
  margin: 0;
  max-height: 55px;

  font-size: 13px;
  font-weight: 400;
  text-decoration: none;
  color: $text-black;

  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 37px;
    left: 0;
    right: 0;

    width: 100%;
    height: 18px;

    background: linear-gradient(to top, #ffffff 0, transparent 100%);
  }

  &:hover {
    color: $grt-blue;
  }

  @media screen and (min-width: $desktop-mid) {
    max-width: 200px;
  }
}
</style>
