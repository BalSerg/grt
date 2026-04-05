<template>
  <div class="cart-widget-product__photo">
    <img
      v-if="photo.length > 0"
      class="cart-widget-product__photo-img"
      :src="photo[0]"
    />
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.cart-widget-product__photo {
  grid-area: photo;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 104px;
  height: 104px;

  background-color: #f6f6f6;
  border-radius: 3px;

  overflow: hidden;
}

.cart-widget-product__photo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
