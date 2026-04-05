<template>
  <div class="cart-supplier">
    <div
      :class="{
      'cart-supplier__not-available': isNotAvailable,
      'cart-supplier__not-available-highlight': isRed
    }"
      class="cart-supplier__body"
    >
      <!--      header for one this supplier set-->
      <GrtCustomCheckbox_vModel :disabled="isEmpty"
                                :get-function="getToSupplierSelect"
                                :set-function="setToSupplierSelect"
                                :value="supplier.supplierId"
                                class="cart-supplier__head"
      >
        <h3
          :class="{'cart-supplier__with-empty-supplier': isEmpty}"
          class="cart-supplier__title"
        >{{ supplier.supplierName }}</h3>
      </GrtCustomCheckbox_vModel>

      <!--      products at this single supplier-->
      <ul class="cart-supplier__list">
        <CartProduct v-for="product in GET_SUPPLIER_PRODUCTs(supplier.supplierId)"
                     :key="product.id"
                     :is-empty="isEmpty"
                     :product="product"
        />
      </ul>

      <cartSupplierBottom
        v-show="showDeliveryPart"
        :adding-sum="addingSum"
        :is-not-available="isNotAvailable"
        :min-sum="minSum"
        :supplier="supplier"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex"
import {GmapBus} from "@/modules/cart/event-bus/gmap-bus"

import cartSupplierBottom from "~/modules/cart/components/cart-supplier-bottom";
import CartProduct from "@/modules/cart/components/cart-product.vue"
import GrtCustomCheckbox_vModel from "@/components/common/grt-custom-checkbox_v-model"

export default {
  components: {
    CartProduct,
    GrtCustomCheckbox_vModel,
    cartSupplierBottom,
  },
  props: {
    supplier: {
      type: Object,
    },
    isChange: {
      type: Boolean
    },
    isLast: {
      type: Boolean
    },
    idx: {
      type: Number
    }
  },
  data() {
    return {
      address: "Москва",
      showDeliveryPart: true,
      isRed: false,
    };
  },
  watch: {
    'supplier.count'(val) {
      if (val === 0 || !this.isNotAvailable) {
        const supplier = document.querySelectorAll('.cart-supplier')[this.idx]
        if (supplier.querySelector('.cart-supplier__not-available')) this.isRed = false
      }
    },
    isChange(val) {
      if (!val) return
      if (this.isNotAvailable) {
        const suppliers = document.querySelectorAll('.cart-supplier__not-available')
        let top = 0
        suppliers.forEach(supplier => {
          this.isRed = true
          if (this.isLast && supplier.offsetTop > top) top = supplier.offsetTop
        })
        if (this.isLast) {
          window.scrollTo({top, behavior: 'smooth'})
          this.$emit('changePosition')
        }
      }
    }
  },
  computed: {
    ...mapState('cart', ['cartForRegistration']),
    ...mapGetters({
      GET_SUPPLIER_PRODUCTs: "cart/GET_SUPPLIER_PRODUCTs",
      CHECK_cartForRegistration_DATA: "cart/CHECK_cartForRegistration_DATA",
      CHECK_IS_AVAILABLE_SUPPLIER: "cart/CHECK_IS_AVAILABLE_SUPPLIER",
    }),
    isNotAvailable() {
      return this.minSum && this.minSum > this.supplier.total
    },
    minSum() {
      return this.CHECK_IS_AVAILABLE_SUPPLIER(this.supplier.supplierId)?.minAmountForOrder
    },
    isEmpty() {
      return this.cartForRegistration.some((product) => (product.statusProduct === 'empty' || product.statusProduct === 'deleted') && product.supplierId === this.supplier.supplierId)
    },
    addingSum() {
      return this.minSum - this.supplier.total
    },
  },
  methods: {
    ...mapActions({
      MAKE_ITEM_ALTERATION: "cart/MAKE_ITEM_ALTERATION"
    }),
    getToSupplierSelect() {
      const checkCommonCheckbox = this.CHECK_cartForRegistration_DATA({
        targetGroup: 'supplierId',
        targetVolume: this.supplier.supplierId,
        checkedField: 'checked',
        checkedValue: false,
        result: this.supplier.supplierId,
        inverseResult: true
      })
      this.showDeliveryPart = this.CHECK_cartForRegistration_DATA({
        targetGroup: 'supplierId',
        targetVolume: this.supplier.supplierId,
        checkedField: 'checked',
        checkedValue: true,
        result: true
      })
      return [checkCommonCheckbox]
    },
    setToSupplierSelect(newVal) {          // newVal = ['supplierId'] or []
      this.MAKE_ITEM_ALTERATION({
        target: {type: 'supplierId', volume: this.supplier.supplierId},
        changedField: 'checked',
        newVal: newVal.length > 0
      })
    },
  },
  mounted() {
    GmapBus.$on("select-address", address => {
      this.address = address;
    });
  },
  beforeDestroy() {
    GmapBus.$off("select-address");
  },
}
</script>

