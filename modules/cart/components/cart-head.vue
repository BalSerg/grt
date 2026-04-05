<template>
  <div class="cart-head">
    <button
            class="cart-head__back-btn"
            @click="onRedirect()"></button>
    <h1 class="cart-head__header">
      <slot/>
      <span class="cart-head__header-counter">({{ count }})</span>
    </h1>
  </div>
</template>

<script>

export default {
  props: {
    count: {
      type: Number
    }
  },
  methods: {
    onRedirect() {
      if (parent.$nuxt.context.from) {
        this.$router.go(-1);
      } else {
        this.$router.push(this.localePath('/'));
      }
    }
  }
}
</script>

<style lang="scss">
.cart-head {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px 16px;

  @media (min-width: $desktop-mid) {
    padding: 8px 32px;
  }
}

.cart-head__back-btn {
  display: block;
  width: 24px;
  height: 24px;

  background-color: transparent;
  background-image: url("/nimages/icons/arrow-back.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}

.cart-head__header {
  margin-left: 16px;

  font-size: 28px;
  line-height: 1.4;
  font-weight: 700;
  color: $text-black;
}

.cart-head__header-counter {
  font-weight: 400;
}
</style>
