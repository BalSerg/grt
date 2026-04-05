<template>
  <section v-if="!!CHECKOUT.parcels" class="checkout-packages">
    <CheckoutPackage
      v-for="parcel in CHECKOUT.parcels"
      :key="parcel.number"
      :currency="currency"
      :isChangeVisible="isChangeVisible"
      :parcel="parcel"
    />
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import CheckoutPackage from '@/modules/checkout/components/checkout-package';

export default {
  components: {
    CheckoutPackage
  },
  props: {
    currency: String,
    isChangeVisible: Boolean
},
  computed: {
    ...mapGetters({
      CHECKOUT: 'checkout/CHECKOUT'
    })
  },
}
</script>

<style lang="scss">
.checkout {
  &-packages {
    margin-top: 16px;
  }
}
</style>
