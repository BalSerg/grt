<template>
  <section>
    <!-- Заголовки закладок Товары для оформления / Товары для заказа-->
    <CartTabHead v-if="!isNotVisibleGrabs" />

    <CartTabNote v-if="isCartChange || isOrder">
      <div v-if="isCartChange">{{ $t('notes.cart_change') }}</div>
      <div v-else-if="isOrder">{{ $t('notes.cart_order') }}</div>
      <div v-else></div>
      <!-- It mast be empty-->
    </CartTabNote>

    <CartTabPositions v-if="grubSupplierIds.length > 0"/>
  </section>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import CartTabHead from "~/modules/cart/components/cart-tab-head";
import CartTabNote from '@/modules/cart/components/cart-tab-note.vue'
import CartTabPositions from "~/modules/cart/components/cart-tab-positions";

export default {
  name: "CardContent",
  components: {
    CartTabHead,
    CartTabNote,
    CartTabPositions,
  },
  computed: {
    ...mapState('cart', ['grubSupplierIds', 'displayedCartTab', 'cartSet']),
    ...mapGetters({
      CHECK_cartForRegistration_DATA: 'cart/CHECK_cartForRegistration_DATA',
    }),
    isNotVisibleGrabs() {
      return this.cartSet.grabs.some(grab => grab.count === 0)
    },
    isOrder() {
      return this.displayedCartTab === 'order' && this.grubSupplierIds.length > 0
    },
    isCartChange() {
      return (
        this.grubSupplierIds.length > 0 &&
        this.CHECK_cartForRegistration_DATA({
          targetGroup: 'all',
          targetVolume: 'countIsAvailable',
          checkedField: 'isCountAvailable',
          checkedValue: false,
          result: true,
        })
      )
    },
  }
}
</script>
