<template>
  <section class="cart-widget">

    <CartWidgetHeader :products-count="productsCount"/>

    <div class="cart-widget__items-wrapper">
      <ul class="cart-widget__items-list">
        <li
          v-for="product in mockProducts"
          :key="product.id"
          class="cart-widget__item"
        >
          <CartProduct :product="product"/>
        </li>
      </ul>
    </div>

    <CartWidgetFooter
      :total-price="totalPrice"
      :current-currency="currentCurrency"
    />

  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import CardWidgetProduct from './cart-widget-product';
import CartWidgetHeader from './cart-widget-header';
import CartWidgetFooter from './cart-widget-footer';
import { setIsFavorite, handleFetchError } from '@/assets/js/util';
import { USER_MUTATIONS } from '@/assets/js/const';
import { ModalBus } from '@/event-bus/modal-bus';

export default {
  components: {
    CardWidgetProduct,
    CartWidgetHeader,
    CartWidgetFooter
  },
  props: {
    productsCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'userData/user',
      isDesktop: 'tech/isDesktop'
    }),
    isUserHasNoFavorites() {
      return !this.user || !this.user.likes || this.user.likes.size === 0;
    },
  },
  data() {
    return {
      totalPrice: 24743,
      currentCurrency: '₽',
      mockProducts: [],
      unSubscribe: {},
    };
  },
  watch: {
    isDesktop(value) {
      if (value === true) {
        ModalBus.$emit('close');
      }
    }
  },
  mounted() {
    this.updateCart();

    this.unSubscribe = this.$store.subscribe((mutation) => {
      if (USER_MUTATIONS.includes(mutation.type)) {
        this.updateFavs();
      }
    });
  },
  beforeDestroy() {
    this.unSubscribe();
  },
  methods: {
    async updateCart() {
      try {
        const {result} = await this.$axios.$get(`/napi/catalog-search/categories/products/products/?filters=275`);
        // const {result} = await this.$axios.$get(`/napi/catalog-search/categories/products/products/?filters=272&sort=pricedesc&range.price=67700~67700`);
        this.mockProducts = result.slice(0, this.productsCount);
        this.updateFavs();
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
    updateFavs() {
      if (this.isUserHasNoFavorites) {
        return;
      }

      this.mockProducts = this.mockProducts
        .map((product) => setIsFavorite(product, this.user));
    },
  }
};
</script>

<style lang="scss">
.cart-widget {
  position: fixed;
  left: 16px;
  top: 16px;
  right: 16px;
  bottom: 16px;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: $pad) {
    position: static;

    display: block;
  }

  @media screen and (min-width: $desktop-mid) {
    width: 448px;
  }
}

.cart-widget__item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.cart-widget__items-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  overflow-y: auto;

  list-style: none;

  @media screen and (min-width: $pad) {
    position: static;

    height: auto;
    max-height: 380px;
  }
}

.cart-widget__items-wrapper {
  @media screen and (max-width: $pad - 1) {
    position: relative;

    flex-grow: 1;
  }
}
</style>
