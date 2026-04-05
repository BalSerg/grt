<template>
  <catalog-factory
    :nav-info="navInfo"
    :filters-data="filtersData"
    :base-url="favoritesBaseUrl"
    :schema="schema"
  />
</template>

<script>
import {
  getStringifiedFilterQueriesFrom,
  isEmptyObject,
  handleFetchError
} from '@/assets/js/util';
import catalogFactory from '@/components/catalog/catalog-factory';
import { FAVORITES_BASE_URL, schema } from '@/assets/js/const';

export default {
  components: { catalogFactory },
  middleware: ['checkPageQueryParam'],
  data() {
    return {
      schema : schema.FAVORITES,
      navInfo: {
        title: this.$t('header.favorites'),
        categories: [],
      },
      title: this.$t('header.favorites'),
      filtersData: {
        count: null,
        filters: [],
      },
      favoritesBaseUrl: FAVORITES_BASE_URL
    };
  },
  head() {
    const descriptionText = `${this.title}: ${this.$t(
      'meta.category_desсription'
    )}`;

    const title = `${this.title} ${this.$t('meta.category_page_title')}`;
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: descriptionText,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: descriptionText,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          property: 'twitter:title',
          content: title,
        },
      ],
    };
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
  mounted(){
    this.updateFiltersAndProductsCount();
  },
  methods: {
    async updateFiltersAndProductsCount() {
      try {

        const filterQueriesString = isEmptyObject(this.$route.query)
          ? ''
          : `/?${getStringifiedFilterQueriesFrom(this.$route.query)}`;

        const filtersUrl = `${this.favoritesBaseUrl}/filters${filterQueriesString}`;
        const response = await this.$axios.$get(filtersUrl);
        this.filtersData = response.result;
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
  },
};
</script>
