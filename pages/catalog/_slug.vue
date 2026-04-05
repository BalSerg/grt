<template>
  <catalog-factory
    v-if="navInfo.categories.length > 0"
    :base-url="catalogSearchBaseUrl"
    :category-description="navInfo.description"
    :filters-data="filtersData"
    :nav-info="navInfo"
    :schema="schema"
  />
</template>

<script>
import {mapGetters} from 'vuex';
import {getStringifiedFilterQueriesFrom, handleFetchError, isEmptyObject} from '@/assets/js/util';

import {CATALOG_SEARCH_BASE_URL, DefaultSemanticId, schema} from '@/assets/js/const';


import catalogFactory from '@/components/catalog/catalog-factory';

export default {
  name: 'Catalog',
  components: {catalogFactory},
  middleware: ['checkSlug', 'getMetaInfo', 'checkPageQueryParam', 'routerStrictRedirestion'],
  computed: {
    ...mapGetters({
      metaData: 'meta/metaData',
      layoutMetaTags: 'meta/layoutMetaTags'
    })
  },
  data() {
    return {
      schema: schema.CATALOG,
      navInfo: {
        title: '',
        description: '',
        categories: [],
      },
      title: '',
      filtersData: {
        count: null,
        filters: [],
      },
      catalogSearchBaseUrl: CATALOG_SEARCH_BASE_URL,
      categoryDescription: ''
    };
  },
  async fetch() {
    try {
      const url = `${this.catalogSearchBaseUrl}/${this.$route.params.slug}/navigation`;
      const {result} = await this.$axios.$get(url);

      this.navInfo = Object.assign({}, result);
      this.title = result.title;

      /**
       * Паша обещал, что сюда будут приходить только доверенные данные.
       * Но, если это окажется неправдой и на бэке так и не появится
       * свой санитайзер, придётся подключить санитайзер на фронте.
       **/

      /*
      Удалить если так и останется описание категории через навигацию

      const categoryName = this.$route.params.slug;
      const { data } = await this.$axios.get(`${PROMO_CATEGORIES_DESCRIPTION_URL}/${categoryName}`);
      this.categoryDescription = data?.result?.bodyHtml;
      */

    } catch (err) {
      console.log(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
  watch: {
    async '$route.query.filters'() {
      await this.updateFiltersAndProductsCount();
    },
    '$route.query.range': {
      async handler() {
        this.updateFiltersAndProductsCount();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateFiltersAndProductsCount();
  },
  methods: {
    async updateFiltersAndProductsCount() {
      try {
        const categorySemanticId =
          this.$route.params.slug || DefaultSemanticId.PRODUCTS;

        const filterQueriesString = isEmptyObject(this.$route.query)
          ? ''
          : `/?${getStringifiedFilterQueriesFrom(this.$route.query)}`;

        const filtersUrl = `${this.catalogSearchBaseUrl}/${categorySemanticId}/filters${filterQueriesString}`;
        const response = await this.$axios.$get(filtersUrl);
        this.filtersData = response.result;
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
  },
  head() {
    const meta = this.metaData.get(encodeURIComponent(this.$route.fullPath));

    if (!meta)
      return

    return {...this.layoutMetaTags, ...meta};
  }
};
</script>
