<template>
  <div class="catalog-toolbar wrap catalog-toolbar--mobile">
    <div v-for="filter in appliedFilters" :key="filter.key">
      <chip :filter="filter" @on-filter-clear="onFilterClear"/>
    </div>
    <filter-reset-btn @reset-filter="claerAll">{{$t('clear_all')}}</filter-reset-btn>
  </div>
</template>

<script>
import FilterResetBtn from '@/components/catalog/filters/filter-reset-btn';
import Chip from '@/components/catalog/catalog-filtered-chip';

export default {
  components: {
    'filter-reset-btn': FilterResetBtn,
    Chip
  },
  props: {
    appliedFilters: Array
  },
  methods: {
    claerAll() {
      this.$emit('on-all-filters-clear');
    },
    onFilterClear(newFilterState) {
      this.$emit('on-filter-clear', newFilterState);
    }
  }
};
</script>

<style lang="scss">
.catalog-toolbar.wrap {
  flex-wrap: wrap;
}

.catalog-toolbar.catalog-toolbar--mobile {
  @media screen and (max-width: $desktop-mid - 1) {
    padding: 12px 0 5px;

    border-bottom: 1px solid $grey;
  }
}
</style>
