<template>
  <div :class="wrapperClass" style="min-height: 50vh;">
    <template v-if="hasNoGoods">
      {{ $t('no_products') }}
    </template>
    <template v-else>
      <component
        :is="itemComponent"
        v-for="product in products"
        :key="product.semanticId"
        :product="product"
      ></component>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  handleFetchError,
  isEmptyObject,
  setIsFavorite,
  scrollToTitle,
  getStringifiedQueriesFrom
} from '@/assets/js/util';
import CatalogProduct from '@/components/catalog/catalog-product';
import CatalogCompany from '@/components/catalog/catalog-company';
import { DefaultSemanticId, schema, USER_MUTATIONS, NOT_FOUND } from '@/assets/js/const';

export default {
  components: { CatalogProduct, CatalogCompany },
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    schema: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
    wrapperClass() {
      let computedClass = '';
      if(!this.hasNoGoods) computedClass = 'catalog-goods';
      if(!this.hasNoGoods && this.isRouteAreaSuppliers) computedClass = 'catalog-suppliers';
      return computedClass;
    },
    isUserHasNoFavorites() {
      return !this.user || !this.user.likes || this.user.likes.size === 0;
    },
    isRouteAreaSuppliers() {
      return this.$route.query.area === schema.SUPPLIERS;
    },
    isSchemaSearch() {
      return this.schema === schema.SEARCH;
    },
    isSchemaFavorites() {
      return this.schema === schema.FAVORITES;
    },
    hasNoGoods() {
      return !this.$fetchState.pending && this.products.length === 0;
    },
    itemComponent() {
      if (this.isSchemaSearch && this.isRouteAreaSuppliers) {
        return CatalogCompany;
      }
      return CatalogProduct;
    },
    slug() {
      return this.$route.params.slug || DefaultSemanticId.PRODUCTS;
    },

    encodedSlug() {
      return encodeURIComponent(this.slug);
    }
  },
  data() {
    return {
      products: [],
      unSubscribe: {},
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.updateProducts();

        if (process.client) {
          setTimeout(() => {
            scrollToTitle('.js-catalog-title', {behavior: 'smooth'});
          }, 300);
        }
      },
      deep: true,
    }
  },
  mounted() {
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
    updateProducts() {
      this.$fetch()
    },
    updateFavs() {
      if (this.isUserHasNoFavorites) {
        return;
      }

      this.products = this.products.map((product) =>
        setIsFavorite(product, this.user)
      );
    },
    getProductsMergedWithFavs(products) {
      if (this.isUserHasNoFavorites) {
        return products;
      }

      return products.map((product) => setIsFavorite(product, this.user));
    },
  },
  async fetch() {
    try {
      const filterQueriesString = !isEmptyObject(this.$route.query)
        ? `/?${getStringifiedQueriesFrom(this.$route.query)}`
        : '';

      const productsUrl = this.isSchemaFavorites
        ? `${this.baseUrl}/products${filterQueriesString}`
        : `${this.baseUrl}/${this.encodedSlug}/products${filterQueriesString}`;

      const { result } = await this.$axios.$get(productsUrl);
      this.products = this.getProductsMergedWithFavs(result);

      if (process.server && result.length === 0) {
        const { res } = this.$nuxt.context;
        res.statusCode = NOT_FOUND;
      }
    } catch (err) {
      handleFetchError(this.$nuxt, err);
    }
  },
};
</script>

<style lang="scss">
.overflow-hidden {
  .catalog-goods {
    z-index: 1099;
  }
}

.catalog-suppliers {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  column-gap: 16px;
  row-gap: 24px;
  width: 100%;
  position: relative;
  z-index: 30;

  @media screen and (max-width: $pad) {
    grid-template-columns: repeat(3, minmax(240px, 1fr));
  }

  @media screen and (max-width: $pad - 1) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }
}

.catalog-goods {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  column-gap: 16px;
  row-gap: 24px;
  width: 100%;
  position: relative;
  z-index: 30;

  @media (min-width: $pad) {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 16px;
  }

  @media (min-width: $desktop-mid) {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
    gap: 0;
  }
}

.product-card--wide {
  max-width: unset;
}

.catalog-goods .product-card .grt-btn {
  --btn-primary-color: #13b8ae;
}
</style>
