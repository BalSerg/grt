<template>
  <div class="filter-checkbox">
    <div class="filter-row">
      <div class="filter-checkbox__title">
        {{filter.propertyType.shortName}}
        <DescriptionTooltip
          v-if="filter.propertyType.description"
          :text="filter.propertyType.description"
        />
      </div>
      <filter-reset-btn v-if="filter.applied" @reset-filter="reset"/>
    </div>
    <div v-show="isExpanded" class="filter-checkbox__search">
      <input :id="`${filter.propertyType.semanticId}_search`" v-model="searchQuery" type="text">
    </div>
    <div class="filter-checkbox__options">
      <div v-for="option in visibleOptions" :key="option.id" class="filter-checkbox__option">
        <input
          :id="`${filter.propertyType.semanticId}_${option.id}`"
          v-model="checkedOptions"
          type="checkbox"
          :name="filter.propertyType.semanticId"
          :value="option.id"
          @change="updateFilter"
        >
        <label :for="`${filter.propertyType.semanticId}_${option.id}`">{{option.value}}</label>
      </div>
    </div>
    <button
      v-if="isExpandBtnVisible"
      class="filter-checkbox__expander"
      type="button"
      @click="toggleExpand"
    >{{isExpanded ? $t('collapse') : $t('see_all')}}</button>
  </div>
</template>

<script>
import FilterResetBtn from '@/components/catalog/filters/filter-reset-btn';
import { isOneStringIncludesAnother } from '@/assets/js/util';
import DescriptionTooltip from "@/components/common/description-tooltip";


const DEFAULT_OPTIONS_LENGTH = 5;

export default {
  components: {
    DescriptionTooltip,
    'filter-reset-btn': FilterResetBtn
  },
  props: {
    filter: Object
  },
  data() {
    return {
      isExpanded: false,
      checkedOptions: [],
      visibleOptionsLength: DEFAULT_OPTIONS_LENGTH,
      minVisibleOptionsLength: DEFAULT_OPTIONS_LENGTH,
      searchQuery: ''
    }
  },
  computed: {
    visibleOptions() {
      return this.filter.propertyValues
              .slice(0, this.visibleOptionsLength)
              .filter(filterOption => isOneStringIncludesAnother(filterOption.value, this.searchQuery));
    },
    isExpandBtnVisible() {
      return this.filter.propertyValues.length > DEFAULT_OPTIONS_LENGTH;
    }
  },
  watch: {
    filter() {
      this.initFilterState();
    }
  },
  mounted() {
    this.initFilterState();
  },
  methods: {
    initFilterState() {
      this.checkedOptions = this.filter.propertyValues
                              .filter(option => option.checked)
                              .map(filteredOption => filteredOption.id);
    },
    updateFilter() {
      if (this.checkedOptions.length > DEFAULT_OPTIONS_LENGTH) {
        this.minVisibleOptionsLength = this.checkedOptions.length;
      }

      this.$emit('on-filter-change', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: this.checkedOptions.length > 0 ? this.checkedOptions : null
      });
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;

      this.visibleOptionsLength = this.isExpanded ? this.filter.propertyValues.length : this.minVisibleOptionsLength;
    },
    reset() {
      this.checkedOptions = [];
      this.isExpanded = false;
      this.visibleOptionsLength = DEFAULT_OPTIONS_LENGTH;
      this.updateFilter();
    }
  }
}
</script>

<style lang="scss">
.filter-checkbox {
  padding: 12px 0;

  &__title {
    position: relative;
    flex-grow: 1;
    font-weight: 600;
    font-size: 13px;
    color: #282828;
  }

  &__search {
    padding-top: 8px;

    input {
      width: 100%;
      border: 1px solid #e9e9e9;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 4px;
      outline: none;
      height: 32px;
      padding: 4px 8px;
      color: #666666;
    }
  }

  &__options {
    padding-top: 12px;
    max-height: 190px;
    overflow-y: auto;
  }

  &__option {
    input[type="checkbox"] {
      display: none;
      appearance: none;

      & + label {
        padding-left: 20px;
        position: relative;
        min-height: 18px;
        margin: 3px 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        cursor: pointer;
        line-height: 1.3;

        &::before {
          content: "";
          width: 12px;
          height: 12px;
          display: block;
          position: absolute;
          left: 0;
          top: calc(50% - 6px);
          box-sizing: border-box;
          border-radius: 2px;
          border: 1px solid #bebebe;
          transition: 0.3s;
          z-index: 1;
        }
      }

      &:checked {
        & + label {
          &::before {
            border-color: $azure;
            background-color: $azure;
          }

          &::after {
            content: "";
            z-index: 2;
            width: 9px;
            display: block;
            height: 7px;
            position: absolute;
            background-color: transparent;
            left: 1px;
            top: calc(50% - 4px);
            background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMuMDA3IDcuMTk0Yy4yNi4yNi42OC4yNi45NCAwbDUuMDU1LTUuMDYyYS42NjQuNjY0IDAgMTAtLjk0LS45NEwzLjQ3NCA1Ljc4IDEuNTUzIDMuODZhLjY2NC42NjQgMCAxMC0uOTQuOTRsMi4zOTQgMi4zOTR6IiBmaWxsPSIjZmZmIi8+PC9zdmc+");
          }
        }
      }
    }
  }
}

.filter-checkbox__expander {
  display: inline-block;
  margin-top: 8px;
  padding: 0;

  color: $grt-blue;
  text-align: center;
  vertical-align: middle;

  background-color: transparent;
  cursor: pointer;
}
</style>
