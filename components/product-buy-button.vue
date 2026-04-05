<template>
  <div>
    <button
      :class="inCatalog ? 'product-buy-button__catalog' : 'product-buy-button__product'"
      class="product-buy-button"
      type="button"
      @click="addToBasket"
      :disabled=disabled
    >
      {{ $t('product.to_cart') }}
    </button>
  </div>
</template>

<script>

export default {
  props: {
    inCatalog: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addToBasket() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss">
.product-buy-button__product {
  display: flex;
  min-height: 50px;

  font-size: 16px;
  line-height: 1.3;
  text-align: center;
  font-weight: 600;

  &:hover,
  &:focus {
    transition: all 0.3s ease;
  }
}

.product-buy-button__catalog {
  box-sizing: border-box;
  display: inline-flex;
  min-height: 32px;
  padding: 7px;

  font-size: 13px;
  line-height: 1.4;

  @media (min-width: $pad) {
    min-height: 36px;
    padding: 9px;
  }
}

.product-buy-button {
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #ffffff;
  background-color: $azure3;

  border-radius: 4px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: $azure4;
  }

  &[disabled] {
    filter: grayscale(1);
    cursor: default;

    &:hover {
      background-color: $azure3;
    }
  }
}

</style>
