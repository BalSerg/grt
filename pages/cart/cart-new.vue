<template>
  <div class="page-main">
    <main class="cart">
      <CartHead :count="productsCount">
        {{ $t('header.cart') }}
      </CartHead>

      <CartContent v-if="productsCount > 0"/>
      <CartEmpty v-else :products-count="productsCount"/>
    </main>

    <!--    <aside class="cart-x-sale">-->
    <!--      <ProductXSale :products="recommendedProducts">-->
    <!--        {{ $t("cart.recommend") }}-->
    <!--      </ProductXSale>-->
    <!--    </aside>-->

    <footer class="cart-benefits">
      <HomeBenefits/>
    </footer>
  </div>
</template>

<script>
import * as PATH from "path";
import {mapActions, mapState} from 'vuex'
import CartHead from '@/modules/cart/components/cart-head.vue'
import HomeBenefits from '@/components/home/benefitsHome'
import CartContent from "~/components/cart/cart-content";
import CartEmpty from "~/components/cart/cart-empty";

export default {
  name: 'CartNew',
  components: {
    CartHead,
    CartContent,
    CartEmpty,
    HomeBenefits,
  },
  data: () => ({
    // recommendedProducts: []
  }),
  computed: {
    ...mapState('cart', ['productsCount', 'displayedCartTab']),
  },
  methods: {
    ...mapActions({
      FETCH_CART: 'cart/FETCH_CART',
    }),
  },
  async fetch() {
    await this.FETCH_CART({grab: this.$route.query.grab})

    if (this.$route.query.grab !== this.displayedCartTab) {
      await this.FETCH_CART({grab: this.displayedCartTab})
    }
    if (this.$route.query.grab !== this.displayedCartTab) {
      this.$router.replace(this.localePath({
        path: PATH.CART,
        query: {grab: this.displayedCartTab}
      }));
    }
  },
  head() {
    return {
      title: this.$t('cart.grt_cart_title'),
    }
  },
}
</script>

<style lang="scss">
.cart {
  position: relative;
  padding: 24px 0;

  .dummy {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 465px;
    margin: 30px;

    img {
      margin-top: 68px;
      height: 158px;
      width: 244px;
    }

    &__repriment {
      margin-top: 38px;
      font-weight: bold;
      font-size: 28px;
      line-height: 140%;
      color: $text-black;
    }

    &__suggestion {
      margin-top: 24px;
      font-weight: normal;
      font-size: 18px;
      line-height: 140%;
      color: $text-black;
    }
  }
}

.cart-container {
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.cart-benefits {
  padding-left: 16px;

  @media (min-width: $desktop-mid) {
    padding-left: 32px;
  }

  @media (min-width: $desktop-large) {
    box-sizing: border-box;
    padding: 0 32px;
    margin: 0 auto;
    max-width: 1440px;
  }

  .home-benefits_wrapper {
    margin: 0;
  }
}

.cart-x-sale {
  .page-main__product-x-sale {
    @media (max-width: $desktop-mid - 1) {
      margin-left: 16px;
    }
  }

  .product-x-sale__products::after {
    @media (max-width: $desktop-mid - 1) {
      width: 16px;
      margin-left: -16px;
    }
  }
}

.cart-benefits .section-title__header,
.cart-x-sale .product-x-sale__title {
  font-size: 16px;

  @media (min-width: $pad) {
    font-size: 22px;
  }

  @media (min-width: $desktop-mid) {
    font-size: 28px;
  }
}
</style>