<style lang="scss">
.cart-supplier {
  padding: 8px 0;
}

.cart-supplier__list {
  list-style: none;
  margin: 0;
  padding: 0 15px;
}

.cart-supplier__body {
  box-sizing: border-box;

  border: 1px solid $mid-grey-ui;
  border-radius: 12px;
}

.cart-supplier__not-available-highlight {
  border-color: $coral;
}

.cart-supplier__head {
  padding: 16px 15px;
  width: auto;

  border-bottom: 1px solid $mid-grey-ui;
}

.cart-supplier__title {
  font-size: 18px;
  line-height: 1.4;
  font-weight: 700;
  color: $text-black;
}

.cart-supplier__delivery {
  padding: 16px 0;

  //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='black' d='M23.05 5.3L12.15.03a.35.35 0 00-.3 0L.95 5.3a.35.35 0 00-.2.31V18.4c0 .13.08.26.2.31l10.9 5.27a.35.35 0 00.3 0l10.9-5.27c.12-.05.2-.18.2-.31V5.6a.35.35 0 00-.2-.31zM12 .74l10.09 4.87-2.93 1.41A.35.35 0 0019.1 7L9.08 2.15 12 .75zm-3.7 1.8l10.06 4.87-2.06 1L6.23 3.54l2.06-1zm10.3 5.54v3.68l-1.93.93V9l1.93-.93zm3.95 10.09l-10.2 4.92v-12l2.43-1.17a.35.35 0 00-.3-.63L12 10.49l-.97-.48a.35.35 0 10-.31.63l.93.45v12l-10.2-4.92v-12l7.77 3.75a.35.35 0 00.47-.16.35.35 0 00-.17-.47L1.92 5.6 5.4 3.93l10.56 5.1h.01v4.22a.35.35 0 00.5.32l2.63-1.27c.13-.06.2-.19.2-.32V7.74l3.25-1.57v12z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: 16px 16px;

  border-top: 1px solid $mid-grey-ui;
}

.cart-supplier__delivery-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px 0 0;
}

.cart-supplier__delivery-address-and-amount,
.cart-supplier__delivery-address-and-tooltip {
  display: flex;
  flex-flow: nowrap;
  width: 100%;
}

.cart-supplier__delivery-address-and-amount {
  align-items: baseline;
}

.cart-supplier__city {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.cart-supplier__button-and-tooltip {
  position: relative;

  margin: 0 0 0 10px;
  padding: 0 30px 0 0;
  display: flex;

  > button {
    text-align: left;
  }
}

.cart-product__counter-wrapper_empty {
  .cart-supplier__with-empty-supplier {
    margin-top: 10px;
  }
}

.cart-supplier__delivery-sum {
  margin-left: auto;

  color: $text-black;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;

  white-space: nowrap;

  @media (min-width: $desktop-mid) {
    order: 1;
  }
}

.cart-supplier__delivery-tip {
  flex-shrink: 0;
  width: 100%;

  span {
    color: $text-black;
  }

  @media (min-width: $desktop-mid) {
    width: auto;
  }
}

.cart-supplier__with-empty-supplier {
  opacity: 0.3;
}

.cart-supplier__delivery-btn {
  color: $grt-blue;
}
</style>
