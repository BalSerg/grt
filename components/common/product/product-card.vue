<template>
  <div class="product-card">
    <div class="product-card__body">
      <nuxt-link :to="localePath(product.link)">
        <div class="product-card__image-container">
          <LazyImg
            v-if="product.photo"
            :alt="product.name"
            :src="getProperPhoto(product.photo)"
            class="product-card__image"
          />
          <div v-else class="product-card__no-image"></div>
          <p v-if="product.discountPercent" class="product-card__sale-badge">
            -{{ product.discountPercent }}%
          </p>
        </div>

        <p class="product-card__price-wrapper">
          <span
            :class="{
              'product-card__price--new': product.oldPrice,
              'product-card__price--small': product.price === 0
            }"
            class="product-card__price"
          >
            {{ productPrice }}
            <span
              v-if="product.price > 0"
              class="product-card__price product-card__price--currency"
            >
              {{ productCurrency }}
            </span>
          </span>

          <span
            v-if="product.oldPrice"
            class="product-card__price product-card__price--old"
          >
            {{ product.oldPrice }}
            <span class="product-card__price product-card__price--currency">
              {{ productCurrency }}
            </span>
          </span>
        </p>

        <h3 class="product-card__title">
          <slot>{{ product.name }}</slot>
        </h3>
      </nuxt-link>

      <div class="product-card__controls">
        <button :class="{'grt-btn_productInCart': productInCart}" class="product-card__buy-grt-btn grt-btn grt-btn--filled grt-btn--adaptive"
                type="button"
                @click.stop="buyProduct"
        >
          {{ label }}
        </button>
        <favorites-button :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(product.id)"
                          class="product-card__favorite-btn"
                          @toggle="toggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex"
import {CdnImageSize, Currency} from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';
import AddToCartMixin from '@/mixins/add-to-cart-mx';

import LazyImg from '@/components/lazy-img';
import FavoritesButton from '@/components/favorites-button';
import PATH from '@/assets/js/const.path'

const QuickOrder = () => import('@/components/common/product/quick-order');

export default {
  components: {
    FavoritesButton,
    LazyImg
  },
  mixins: [
    AddToCartMixin,
    GetProperImageMX,
  ],
  props: {
    product: Object
  },
  computed: {
    ...mapState('cart', ['displayedCartTab']),
    ...mapGetters({
      isInCart: 'cart/isInCart',
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR'
    }),
    productPrice() {
      if (this.product.price > 0) {
        if (this.product.currency === Currency.RUB) {
          return parseInt(this.product.price.toFixed(0)).toLocaleString(this.$i18n.locale);
        }
        return this.product.price.toLocaleString(this.$i18n.locale);
      }
      return this.$t('price_demand');
    },
    productCurrency() {
      return this.product.currency === 'RUB' ?
        Currency[this.product.currency] :
        this.product.currency;
    },
    productFavorites() {
      return {
        isFavorite: this.product.isFavorite,
        id: this.product.id
      };
    },
    isAvailableThroughCart() {
      return this.product.b2c_button;
    },
    label() {
      return this.productInCart
        ? this.$t('product.in_the_cart')
        : this.$t('product.to_cart')
    },
    productInCart() {
      return this.isInCart(this.product.id)
    }
  },
  methods: {
    ...mapActions({
      POST_PRODUCT_TO_CART: 'cart/POST_PRODUCT_TO_CART',
      REMOVE_PRODUCTs: 'cart/REMOVE_PRODUCTs',
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT'
    }),
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.id})
    },
    getProperPhoto(img) {
      if (!img || !img.includes('http')) {
        return '/nimages/no_picture.png';
      }
      return this.$mx_getProperImage(img, "minipc-main");
    },
    buyProduct() {
      const toastOptions = {
        router: this.$router,
        action: {
          text: this.$t('go_to_cart'),
          push: this.localePath({
            path: PATH.CART,
            query: {grab: this.displayedCartTab}
          })
        }
      }

      if (!this.productInCart) {
        this.$toast.show(this.$t('cart.product_added'), toastOptions)
        this.POST_PRODUCT_TO_CART({id: this.product.id, count: 1})
      } else {
        this.$toast.show(this.$t('cart.product_removed'), toastOptions)
        this.REMOVE_PRODUCTs({type: 'productId', volume: this.product.id})
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.product-card {
  position: relative;

  display: flex;
  width: 100%;
  min-width: 120px;
  max-width: 224px;

  a {
    color: #404040;
    text-decoration: none;
  }

  .grt-btn--filled {
    @include grt-btn-filled($azure, $white, $azure2);
  }

  .product-card__body {
    .grt-btn--filled.grt-btn_productInCart {
      @include grt-btn-filled($grt-blue, $white, $grt-blue);
    }
  }

  &__favorite-icon {
    path:first-child {
      fill: $fuchsia;
    }
  }
}

.product-card__body {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #ffffff;
  border-radius: 6px;
}

.product-card:hover .product-card__body {
  @media (min-width: $desktop-mid) {
    position: absolute;
    top: -16px;
    left: -12px;
    right: -12px;
    z-index: 800;

    width: calc(100% + 24px);
    padding: 16px 12px;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
}

.product-card__image-container {
  position: relative;

  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  min-width: 120px;
  width: 100%;
  padding-bottom: 100%;

  border-radius: 3px;
  background-color: #ffffff;

  @media (min-width: 768px) {
    margin-bottom: 9px;
  }
}

.product-card__no-image {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}

.product-card__sale-badge {
  position: absolute;
  bottom: 12px;
  left: -4px;
  z-index: 2;

  padding: 1px 3px;

  font-weight: 600;
  font-size: 11px;
  line-height: 1.3;
  color: #ffffff;

  background-color: $fuchsia;
  border-radius: 3px;

  @media (min-width: 768px) {
    padding: 3px 7px;

    font-size: 15px;
  }
}

.product-card__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  border-radius: 3px;
  object-fit: contain;
}

.product-card__price-wrapper {
  @media (min-width: 768px) {
    min-height: 28px;
    margin-bottom: 6px;
  }
}

.product-card__price {
  font-size: 13px;
  font-weight: 600;
  color: $text-black;

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.product-card__price--currency {
  font-weight: 400;
  line-height: 1.4;
}

.product-card__price--new,
.product-card__price--new .product-card__price--currency {
  color: $fuchsia;
}

.product-card__price--old,
.product-card__price--old .product-card__price--currency {
  font-size: 12px;
  color: $text-grey;
  text-decoration: line-through;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

.product-card__price--small {
  font-size: 13px;

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 28px;
  }
}

.product-card__title {
  height: 33px;
  margin-bottom: 0;

  /* stylelint-disable */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* stylelint-enable  */
  overflow: hidden;

  font-size: 13px;
  line-height: 1.3;

  @media (min-width: 768px) {
    position: relative;

    height: 36px;
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    /* stylelint-enable  */

    font-size: 13px;
    line-height: 1.4;
  }
}

.product-card__controls {
  display: none;
}

.product-card:hover .product-card__controls {
  @media (min-width: $desktop-mid) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .product-card__buy-grt-btn {
      padding-left: 0;
      padding-right: 0;
      width: calc(100% - 32px - 5px);
      //32 размер сердечка, 5 - отступ от сердечка
    }
  }
}

.product-card__favorite-btn {
  margin-left: auto;
}
</style>
