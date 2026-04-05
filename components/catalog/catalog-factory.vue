<template>
  <div
    class="page-main catalog"
    :class="morphed || navMorph ? 'page-main--above-header' : ''"
  >
    <div class="container">
      <CatalogBreadcrumbs
        v-if="isCatalog"
        :categories="categories"
      />

      <FakeBreadcrumbs
        v-if="isPromo || isSuppliers || isFavorites"
        :fake-path="navInfo.title"
      />

      <CatalogTitle
        v-if="!isSearch"
        :title="pageTitle"
        :count="productsCount"
      />

    </div>
    <div class="container">
      <div class="catalog__container">
        <aside>
          <div
            class="catalog-sidebar"
            :class="{ morphed: morphed, navMorph: navMorph }"
          >
            <div class="catalog-sidebar__container">
              <div
                class="catalog-sidebar__control"
                @click="toggleMobileFilters"
              ></div>

              <template v-if="isCatalog">
                <CatalogNavigation
                  :data="navData"
                  @on-show-mobile-navigation="closeMobileNavigation"
                />
              </template>

              <CatalogFilters
                :are-filters-visible="areFiltersVisible"
                :filters="fetchedFilters"
                @on-filter-change="updateRouteOnFilterChange"
                @on-filter-clear="updateRouteOnFilterChange"
                @on-all-filters-clear="updateRouteOnAllFiltersClear"
              />

              <div
                class="catalog-sidebar__overlay"
                @click="toggleMobileFilters"
              ></div>

            </div>
          </div>
        </aside>
        <main>

          <CatalogTitle
            v-if="isSearch"
            :title="$route.params.slug"
            :count="filtersData.count"
          />

          <PromoGenerator
            v-if="isPromo && generator"
            :data="generator"
          />

          <CatalogToolbar
            :applied-filters-count="appliedFiltersCount"
            :schema="schema"
            @on-show-mobile-filters="toggleMobileFilters"
            @on-show-mobile-navigation="openMobileNavigation"
          />

          <template v-if="appliedFilters.length > 0">
            <CatalogFiltered
              v-if="isDesktop"
              :applied-filters="appliedFilters"
              @on-filter-clear="updateRouteOnFilterChange"
              @on-all-filters-clear="updateRouteOnAllFiltersClear"
            />
          </template>

          <CatalogGoods :base-url="baseUrl" :schema="schema" />

          <CatalogPagination
            v-if="productsCount"
            :total-products="productsCount"
          />
        </main>
      </div>
    </div>

    <CatalogCategoryDescription
      v-if="categoryDescription"
      :category-description="categoryDescription"
      class="catalog__description"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CatalogFiltered from './catalog-filtered';
import CatalogTitle from './catalog-title';
import CatalogFilters from './catalog-filters';
import CatalogNavigation from './catalog-navigation';
import CatalogPagination from './catalog-pagination';
import CatalogToolbar from './catalog-toolbar';
import CatalogGoods from './catalog-goods';
import {
  composeRouteWithFiltersQuery,
  composeRouteOnAllFiltersClear,
  composeRouteWithRangeQuery,
  findCheckedFilters,
  parseFilterArrayToString,
} from '@/assets/js/util';
import { FilterType, schema } from '@/assets/js/const';

const HOME = 'home';

