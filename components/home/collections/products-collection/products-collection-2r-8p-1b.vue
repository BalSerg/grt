<template>
  <client-only>
    <section class="buynow">
      <SectionHeader :link="collectionData.heading" />
      <div class="buynow-wrapper">
        <div class="buynow-left">
          <div v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </div>
        <div class="buynow-right">
          <div class="buynow-banner">
            <old-link :to="banner.link">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  :data-srcset="banner.images.D"
                  :srcset="banner.images.D"
                >
                <source
                  media="(min-width: 320px)"
                  :data-srcset="banner.images.T"
                  :srcset="banner.images.T"
                >
                <LazyImg
                  :src="banner.images.M"
                  :alt="banner.title"
                />
              </picture>
            </old-link>
          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex';
import SectionHeader from "@/components/common/section-header";
import ProductCard from '@/components/catalog/catalog-product';
import LazyImg from '@/components/lazy-img';
import { USER_MUTATIONS } from '@/assets/js/const';

export default {
  components: {
    SectionHeader,
    ProductCard,
    LazyImg
  },
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          heading: {},
          ads: [],
          products: [],
        };
      },
    },
  },
  data() {
    return {
      banner: {},
      products: [],
      unSubscribe: null
    };
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
  },
  created() {
    this.banner = this.collectionData.banners[0];
  },
  beforeDestroy() {
    this.unSubscribe();
  },
  mounted() {
    this.updateFavs();

    this.unSubscribe = this.$store.subscribe((mutation) => {
      if (USER_MUTATIONS.includes(mutation.type)) {
        this.updateFavs();
      }
    });
  },
  methods: {
    updateFavs() {
      if (this.userHasNoFavorites()) {
        this.products = this.collectionData.products.slice();
        return;
      }

      this.products = this.collectionData.products.map((productsItem) => {
        const newProductsItem = Object.assign({}, productsItem);
        newProductsItem.isFavorite = this.user.likes.has(
          newProductsItem.id
        );
        return newProductsItem;
      });
    },
    userHasNoFavorites() {
      return !this.user?.likes || this.user.likes.size === 0;
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.buynow-wrapper {
  display: grid;
  grid-template-columns: (1fr 264px);
  grid-gap: 30px;

  @media screen and (max-width: $desktop-mid) {
    display: block;
    overflow-x: auto;
    margin: 48px 0 0;
  }

  .buynow-left {
    display: grid;
    grid-template-columns: repeat(4, minmax(120px, 1fr));
    grid-gap: 30px;

    & > div {
      position: relative;
    }
  }

  .buynow-right {
    height: 100%;

    img {
      display: block;
      width: 100%;
    }

    @media screen and (max-width: $desktop-mid) {
      width: 100%;
      height: auto;
      margin: 48px 0 0;
    }
  }

  .product-card {
    .grt-btn--filled {
      @include grt-btn-filled($azure, $white, $azure2);
    }

    &__favorite-icon {
      path:first-child {
        fill: $fuchsia;
      }
    }
  }
}
</style>
