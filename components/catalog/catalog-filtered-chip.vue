<template>
  <div class="catalog-toolbar__filtered">
    {{ longName }} <span v-if="count" class="catalog-toolbar__filtered-count">({{ count }})</span>
    <button
      type="button"
      class="catalog-toolbar__remove-filter-btn"
      @click="clearFilter"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#E9E9E9"/>
        <path class="catalog-toolbar__remove-filter-btn-cross" d="M8.7375 8.7375C8.51251 8.96249 8.13749 8.96249 7.91249 8.7375L6 6.825L4.0875 8.7375C3.86251 8.96249 3.48749 8.96249 3.26249 8.7375C3.0375 8.51251 3.0375 8.13748 3.26249 7.91249L5.17499 6L3.26249 4.0875C3.0375 3.86251 3.0375 3.48749 3.26249 3.26249C3.48749 3.0375 3.86251 3.0375 4.0875 3.26249L6 5.17499L7.91249 3.26249C8.13749 3.0375 8.51251 3.0375 8.7375 3.26249C8.96249 3.48749 8.96249 3.86251 8.7375 4.0875L6.825 6L8.7375 7.91249C8.96249 8.13748 8.96249 8.51248 8.7375 8.7375Z" fill="#7E7E7E"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { FilterType } from '@/assets/js/const';
import { getRangeMin, getRangeMax } from '@/assets/js/util';

export default {
  props: {
    filter: Object
  },
  data() {
    return {
      measure: this.filter.propertyType.measure || ''
    }
  },
  computed: {
    count() {
      let counter = 0;

      if (this.filter.type === FilterType.CHECKBOX) {
        counter = this.filter.propertyValues.filter(item => item.checked).length;
      }

      return counter;
    },
    longName() {
      const nameMap = {
        [FilterType.RADIO]: () => this.filter.propertyValues.find(item => item.checked).value,
        [FilterType.RANGE]: () => `${this.$t('range.from')} ${this.rangeMin} ${this.measure} ${this.$t('range.to')} ${this.rangeMax} ${this.measure}`
      };

      if (nameMap[this.filter.type]) {
        return nameMap[this.filter.type]();
      }

      return this.filter.propertyType.longName;
    },
    rangeMin() {
      if (this.filter.type === FilterType.RANGE) {
        return getRangeMin(
                  this.filter.propertyValues.selectedMin,
                  this.filter.propertyValues.min,
                  this.filter.propertyValues.max
                )
                .toLocaleString(this.$i18n.locale);
      }
    },
    rangeMax() {
      if (this.filter.type === FilterType.RANGE) {
        return getRangeMax(
                  this.filter.propertyValues.selectedMax,
                  this.filter.propertyValues.min,
                  this.filter.propertyValues.max
                )
                .toLocaleString(this.$i18n.locale);
      }
    }
  },
  methods: {
    clearFilter() {
      this.$emit('on-filter-clear', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: null
      });
    }
  }
}
</script>

<style lang="scss">
.catalog-toolbar__filtered {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 6px 18px;

  font-size: 13px;
  font-weight: normal;
  color: $text-black;
  line-height: 1;

  border-radius: 18px;
  border: 1px solid $azure;
  user-select: none;

  @media (min-width: $desktop-mid) {
    white-space: nowrap;
  }
}

.catalog-toolbar__remove-filter-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  padding: 0;

  border-radius: 50%;
  background-color: $grey;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    .catalog-toolbar__remove-filter-btn-cross {
      fill: $azure;
    }
  }
}

.catalog-toolbar__filtered-count {
  margin-left: 4px;
  color: $text-grey;
}
</style>