export default {
  components: {
    CatalogFiltered,
    CatalogNavigation,
    CatalogTitle,
    CatalogFilters,
    CatalogPagination,
    CatalogGoods,
    CatalogToolbar,
    CatalogBreadcrumbs: () => import('./catalog-breadcrumbs'),
    FakeBreadcrumbs: () => import('@/components/common/fake-breadcrumbs'),
    CatalogCategoryDescription: () => import('./catalog-category-description.vue'),
    PromoGenerator: () => import('@/components/promo/promo-generator')
  },
  props: {
    navInfo: {
      type: Object,
      default: () => ({
        title: '',
        categories: [],
      }),
    },
    filtersData: {
      type: Object,
      default: () => ({
        count: null,
        filters: [],
      }),
    },
    generator: {
      type: Array,
      required: false
    },
    baseUrl: {
      type: String,
      required: true
    },
    schema: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      default: ''
    }
  },
  computed: {
    isRouteAreaSuppliers() {
      return this.$route.query.area === schema.SUPPLIERS;
    },
    isCatalog() {
      return this.schema === schema.CATALOG;
    },
    isFavorites() {
      return this.schema === schema.FAVORITES
    },
    isPromo() {
      return this.schema === schema.PROMO;
    },
    isSearch() {
      return this.schema === schema.SEARCH;
    },
    isSuppliers() {
      return this.schema === schema.SUPPLIERS;
    },
    ...mapGetters({
      isDesktop: 'tech/isDesktop'
    }),
    pageTitle() {
      if(this.isSuppliers) {
        return this.$t('suppliers.pagetitle') + ' ' +  this.navInfo.title;
      }
      return this.navInfo.title;
    },
    categories() {
      if(!this.isCatalog){
        return [];
      }
      return this.navInfo.categories;
    },
    pageNav() {
      if(!this.isCatalog) {
        return [];
      }
      return this.navInfo.categories
        .filter((x) => x.semanticId !== HOME)
        .map((x, idx, arr) => {
          if (idx === arr.length - 1) {
            return Object.assign({}, x);
          }

          return Object.assign({}, x, { children: [] });
        });
    },
    mobileNav() {
      if(!this.isCatalog) {
        return [];
      }
      return this.navInfo.categories.filter((x) => x.semanticId !== HOME);
    },
    navData() {
      return this.isDesktop ? this.pageNav : this.mobileNav;
    },
    productsCount() {
      return this.filtersData.count;
    },
    fetchedFilters() {
      return this.filtersData.filters.slice();
    },
    appliedFilters() {
      return this.fetchedFilters.filter((f) => f.applied);
    },
    appliedFiltersCount() {
      return this.appliedFilters.length;
    },
    areFiltersVisible() {
      return (!this.isDesktop && this.morphed) || this.isDesktop;
    }
  },
  data() {
    return {
      morphed: false,
      navMorph: false,
      filterQueriesMap: new Map(),
      rangeQueriesMap: new Map(),
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: this.morphed || this.navMorph ? 'overflow-hidden' : '',
      },
    };
  },
  watch: {
    '$route.query.area'() {
      this.clearQueriesMaps();
    },
    filtersData() {
      this.initQueriesMapsFrom();
    }
  },
  methods: {
    initQueriesMapsFrom() {
      this.appliedFilters.forEach(this.addSelectedValue);
    },

    addSelectedValue(filter) {
      const composeValuesActionMap = {
        [FilterType.CHECKBOX]: (filter) =>
          findCheckedFilters(filter.propertyValues),
        [FilterType.RADIO]: (filter) =>
          findCheckedFilters(filter.propertyValues),
        [FilterType.SWITCH]: (filter) => [filter.propertyValues.value.id],
        [FilterType.RANGE]: (filter) => ({
          [`range.${filter.propertyType.semanticId}`]: `${filter.propertyValues.selectedMin}~${filter.propertyValues.selectedMax}`,
        }),
      };

      const queriesMap =
        filter.type === FilterType.RANGE
          ? this.rangeQueriesMap
          : this.filterQueriesMap;

      queriesMap.set(filter.propertyType.id, {
        type: filter.type,
        values: composeValuesActionMap[filter.type](filter),
      });
    },

    updateRouteOnFilterChange(newFilterState) {
      const route =
        newFilterState.type === FilterType.RANGE
          ? this.getUpdatedRouteFromRange(newFilterState)
          : this.getUpdatedRouteFromFilters(newFilterState);

      this.$router.push(route);
    },

    getUpdatedRouteFromRange(newFilterState) {
      this.updateQueriesMap(this.rangeQueriesMap, newFilterState);

      return composeRouteWithRangeQuery(this.$route, this.rangeQueriesMap);
    },

    getUpdatedRouteFromFilters(newFilterState) {
      this.updateQueriesMap(this.filterQueriesMap, newFilterState);

      return composeRouteWithFiltersQuery(
        this.$route,
        parseFilterArrayToString([...this.filterQueriesMap.values()])
      );
    },

    updateRouteOnAllFiltersClear() {
      this.clearQueriesMaps();
      this.$router.push(composeRouteOnAllFiltersClear(this.$route));
    },

    clearQueriesMaps() {
      this.filterQueriesMap.clear();
      this.rangeQueriesMap.clear();
    },

    updateQueriesMap(queriesMap, newFilterState) {
      if (newFilterState.values === null) {
        return queriesMap.delete(newFilterState.id);
      }

      queriesMap.set(newFilterState.id, {
        type: newFilterState.type,
        values: newFilterState.values,
      });
    },

    parseFilterQueriesMapToString() {
      const queriesString = [...this.filterQueriesMap.values()]
        .map((it) => it.values.join(','))
        .join(',')
        .replace(/^,|,$/g, '');
      return queriesString;
    },

    closeMobileNavigation() {
      this.navMorph = !this.navMorph;
    },

    openMobileNavigation() {
      this.navMorph = !this.navMorph;
      if (this.navMorph && !this.isDesktop && this.isCatalog) {
        setTimeout(() => {
          document
            .querySelectorAll('.catalog-sidebar_nav-item')
            [this.navData.length - 1].scrollIntoView({
              behavior: 'smooth',
            });
        }, 300);
      }
    },

    toggleMobileFilters() {
      this.morphed = !this.morphed;
    },
  },
};
</script>

