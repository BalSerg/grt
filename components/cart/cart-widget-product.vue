<template>
  <div class="cart-widget-product">

    <CartWidgetProductPhoto
      :photo="product.photo"
    />

    <CartWidgetProductName
      :semantic-id="product.semanticId"
      :product-name="product.productName"
    />

    <InputCounter
      v-model="productCount"
      class="cart-widget-product__count"
      :max="product.available"
      :has-label="false"
    />

    <CartWidgetProductPrice
      class="cart-widget-product__price"
      :price="product.price"
      :price-with-discount="product.retailPriceWithDiscount"
      :currency="product.currency"
    />

    <div class="cart-widget-product__controls">
      <favorites-button :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(product.id)"
                        class="product-card__favorite-btn"
                        @toggle="toggleFavorite"
      />
      <DeleteButton/>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import CartWidgetProductName from './cart-widget-product-name';
import CartWidgetProductPhoto from './cart-widget-product-photo';
import CartWidgetProductPrice from './cart-widget-product-price';
import DeleteButton from '@/components/common/delete-button';
import FavoritesButton from '@/components/favorites-button';
import InputCounter from '@/components/common/input-number-counter';

export default {
  components: {
    DeleteButton,
    FavoritesButton,
    InputCounter,
    CartWidgetProductName,
    CartWidgetProductPhoto,
    CartWidgetProductPrice,
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      cart: 'userData/cart',
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR'
    }),
    productFavorites() {
      return {
        isFavorite: this.product.isFavorite,
        id: this.product.id
      };
    }
  },
  data() {
    return {
      productCount: 0
    }
  },
  methods: {
    ...mapActions({
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT'
    }),
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.id})
    },
  },
  mounted() {
    const productInCart = this.cart
      .find((item) => Number(item.id) === this.product.id);

    this.productCount = productInCart ? Number(productInCart.count) : 0;
  }
}
</script>

<style lang="scss">
.cart-widget-product {
  display: grid;
  align-items: start;
  grid-auto-columns: auto 1fr auto;
  column-gap: 10px;
  grid-template-areas:
    "photo name name"
    "photo price price"
    "photo count controls";

  @media screen and (min-width: $desktop-mid) {
    align-items: start;
    grid-template-areas:
      "photo name price"
      "photo count price"
      "photo count controls";
  }
}

.cart-widget-product__count {
  grid-area: count;

  &.grt-number-input {
    padding: 0;
  }

  .grt-number-input__wrapper {
    background-color: transparent;
  }

  .grt-number-input__input {
    background-color: transparent;
    border: none;
    outline: none;
  }

  .grt-number-input__button {
    width: 24px;
    height: 24px;

    border: 1px solid #f4f4f4;
  }

  @media screen and (min-width: $desktop-mid) {
    &.grt-number-input {
      padding: 5px 0;
    }
  }
}

.cart-widget-product__price {
  grid-area: price;
}

.cart-widget-product__favs-btn {
  width: 24px;
  height: 24px;
  margin-right: 6px;

  .favorites-button__icon {
    width: 24px;
    height: 24px;

    svg {
      width: 22px;
      height: 18px;
    }
  }
}

.cart-widget-product__controls {
  grid-area: controls;
}

.product-card__favorite-btn {
  margin-left: auto;
}
</style>
