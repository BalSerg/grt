<template>
  <div class="filter-switch">
    <div class="filter-switch__label">{{filter.propertyType.shortName}}
      <DescriptionTooltip
        v-if="filter.propertyType.description"
        :text="filter.propertyType.description"
      />
    </div>
    <div class="filter-switch__control">
      <input
        :id="`${filter.propertyType.semanticId}_${filter.propertyValues.value.id}`"
        v-model="isChecked"
        type="checkbox"
        :checked="filter.propertyValues.value.checked"
        :name="filter.propertyValues.semanticId"
        :value="filter.propertyValues.value.id"
        @change="updateFilter"
      />
      <label :for="`${filter.propertyType.semanticId}_${filter.propertyValues.value.id}`"></label>
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
      isChecked: false
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
      this.checkedValue = this.filter.propertyValues.value.id;
      this.isChecked = this.filter.propertyValues.value.checked;
    },
    updateFilter() {
      this.$emit('on-filter-change', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: this.isChecked ? [this.checkedValue] : null
      });
    },
  }
}
</script>

<style lang="scss">
.filter-switch {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 0;

  &__label {
    position: relative;
    flex-grow: 1;
    font-size: 13px;
    font-weight: 600;
    color: #282828;
  }

  &__control {
    flex-shrink: 0;

    input[type="checkbox"] {
      display: none;

      & + label {
        position: relative;
        display: block;
        background-color: #bebebe;
        width: 30px;
        height: 15px;
        border-radius: 15px;
        cursor: pointer;

        &::before {
          background-color: #ffffff;
          content: "";
          display: block;
          top: 1px;
          left: 1px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          position: absolute;
          transition: ease 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }
      }

      &:checked {
        & + label {
          background-color: #13b8ae;

          &::before {
            left: calc(100% - 14px);
          }
        }
      }
    }
  }
}
</style>
