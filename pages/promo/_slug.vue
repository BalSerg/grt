<template>
  <catalog-factory
    :nav-info="navInfo"
    :filters-data="filtersData"
    :base-url="promoSearchBaseUrl"
    :schema="schema"
    :generator="navInfo.promo"
  />
</template>

<script>
import {
  getStringifiedFilterQueriesFrom,
  isEmptyObject,
  handleFetchError
} from '@/assets/js/util';
import catalogFactory from '@/components/catalog/catalog-factory';
import { DefaultSemanticId, PROMO_SEARCH_BASE_URL, schema } from '@/assets/js/const';

export default {
  components: { catalogFactory },
  middleware: ['checkSlug', 'checkPageQueryParam', 'checkPromoExists'],
  data() {
    return {
      schema : schema.PROMO,
      navInfo: {
        title: '',
        categories: [],
      },
      title: '',
      filtersData: {
        count: null,
        filters: [],
      },
      promoSearchBaseUrl: PROMO_SEARCH_BASE_URL
    };
  },
  async fetch() {
    try {
      const url = `${this.promoSearchBaseUrl}/${this.$route.params.slug}/info`;
      const { result } = await this.$axios.$get(url);

      this.navInfo = Object.assign({}, result);
      this.title = result.title;
    } catch (err) {
      console.log(err);
      return handleFetchError(this.$nuxt, err);
    }
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
        const promoSemanticId =
          this.$route.params.slug || DefaultSemanticId.PROMO;

        const filterQueriesString = isEmptyObject(this.$route.query)
          ? ''
          : `/?${getStringifiedFilterQueriesFrom(this.$route.query)}`;

        const filtersUrl = `${this.promoSearchBaseUrl}/${promoSemanticId}/filters${filterQueriesString}`;
        const response = await this.$axios.$get(filtersUrl);
        this.filtersData = response.result;
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
  },
};
</script>
