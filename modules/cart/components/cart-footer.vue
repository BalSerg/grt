<template>
  <div class="cart-footer">
    <div class="cart-footer__info">
      <p class="cart-footer__info__price">{{ getTotalCost }} {{ Currency[currency] }}</p>
      <p class="cart-footer__info__count">
        {{ $t("cart.total_products") }}
        {{ $tc('goods', getCountProducts) }}
      </p>
    </div>
    <cart-buy-button
      v-if="!isCheckout"
      :is-agreement="isAgreement"
      :is-mobile="true"
      class="cart-footer__button"
      @changeAgreementClear="$emit('changeAgreementClear')"
      @changePosition="$emit('changePosition')"
    />
    <checkout-summary-button v-else class="cart-footer__button"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {Currency} from "assets/js/const";
import CartBuyButton from "~/modules/cart/components/cart-buy-button";
import CheckoutSummaryButton from "~/modules/cart/components/checkout-summary-button";

export default {
  name: "CartFooter",
  components: {
    CheckoutSummaryButton,
    CartBuyButton
  },
  props: {
    isAgreement: Array,
    isCheckout: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('tech', ['currency']),
    ...mapState('cart', ['cartSet']),
    getTotalCost() {
      const totalCost = this.cartSet.suppliers.reduce((acc, curr) => acc + curr.total, 0)
      return totalCost
    },
    getCountProducts() {
      const totalCount = this.cartSet.suppliers.reduce((acc, curr) => acc + curr.count, 0)
      return totalCount
    },
    Currency() {
      return Currency
    },
  }
}
</script>

<style lang="scss">
.cart-footer {
  background-color: $white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  display: none;
  width: 100%;
  right: 1px;

  @media (max-width: 767px) {
    opacity: 1;
    position: fixed;
    display: flex;
    bottom: 52px;
  }

  &__info {
    width: 40%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0 10px;

    &__price {
      font-size: 14px;
      font-weight: 600;
      color: $text-black;
    }

    &__count {
      font-size: 10px;
    }
  }

  &__button {
    width: 60%;
    margin: 0 19px 0 0;
  }
}
</style>
