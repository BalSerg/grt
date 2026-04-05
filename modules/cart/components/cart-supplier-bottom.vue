<template>
  <section
    :class="{'cart-supplier__with-empty-supplier': isEmpty}"
    class="cart-supplier__delivery"
  >
    <div class="cart-supplier__delivery-wrapper">
      <div class="cart-supplier__delivery-address-and-amount">
        <!--        <div>-->
        <!--          <div class="cart-supplier__info">-->
        <!--            <span class="cart-supplier__supplier_title">Продавец:-->
        <!--              <span class="cart-supplier__supplier_params">{{ supplierName }}</span>-->
        <!--            </span>-->
        <!--            <span class="cart-supplier__supplier_title cart-supplier__address">-->
        <!--              <img src="~/static/nimages/address.svg"/>-->
        <!--              <span>Доставка</span> <span class="cart-supplier__supplier_params">г. Москва</span>-->
        <!--              <button class="cart-supplier__supplier-bottom">изменить</button>-->
        <!--              <GrtTooltip class="cart-supplier__delivery-tooltip" :auto-left="false">-->
        <!--                    Text.-->
        <!--              </GrtTooltip>-->
        <!--            </span>-->
        <!--            <span class="cart-supplier__supplier_title">Стоимость доставки:-->
        <!--              <span class="cart-supplier__supplier_params">от 3000р</span>-->
        <!--            </span>-->
        <!--          </div>-->
        <div v-if="isNotAvailable" class="cart-supplier__info cart-supplier__additional">
          <img src="~/static/nimages/exclamation-circle.png"/>
          <span class="cart-supplier__additional_text">
          {{ $tc('product.min_amount') }}
            <span class="cart-supplier__supplier_params">
              {{ minSum }} {{ normalizedCurrency }}
            </span>
          {{ $tc('cart.add_products') }}
            <span class="cart-supplier__supplier_params">
              {{ sum }} {{ normalizedCurrency }}
            </span>
          <nuxt-link :to="localePath(`/suppliers/${supplier.supplierSemanticId}`)"
                     class="cart-supplier__supplier-bottom"
          >
            {{ $tc('cart.go_to_catalog') }}
          </nuxt-link>
          </span>
        </div>
        <div class="cart-supplier__delivery-sum">
          {{ localizedTotalPrice }} {{ normalizedCurrency }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import {Currency} from "~/assets/js/const";
import GrtTooltip from "~/components/common/grt-tooltip";

export default {
  name: "CartSupplierBottom",
  components: {
    GrtTooltip
  },
  props: {
    supplier: {
      type: Object
    },
    isEmpty: {
      type: Boolean,
    },
    isNotAvailable: {
      type: Boolean,
    },
    addingSum: {
      type: Number
    },
    minSum: {
      type: Number
    }
  },
  data() {
    return {
      supplierName: '',
    }
  },
  computed: {
    ...mapGetters({CHECK_IS_AVAILABLE_SUPPLIER: 'cart/CHECK_IS_AVAILABLE_SUPPLIER'}),
    normalizedCurrency() {
      return this.supplier.discount || this.supplier.total ? Currency[this.supplier.currency] : '';
    },
    sum() {
      if (Number.isInteger(this.addingSum)) return this.addingSum

      const num = this.supplier.currency === 'RUB' ? 0 : 2
      return this.addingSum.toFixed(num)
    },
    localizedTotalPrice() {
      return this.supplier.total
        ? this.supplier.total.toLocaleString(this.$i18n.locale)
        : this.$t("price_demand")
    },
  },
  mounted() {
    this.supplierName = this.supplier.supplierName?.length > 22 ? `${this.supplier.supplierName.substring(0, 23)}...` : this.supplier.supplierName;
  }
}
</script>

<style lang="scss" scoped>
.cart-supplier__supplier {
  font-size: 14px;
  color: $text-grey-2;
}

.cart-supplier__supplier_title,
.cart-supplier__additional {
  padding-left: 15px;
}

.cart-supplier__address {
  align-items: flex-start;
  display: flex;

  span {
    padding-left: 5px;
  }
}

.cart-supplier__supplier_params {
  color: $text-black;
  font-weight: 600;
}

.cart-supplier__supplier-bottom {
  color: #2f80ed;
  cursor: pointer;
  padding-left: 5px;
}

.cart-supplier__delivery-address-and-amount,
.cart-supplier__info {
  display: flex;
}

.cart-supplier__info {
  align-items: center;
}

.cart-supplier__additional_text {
  padding-left: 5px;
  font-size: 14px;
}

.cart-supplier__additional_text__sum {
  font-weight: 700;
}
</style>
