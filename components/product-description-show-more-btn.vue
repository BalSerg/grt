<template>
  <button
    class="product-description-show-more-btn"
    type="button"
    @click="toggle"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$emit('on-toggle-click');
    }
  }
}
</script>

<style lang="scss">
.product-description-show-more-btn {
  display: block;
  margin-top: 10px;
  padding: 0;
  padding-bottom: 3px;

  font-size: 13px;
  line-height: 1.4;
  color: $text-grey-2;

  background-color: transparent;
  border: none;
  border-bottom: 1px dashed $text-grey-2;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover,
  &:focus {
    color: $text-black;

    border-color: $text-black;

    transition: all 0.3s ease;
  }
}
</style>
