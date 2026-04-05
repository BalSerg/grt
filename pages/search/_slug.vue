<template>
  <div class="search-results">

    <template v-if="!isFetching && hasResult">

      <div class="container">

        <search-tabs
          :tabs-count="resultCount"
          :tabs-active="primaryTab"
          @onChangeTab="changeTab"
        />

      </div>

      <catalog-factory
        :nav-info="navInfo"
        :filters-data="filtersData"
        :base-url="searchBaseUrl"
        :schema="schema"
      />

    </template>

    <template v-if="!isFetching && !hasResult">
      <div class="container">
        <search-blank></search-blank>
      </div>
    </template>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchTabs from '@/components/search/search-tabs';
import SearchBlank from '@/components/search/search-blank';
import CatalogFactory from '@/components/catalog/catalog-factory';
import {SEARCH_BASE_URL, schema} from '@/assets/js/const';
import { composeSearchAreaUrl, handleFetchError, isEmptyObject, getStringifiedFilterQueriesFrom, composeSearchClearAreaUrl } from '@/assets/js/util';

export default {
  name: "Search",
  components: {
    SearchTabs,
    SearchBlank,
    CatalogFactory
  },
  middleware: [
    'checkSlug',
    'getMetaInfo'
  ],
  computed: {
    isFetching() {
      return this.$fetchState.pending;
    },
    hasResult(){
      return Object.values(this.resultCount).some((x)=> x > 0);
    },
    ...mapGetters({
      metaData: 'meta/metaData',
      layoutMetaTags: 'meta/layoutMetaTags'
    }),
    encodedSlug() {
      return encodeURIComponent(this.$route.params.slug);
    }
  },
  data() {
    return {
      schema: schema.SEARCH,
      resultCount: {
        products: 0,
        services: 0,
        suppliers: 0
      },
      navInfo: {
        title: '',
        categories: [],
      },
      title: '',
      filtersData: {
        count: null,
        filters: [],
      },
      searchBaseUrl: SEARCH_BASE_URL,
      primaryTab: null,
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
    primaryTab(newV, oldV) {
      if (newV === oldV) {
        return;
      }

      if (oldV === null) {
        return this.$router.push(composeSearchAreaUrl(this.$route, this.primaryTab, this.localePath));
      }

      return this.$router.push(composeSearchClearAreaUrl(this.$route, this.primaryTab,  this.localePath));
    }
  },
  created() {
    this.primaryTab = this.getPrimaryTab();
  },
  mounted() {
    this.updateFiltersAndProductsCount();
  },
  methods: {
    changeTab(area){
      setTimeout(() => {
        this.primaryTab = area;
      },300)
    },
    async updateFiltersAndProductsCount() {
      try {
        const filterQueriesString = isEmptyObject(this.$route.query)
          ? ''
          : `/?${getStringifiedFilterQueriesFrom(this.$route.query)}`;

        let filtersUrl = `${this.searchBaseUrl}/${this.encodedSlug}/filters${filterQueriesString}`;

        const queryAreaEl = `area=${this.primaryTab}`;
        filtersUrl += filterQueriesString.length > 0 ? `&${queryAreaEl}` : `?${queryAreaEl}`;
        const response = await this.$axios.$get(filtersUrl);
        this.filtersData = response.result;
        this.resultCount[this.primaryTab] = response.result.count;
      } catch (err) {
        handleFetchError(this.$nuxt, err);
      }
    },
    getPrimaryTab(){
      if (this.$route.query.area) {
        return this.$route.query.area;
      }
      const primaryTab = Object.entries(this.resultCount).find(([_, val]) => val > 0) || ["products"];
      return primaryTab[0];
    }
  },
  async fetch(){
    try {
      const resultsCount = await this.$axios.get(`${SEARCH_BASE_URL}/${this.encodedSlug}/counts`);
      this.resultCount = resultsCount.data.result;
    }
    catch(err) {
      console.error(err);
    }
  },
  head() {
    const meta = this.metaData.get(encodeURIComponent(this.$route.fullPath));

    if (!meta) {
      return;
    }

    return {...this.layoutMetaTags, ...meta};
  },
}

</script>

<style lang="scss">
.search-results {
  .page-main {
    @media screen and (max-width: $pad - 1) {
      padding-top: 0;
    }
  }

  .catalog-title {
    padding-bottom: 24px;
  }
}
</style>
