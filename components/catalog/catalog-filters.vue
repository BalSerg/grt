<template>
  <div class="catalog-filters" :class="{'filters-ready': !isLoading}">
    <template v-if="areFiltersVisible">
      <h2 class="catalog-filters__title">{{$t('filters')}}</h2>

      <catalog-filtered
        v-if="!isDesktop"
        :applied-filters="appliedFilters"
        @on-filter-clear="updateRouteOnFilterChange"
        @on-all-filters-clear="updateRouteOnAllFiltersClear"
      />

      <component
        :is="`${filter.type}Filter`"
        v-for="filter in filters"
        :key="filter.propertyType.semanticId"
        :filter="filter"
        @on-filter-change="onFilterChange"
      ></component>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CatalogFiltered from './catalog-filtered';

export default {
  components: {
    rangeFilter: () => import('./filters/double-range.vue'),
    switchFilter: () => import('./filters/switch.vue'),
    checkboxFilter: () => import('./filters/checkbox.vue'),
    radioFilter: () => import('./filters/radio.vue'),
    CatalogFiltered
  },
  props: {
    filters: Array,
    areFiltersVisible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop'
    }),
    appliedFilters() {
      return this.filters.filter((f) => f.applied)
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.isLoading = !this.isLoading
  },
  methods: {
    onFilterChange(newFilterState) {
      this.$emit('on-filter-change', newFilterState);
    },
    updateRouteOnFilterChange(newFilterState) {
      this.$emit('on-filter-clear', newFilterState);
    },
    updateRouteOnAllFiltersClear() {
      this.$emit('on-all-filters-clear');
    }
  }
}
</script>

<style lang="scss">
.catalog-filters {
  border-radius: 6px;
  padding: 18px 12px 0;
  background-color: #ffffff;
  transition: all ease 300ms;

  &.filters-ready {
    background-color: #f8f8f8;
  }

  @media screen and (min-width: $desktop-mid) {
    padding: 0 12px;
  }
}

.catalog-filters__title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 18px;

  font-weight: 600;
  font-size: 15px;
  line-height: 1.6;
  color: $text-black;
  text-align: center;

  border-bottom: 1px solid $grey;

  @media screen and (min-width: $desktop-mid) {
    &:not(:focus):not(:active) {
      position: absolute;
      z-index: -1;

      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;

      white-space: nowrap;

      clip-path: inset(100%);
      clip: rect(0 0 0 0);
      overflow: hidden;
    }
  }
}

.filter-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
