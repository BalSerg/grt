<template>
  <catalog-factory
    :nav-info="navInfo"
    :filters-data="filtersData"
    :base-url="suppliersSearchBaseUrl"
    :schema="schema"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getStringifiedFilterQueriesFrom,
  isEmptyObject,
  handleFetchError
} from '@/assets/js/util';
import catalogFactory from '@/components/catalog/catalog-factory';
import { DefaultSemanticId, SUPPLIERS_SEARCH_BASE_URL, schema } from '@/assets/js/const';

export default {
  name: 'SuppliersPage',
  components: { catalogFactory },
  middleware: ['checkSlug', 'checkPageQueryParam', 'getMetaInfo'],
  data() {
    return {
      schema : schema.SUPPLIERS,
      navInfo: {
        title: '',
        categories: [],
      },
      title: '',
      filtersData: {
        count: null,
        filters: [],
      },
      suppliersSearchBaseUrl: SUPPLIERS_SEARCH_BASE_URL
    };
  },
  computed: {
    ...mapGetters({
      metaData: 'meta/metaData',
      layoutMetaTags: 'meta/layoutMetaTags'
    }),
  },
  async fetch() {
    try {
      const url = `${this.suppliersSearchBaseUrl}/${this.$route.params.slug}/info`;
      const { result } = await this.$axios.$get(url);

      this.navInfo = Object.assign({}, result);
      this.title = result.title;
    } catch (err) {
      console.log(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
  watch: {
    async '$route.query.filters'() {
      await this.updateFiltersAndProductsCount();
    },
    async '$route.query.page'() {
      await this.updateFiltersAndProductsCount();
    },
    '$route.query.range': {
      async handler() {
        this.updateFiltersAndProductsCount();
      },
      deep: true,
    },
  },
  mounted(){
    this.updateFiltersAndProductsCount();
  },
  methods: {
    async updateFiltersAndProductsCount() {
      try {
        const supplierSemanticId =
          this.$route.params.slug || DefaultSemanticId.SUPPLIERS;

        const filterQueriesString = isEmptyObject(this.$route.query)
          ? ''
          : `/?${getStringifiedFilterQueriesFrom(this.$route.query)}`;

        const filtersUrl = `${this.suppliersSearchBaseUrl}/${supplierSemanticId}/filters${filterQueriesString}`;
        const response = await this.$axios.$get(filtersUrl);
        this.filtersData = response.result;
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
  },
  head() {
    const meta = this.metaData.get(encodeURIComponent(this.$route.fullPath));

    if (!meta) {
      return;
    }

    return {...this.layoutMetaTags, ...meta};
  },
};
</script>
