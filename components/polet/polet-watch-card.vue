<template>
  <div class="polet-catalog_item">
    <div class="polet-catalog_inner">
      <nuxt-link :to="localePath(getProductLink)">
        <LazyImg
          :alt="product.productShortName"
          :src="photo"
          class="polet-product-image "
        />
      </nuxt-link>
      <div class="polet-product-info">
        <div class="product-title">
          <nuxt-link :to="localePath(getProductLink)">{{
              getProperTitle(product)
            }}
          </nuxt-link>
        </div>
        <div class="product-price">
          <nuxt-link v-if="product.price > 0" :to="localePath(getProductLink)"
          >{{ productPrice }} {{ productCurrency }}
          </nuxt-link
          >
        </div>
        <div class="product-actions">
          <button
            class="product-add_to_cart"
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
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import FavoritesButton from '@/components/favorites-button';
import LazyImg from '@/components/lazy-img';

import {ModalBus} from '@/event-bus/modal-bus';
import {BasePath, Currency} from "@/assets/js/const";
import AddToCartMixin from '@/mixins/add-to-cart-mx';
import PATH from '@/assets/js/const.path';

const QuickOrder = () => import('@/components/common/product/quick-order');

export default {
  components: {
    FavoritesButton,
    LazyImg,
  },
  mixins: [
    AddToCartMixin
  ],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR',
      isInCart: 'cart/isInCart'
    }),
    productPrice() {
      const price = this.product.price;
      return price > 0
        ? price.toLocaleString("ru-RU")
        : this.$t("price_demand");
    },
    productCurrency() {
      return Currency[this.product.currency];
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
    photo() {
      return this.product.photo[0] || null;
    },
    label() {
      return this.productInCart
        ? this.$t('product.in_the_cart')
        : this.$t('product.to_cart')
    },
    productInCart() {
      return this.isInCart(this.product.id)
    },
    getProductLink() {
      return `${BasePath.PRODUCTS}/${this.product.semanticId}/`
    }
  },
  methods: {
    ...mapState('cart', ['displayedCartTab']),
    ...mapActions({
      POST_PRODUCT_TO_CART: 'cart/POST_PRODUCT_TO_CART',
      REMOVE_PRODUCTs: 'cart/REMOVE_PRODUCTs',
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT'
    }),
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.id})
    },
    getProperTitle(product) {
      return product.productShortName ?? product.productName;
    },
    openQuickOrder() {
      ModalBus.$emit('open', {
        component: QuickOrder,
        props: {
          productId: Number(this.product.id),
          photo: this.photo,
          name_product: this.product.productName
        }
      });
    },

    buyProduct() {
      const toastOptions = {
        router: this.$router,
        action: {
          text: this.$t('go_to_cart'),
          push: this.localePath({
            path: PATH.CART,
            query: {grab: this.displayedCartTab()}
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
  },
};
</script>

<style lang="scss">
.product-card__favorite-btn {
  margin-left: auto;
}
</style>
