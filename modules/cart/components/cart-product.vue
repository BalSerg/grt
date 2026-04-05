<template>
  <li class="cart-product">
    <div
      :class="{'cart-product__head-wrapper__with-deleted-product': isDeleted}"
      class="cart-product__head-wrapper"
    >
      <div class="cart-product__checkbox">
        <GrtCustomCheckbox_vModel :disabled="isEmpty || isDeleted"
                                  :get-function="getToSupplierSelect"
                                  :set-function="setToSupplierSelect"
                                  :value="product.productId"
                                  checkbox-to-left-top
        />
      </div>

      <template v-if="!isDeleted">
        <nuxt-link :to="localePath(`/products/${product.semanticId}/`)">
          <GrtImage :alt="product.productName"
                    :image="product.photo"
                    :is-empty="isEmpty || isDeleted"
          />
        </nuxt-link>

        <div
          :class="{'cart-supplier__with-empty-supplier': isEmpty}"
          class="cart-product__info-wrapper"
        >
          <template>
            <nuxt-link :to="localePath(`/products/${product.semanticId}/`)">
              <h4 class="cart-product__product-name">{{ product.productName }}</h4>
            </nuxt-link>
            <CartProductFeatures v-if="product.properties" :features="product.properties"/>
          </template>
        </div>
      </template>

      <h4 v-else class="cart-product__product-name cart-supplier__with-empty-supplier">
        {{ $t("cart.product") }} {{ product.productId }} {{ $t("cart.was_deleted") }}
      </h4>
    </div>

    <div class="cart-product__controls-wrapper">
      <DeleteButton class="cart-product__delete-btn" @onDelete="onDeleteProduct"/>
      <favorites-button
        v-if="!isDeleted"
        :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(product.productId)"
        class="product-card__favorite-btn"
        @toggle="toggleFavorite"
      />
    </div>

    <template v-if="!isDeleted">
      <CartProductCounter
        :currency="currency"
        :is-empty="isEmpty"
        :product="product"
        :status-product="statusProduct"
      />

      <CartProductPrice
        :currency="currency"
        :is-empty="isEmpty"
        :product="product"
      />
    </template>
  </li>
</template>

<script>
import * as PATH from "path";
import {mapActions, mapGetters, mapState} from "vuex";
import {Currency} from "assets/js/const";

import CartProductFeatures from "./cart-product-features";
import GrtCustomCheckbox_vModel from "@/components/common/grt-custom-checkbox_v-model"
import DeleteButton from "@/components/common/delete-button";
import FavoritesButton from "@/components/favorites-button";
import CartProductPrice from "~/components/cart/cart-product-price";
import GrtImage from "@/components/common/grt-image";
import CartProductCounter from "~/modules/cart/components/cart-product-counter";

export default {
  components: {
    GrtCustomCheckbox_vModel,
    DeleteButton,
    FavoritesButton,
    CartProductPrice,
    CartProductCounter,
    CartProductFeatures,
    GrtImage
  },
  props: {
    product: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapState('cart', ['cartForRegistration', 'productsCount']),
    ...mapGetters({
      GET_ITEM_FROM_cartForRegistration: "cart/GET_ITEM_FROM_cartForRegistration",
      CHECK_cartForRegistration_DATA: "cart/CHECK_cartForRegistration_DATA",
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR'
    }),
    isEmpty() {
      return this.GET_ITEM_FROM_cartForRegistration(this.product.productId).statusProduct === 'empty'
    },
    isDeleted() {
      return this.GET_ITEM_FROM_cartForRegistration(this.product.productId).statusProduct === 'deleted'
    },
    statusProduct() {
      return this.GET_ITEM_FROM_cartForRegistration(this.product.productId).statusProduct
    },
    currency() {
      return this.product?.price || this.product?.discountPrice ? Currency[this.product.currency] : '';
    },
  },
  methods: {
    ...mapActions({
      REMOVE_PRODUCTs: "cart/REMOVE_PRODUCTs",
      MAKE_ITEM_ALTERATION: "cart/MAKE_ITEM_ALTERATION",
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT',
      FETCH_CART: 'cart/FETCH_CART'
    }),
    async onDeleteProduct() {
      const {productId, grabType} = this.product
      await this.REMOVE_PRODUCTs({
        type: 'productId',
        volume: productId,
        grabTyp: grabType,
      })

      if (this.cartForRegistration.length === 0 && this.productsCount !== 0) {
        const grab = this.$route.query.grab === 'order' ? 'buy' : 'order'
        await this.changeTab(grab)
      }
    },
    changeTab(grab) {
      this.$router.replace(this.localePath({
        path: PATH.CART,
        query: {grab}
      }))
    },
    getToSupplierSelect() {
      return [this.CHECK_cartForRegistration_DATA({
        targetGroup: 'productId',
        targetVolume: this.product.productId,
        checkedField: 'checked',
        checkedValue: true,
        result: this.product.productId
      })]
    },
    setToSupplierSelect(newVal) {          // newVal = ['id'] or []
      this.MAKE_ITEM_ALTERATION({
        target: {type: 'productId', volume: this.product.productId},
        changedField: 'checked',
        newVal: newVal.length > 0
      })
    },
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.productId})
    },
  },
}
</script>

