<template>
  <div class="cart-modal">
    <div
      v-for="{supplierName, supplierId} in notValidSuppliers"
      :key="supplierId"
      class="cart-modal__title"
    >
      {{ $tc('cart.parcels_from') }} {{ supplierName }} {{ $tc('cart.not_available') }}
    </div>
    <button class="grt-btn" type="button" @click="nextStep('getPosition')">
      {{ $t('cart.stay_in_cart') }}
    </button>
    <button class="grt-btn grt-btn--filled" type="button" @click="nextStep('nextStep')">
      {{ $t('cart.to_proceed_with_order') }}
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {ModalBus} from "~/event-bus/modal-bus";
import CartSummary from "~/modules/cart/components/cart-summary";
import {OrderMethodsBus} from "~/event-bus/order-bus";

export default {
  name: "cart-modal",
  computed: {
    ...mapState('cart', ['notValidSuppliers']),
  },
  methods: {
    nextStep(step) {
      ModalBus.$emit('close');
      OrderMethodsBus.$emit(step, {
        component: CartSummary,
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-modal {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 0 10px;
  max-width: 320px;
  max-height: 320px;
  background: $white;

  &__title {
    font-weight: 600;
    font-size: 17px;
    color: $text-black;
  }

  .grt-btn {
    margin-top: 10px;
  }
}
</style>
