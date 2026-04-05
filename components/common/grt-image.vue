<template functional>
  <div
    class="cart-products-item__image grt-image grt-image--small"
    :class="{'cart-supplier__with-empty-supplier': props.isEmpty}"
  >
    <img class="grt-image__media" :src="props.image" :alt="props.alt">
  </div>
</template>

<style lang="scss">
.grt-image {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 4px;
  background-color: #f6f6f6;
  overflow: hidden;
}

.grt-image--small {
  width: 58px;
  height: 58px;
}

.grt-image__media {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  object-fit: contain;
}
</style>
