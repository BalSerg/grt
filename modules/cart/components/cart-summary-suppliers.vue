<template>
  <div>
    <h3
      :class="{'cart-company-summary__title__not-total-order': notValidSupplier}"
      class="cart-company-summary__title"
    >
      {{ supplier.supplierName }}
    </h3>
    <dl v-if="!notValidSupplier" class="cart-company-summary__list">
      <dt class="cart-company-summary__list-key">
        {{ $t("cart.products") }}
      </dt>
      <dd class="cart-company-summary__list-value">
        {{ supplier.count }} {{ $t("cart.thing") }}
      </dd>
      <template v-if="discount">
        <dt class="cart-company-summary__list-key">{{ $t("checkout.discount") }}</dt>
        <dd
          class="cart-company-summary__list-value cart-company-summary__list-value__discount"
        >
          {{ discount }} {{ Currency[currency] }}
        </dd>
      </template>
      <dt class="cart-company-summary__list-key">
        <div class="cart-company-summary__list-key__title">
          <p>{{ $t("cart.total") }}</p>
          <GrtTooltip :auto-left="false">
            {{ $t("cart.without_delivery") }}
          </GrtTooltip>
        </div>
      </dt>
      <dd class="cart-company-summary__list-value">{{ supplier.total }}
        {{ Currency[currency] }}
      </dd>
    </dl>
    <div v-else class="cart-company-summary__list cart-company-summary__list__not-total-order">
      <div class="cart-company-summary__list__not-total-order__warning">
        <img src="~/static/nimages/exclamation-circle.png"/>
        {{ $tc("cart.for_delivery", sum) }}
        {{ Currency[supplier.currency] }}
      </div>
      <nuxt-link :to="localePath(`/suppliers/${notValidSupplier.supplierSemanticId}`)"
                 class="cart-company-summary__list__not-total-order__button">
        {{ $tc('cart.go_to_catalog') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {Currency} from "assets/js/const";
import {mapGetters, mapState} from "vuex";
import GrtTooltip from "~/components/common/grt-tooltip";

export default {
  name: "CartSummarySuppliers",
  components: {
    GrtTooltip,
  },
  props: {
    supplier: {
      type: Object,
    }
  },
  computed: {
    ...mapState('cart', ['notValidSuppliers']),
    ...mapState('tech', ['currency']),
    ...mapGetters({GET_SUPPLIER_PRODUCTs: 'cart/GET_SUPPLIER_PRODUCTs'}),
    sum() {
      const sum = this.notValidSupplier.minAmountForOrder - this.notValidSupplier.total
      if (Number.isInteger(sum)) return sum
      const num = this.supplier.currency === 'RUB' ? 0 : 2
      return sum.toFixed(num)
    },
    Currency() {
      return Currency
    },
    notValidSupplier() {
      return this.notValidSuppliers.find(({supplierId}) => supplierId === this.supplier.supplierId)
    },
    discount() {
      const products = this.GET_SUPPLIER_PRODUCTs(this.supplier.supplierId)
      let discount = 0
      products.forEach(({price, priceWithDiscount, count}) => {
        if (priceWithDiscount) discount += priceWithDiscount * count
      })
      return discount
    }
  }
}
</script>

<style lang="scss">
.cart-company-summary__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  font-size: 14px;
}

.cart-company-summary__list-key,
.cart-company-summary__list-value {
  box-sizing: border-box;
  width: 50%;
  flex-grow: 0;
  flex-shrink: 0;
  padding-top: 2px;
  padding-bottom: 2px;

  font-size: 14px;
  line-height: 1.4;
}

.cart-company-summary__title {
  margin-bottom: 4px;

  font-weight: 600;
  font-size: 18px;
  line-height: 1.4;
  color: $text-black;
}

.cart-company-summary__list-key {
  padding-right: 4px;

  text-overflow: ellipsis;
  color: $text-grey-2;
}

.cart-company-summary__list-value {
  margin: 0;
  padding-left: 4px;

  text-align: right;
  color: $text-black;
}

.cart-company-summary__list-value__discount {
  color: $coral;
}

.cart-company-summary__title__not-total-order {
  color: $text-grey-2;
}

.cart-company-summary__list__not-total-order {
  &__warning {
    color: $text-black;
    display: flex;
    align-items: baseline;

    img {
      margin-right: 5px;
    }
  }

  &__button {
    margin-left: 20px;
    margin-top: 5px;
  }
}
</style>
