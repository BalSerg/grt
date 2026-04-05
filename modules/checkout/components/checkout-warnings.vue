<template>
  <section v-if="CHECKOUT.messages.length >= 1" class="checkout-warnings">
    <div
      v-for="warning in CHECKOUT.messages"
      :key="warning.key"
      class="checkout-warnings__item"
      :class="warning.type"
    >
      {{ $t(warning.textKey) }}
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      CHECKOUT: 'checkout/CHECKOUT'
    })
  }
};
</script>

<style lang="scss">
.checkout-warnings {
  max-width: 1440px;
  margin: 0 auto -8px;
  box-sizing: border-box;
  padding: 12px 0 0;
  color: $text-black;
  padding-right: 352px;
  --icon-color: #333333;

  @media screen and(max-width: $desktop-mid - 1) {
    padding: 12px 0;
    width: 100%;
  }

  @media screen and (max-width: $desktop-large) {
    width: 96%;
  }

  @media screen and (max-width: $desktop-mid - 1) {
    width: 100%;
  }

  &__item {
    padding: 13.5px 13.5px 13.5px 48px;
    background-color: $white;
    border-radius: 8px;
    border: 1px solid #e7e7e7;
    margin-bottom: 14px;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: "!";
      width: 21px;
      height: 21px;
      display: block;
      position: absolute;
      left: 14px;
      top: calc(50% - 10.5px);
      border: 2px solid var(--icon-color);
      color: var(--icon-color);
      text-align: center;
      user-select: none;
      font-weight: 600;
      font-size: 14px;
      line-height: 1.16;
      box-sizing: border-box;
      border-radius: 50%;
      margin-right: 7px;
      text-indent: 1px;
    }

    &.info {
      --icon-color: #007aff;
    }

    &.error {
      --icon-color: #fc3f71;
    }

    &.warning {
      --icon-color: #fcaa3f;
    }

    &.success {
      --icon-color: #03e273;
    }
  }
}
</style>
