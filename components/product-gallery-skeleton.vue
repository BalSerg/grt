<template>
  <div class="product-gallery-skeleton">
    <div class="skeleton-body"></div>
  </div>
</template>

<style lang="scss">
.product-gallery-skeleton {
  position: relative;

  --padding-size: 15px;
  box-sizing: border-box;
  width: calc(100% - (var(--padding-size) * 2));
  max-width: 785px;
  margin: 0 var(--padding-size);

  .skeleton-body {
    width: 100%;
    padding-top: 100%;

    background-color: $light-grey-ui;
    border-radius: 4px;
    overflow: hidden;
  }

  @media (min-width: $pad) {
    --padding-size: 0;
  }

  @media (min-width: $desktop-mid) {
    margin-left: 84px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -84px;

      width: 60px;
      height: 60px;

      background-color: $light-grey-ui;
      border-radius: 4px;
    }
  }

  @media (min-width: $desktop-large) {
    margin-left: 119px;

    &::before {
      left: -119px;

      width: 95px;
      height: 95px;
    }
  }
}
</style>