<style lang="scss">
.cart-product {
  display: grid;
  grid-template-columns: auto auto 1fr;
  row-gap: 16px;
  grid-template-areas:
    "head head head"
    "controls counter sum";
  padding: 16px 0;

  border-bottom: 1px solid #e7e7e7;

  @media (min-width: $pad) {
    grid-template-columns: 111px 1fr 1fr 1fr;
    grid-template-areas:
      "head head head head"
      ". controls counter sum";
  }

  @media (min-width: $desktop-mid) {
    grid-template-columns: 111px 1fr auto auto;
    grid-template-areas:
      "head head counter sum"
      ". controls . .";
    display: flex;
  }
}

.cart-product:last-child {
  border: none;
}

.cart-product__head-wrapper {
  grid-area: head;

  display: flex;
  align-items: flex-start;

  @media (min-width: $desktop-mid) {
    margin-right: auto;
  }

  .cart-product__checkbox {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
}

.cart-product__head-wrapper__with-deleted-product {
  align-items: center;
}

.cart-product__controls-wrapper {
  grid-area: controls;
  display: flex;
  align-items: center;
  height: 40px;

  .favorites-button {
    margin: 0 32px 0 24px;
    //display: initial;
    height: auto;
  }
}

.cart-product__sum-wrapper {
  grid-area: sum;
  display: flex;
  flex-direction: column;
  position: relative;
}

.cart-product__product-name {
  margin: 0;

  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  color: $text-black;
}

.cart-product__info-wrapper {
  margin: 0 16px;
}

.cart-product__favorite-btn,
.cart-product__favorite-btn .favorites-button__icon,
.cart-product__favorite-btn .favorites-button__icon svg {
  width: 20px;
  height: 18px;
}

.cart-product__favorite-btn {
  grid-area: favs;
  margin-left: 15px;
  margin-right: 24px;
  width: 24px;
  height: 24px;
}

.cart-product__total-sum {
  grid-area: sum;

  display: inline-flex;
  align-items: center;
  margin-left: auto;
  min-height: 40px;

  font-weight: 600;
  font-size: 18px;
  line-height: 1.4;

  text-align: right;

  color: $text-black;
  white-space: nowrap;
}

.cart-product__counter {
  height: 40px;
  padding: 0;
}

.cart-product__without_discount {
  position: absolute;
  top: -10%;
  right: 0;
  font-size: 12px;
  text-decoration: line-through;

  grid-area: sum;

  display: inline-flex;
  margin-left: auto;

  text-align: right;

  color: $text-grey;
  white-space: nowrap;
}

.cart-product__counter-hint,
.cart-product__sum-hint {
  margin-top: 3px;

  font-size: 10px;
  line-height: 1.4;
  color: $text-grey;
}

.cart-product__counter-hint {
  display: inline-flex;
  // grid-area: counterhint;
  text-align: center;
}

.cart-product__sum-hint {
  // grid-area: sumhint;

  text-align: right;
}

.cart-product__caution {
  font-size: 10px;
  line-height: 140%;
  color: $coral;

  display: flex;
  align-items: center;
  text-align: center;
}
</style>
