<template>
  <div class="filter-radio">
    <div class="filter-row">
      <div class="filter-radio__title">
        {{filter.propertyType.shortName}}
        <DescriptionTooltip
          v-if="filter.propertyType.description"
          :text="filter.propertyType.description"
        />
      </div>
    </div>
    <div class="filter-radio__search">

    </div>
    <div class="filter-radio__options">
      <div v-for="option in filter.propertyValues" :key="option.id" class="filter-radio__option">
        <input
          :id="`${filter.propertyType.semanticId}_${option.id}`"
          v-model="checkedValue"
          type="radio"
          :name="filter.propertyType.semanticId"
          :value="option.id"
          @change="updateFilter"
        >
        <label :for="`${filter.propertyType.semanticId}_${option.id}`">{{option.value}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionTooltip from "@/components/common/description-tooltip";
export default {
  components: {DescriptionTooltip},
  props: {
    filter: Object
  },
  data() {
    return {
      checkedValue: 0,
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
      for (const radioValue of this.filter.propertyValues) {
        if (radioValue.checked) {
          this.checkedValue = radioValue.id;
          return;
        }
      }
    },
    updateFilter() {
      this.$emit('on-filter-change', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: [this.checkedValue] || null
      });
    },
  }
}
</script>

<style lang="scss">
.filter-radio {
  padding: 12px 0;

  &__title {
    position: relative;
    flex-grow: 1;
    font-weight: 600;
    font-size: 13px;
    color: #282828;
  }

  &__control {
    flex-shrink: 0;
    color: #7e7e7e;
    border-bottom: 1px dashed #7e7e7e;
    cursor: pointer;
  }

  &__options {
    padding-top: 12px;
  }

  &__option {
    input[type="radio"] {
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
          border-radius: 50%;
          background-color: $azure;
          position: absolute;
          left: 0;
          top: calc(50% - 6px);
        }
      }

      &:checked {
        & + label {
          &::after {
            content: "";
            width: 6px;
            height: 6px;
            background-color: #ffffff;
            position: absolute;
            left: 3px;
            top: calc(50% - 3px);
            border-radius: 50%;
            border: 1px solid #ffffff;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
