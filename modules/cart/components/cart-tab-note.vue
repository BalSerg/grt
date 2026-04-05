<template functional>
  <div class="cart-note">
    <div class="cart-note__container">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
.cart-note {
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px 16px;

  @media (min-width: $desktop-mid) {
    padding: 8px 32px;
  }
}

.cart-note__container {
  padding: 12px 12px 12px 48px;

  border: 1px solid $mid-grey-ui;
  border-radius: 8px;

  background-image: url("/nimages/icons/common/exclamation.svg");
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: 12px 12px;

  @media (min-width: $pad) {
    margin-right: 256px;
  }
}
</style>
