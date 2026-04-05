<template>
  <section class="storefront">
    <SectionHeader :link="collectionData.heading" />
    <div
      v-if="collectionData"
      class="storefront__wrapper"
      :class="{ standalone: !collectionData.banners.length }"
    >
      <div
        v-if="collectionData.banners && collectionData.banners.length > 0"
        class="storefront__banners"
      >
        <div
          v-for="banner in collectionData.banners"
          :key="banner.id"
          class="storefront__banner"
        >
          <old-link :to="banner.link">
            <picture>
              <source
                media="(min-width: 1024px)"
                :data-srcset="banner.images.D"
                :srcset="banner.images.D"
              >
              <source
                media="(min-width: 512px)"
                :data-srcset="banner.images.T"
                :srcset="banner.images.T"
              >
              <LazyImg
                class="storefront__intro-image"
                :src="banner.images.M"
                :alt="banner.title"
              />
            </picture>
          </old-link>
        </div>
      </div>
      <ul class="storefront__products">
        <li v-for="product in products" :key="product.id" class="storefront__item">
          <ProductCard :product="product" />
        </li>
      </ul>
    </div>
  </section>
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
          heading: "",
          ads: [],
          products: [],
        };
      },
    },
  },
  data() {
    return {
      products: [],
      unSubscribe: null
    };
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
  },
  mounted() {
    this.updateFavs();
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
      return (
        !this.user?.likes || this.user.likes.size === 0
      );
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.storefront {
  padding: 12px 0;

  @media (min-width: $pad) {
    padding: 24px 0;
  }

  @media (min-width: $desktop-mid) {
    padding: 32px 0;
  }
}

.storefront__products {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  grid-auto-flow: column;
  gap: 12px;
  width: 100%;
  margin: 0;
  padding-left: 0;

  list-style: none;
  overflow-x: scroll;

  @media (max-width: 767px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 768px) {
    gap: 20px;

    overflow-x: visible;
  }
}

.storefront__item {
  margin: 0;
  position: relative;
  flex-shrink: 0;

  .product-card {
    .grt-btn--filled {
      @include grt-btn-filled($azure, $white, $azure2);
    }

    &__favorite-icon {
      path:first-child {
        fill: $fuchsia;
      }
    }

    &__title {
      color: $text-black;
      transition: color ease-out 250ms;
    }

    &:hover {
      .product-card__title {
        color: $grt-blue;
        transition: color ease-in 250ms;
      }
    }
  }
}

.storefront__wrapper {
  display: flex;
  flex-direction: column;

  @media (min-width: $desktop-mid) {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 20px;
  }
}

.storefront__wrapper.standalone {
  grid-template-columns: 1fr;

  .storefront__products {
    grid-template-columns: fit-content(120px) auto;

    overflow-x: scroll;
    overflow-y: hidden;

    @media (min-width: $desktop-mid) {
      grid-auto-flow: row;
      grid-template-columns: repeat(6, minmax(120px, 1fr));
      align-items: stretch;
      row-gap: 16px;

      overflow-x: visible;
      overflow-y: visible;
    }
  }
}

.storefront__banners {
  margin-bottom: 20px;

  @media (min-width: $desktop-mid) {
    margin-bottom: 0;
  }
}

.storefront__banner {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  min-width: 120px;

  a {
    display: block;
    width: 100%;

    border-radius: 3px;
    overflow: hidden;
  }
}

.storefront__intro-image {
  display: block;
  width: 100%;
  height: 100%;

  object-fit: contain;
}
</style>