<style lang="scss">
.catalog__container {
  padding: 25px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;

  aside {
    @media screen and (min-width: $desktop-mid + 1) {
      min-width: 295px;
    }
  }

  main {
    flex-grow: 1;
  }

  .catalog-sidebar {
    @media screen and (max-width: $desktop-mid) {
      width: 0;
      overflow: hidden;

      .catalog-sidebar__container {
        visibility: hidden;
        transition: 0.2s;

        .catalog-filters {
          transition: 0.3s;
          transform: translateX(100%);
          visibility: hidden;
          z-index: 10;
          min-width: 390px;
          box-sizing: border-box;
        }

        .catalog-sidebar__control {
          visibility: hidden;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ffffff;
          margin-top: 19px;
          margin-right: 14px;
          position: relative;
          z-index: 8;
          transform: translateY(-300%);
          transition: ease-in-out 0.3s;
          transition-delay: 0.3s;

          &::before,
          &::after {
            content: "";
            width: 2px;
            height: 14px;
            background-color: $text-grey;
            position: absolute;
            top: calc(50% - 7px);
            left: calc(50% - 1px);
            box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.4);
            border-radius: 1px;
          }

          &::before {
            transform: rotate(-45deg);
          }

          &::after {
            transform: rotate(45deg);
          }
        }
      }
    }

    &.navMorph {
      .catalog-sidebar__container {
        @media screen and (max-width: $desktop-mid) {
          visibility: visible;
          position: fixed;
          overflow: hidden;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1990;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
          align-items: stretch;

          .catalog-sidebar_nav {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
            z-index: 10;
            overflow-y: auto;
            background-color: #ffffff;
            padding: 20px;
            box-sizing: border-box;
          }
        }
      }
    }

    &.morphed {
      .catalog-sidebar__container {
        @media screen and (max-width: $desktop-mid) {
          visibility: visible;
          position: fixed;
          overflow: hidden;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1990;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
          align-items: stretch;

          .catalog-filters {
            visibility: visible;
            position: relative;
            border-radius: 0;
            box-shadow: 0 -10px 15px rgba(0, 0, 0, 0.2);
            transform: translateX(0);
            height: 100%;
            overflow: auto;
          }
        }

        @media screen and (max-width: 425px) {
          // bottom: 51px;

          .catalog-filters {
            min-width: 0;
            width: calc(100vw - 48px);
            max-width: calc(100vw - 48px);
          }

          .catalog-sidebar__control {
            margin-left: 10px;
            flex-shrink: 0;
          }
        }
      }

      .catalog-sidebar__overlay {
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
      }

      .catalog-sidebar__control {
        visibility: visible;
        transform: translateY(0);
        transition-delay: 0;
      }
    }
  }

  .catalog-toolbar {
    &:first-child {
      margin-top: -8px;
    }
  }
}

.catalog__description {
  margin-bottom: 32px;

  @media (min-width: $desktop-mid) {
    margin-bottom: 64px;
  }
}
</style>
