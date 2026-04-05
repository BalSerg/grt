<template>
  <div class="double-range">
    <div class="double-range__head">
      <h3 class="double-range__title">
        {{title}}<span v-if="measure">, {{ measure }}</span>
        <DescriptionTooltip
          v-if="filter.propertyType.description"
          :text="filter.propertyType.description"
        />
      </h3>
      <filter-reset-btn v-if="filter.applied" @reset-filter="resetRanges"/>
    </div>
    <div class="double-range__inputs-wrapper">
      <label class="double-range__value">
        <span class="visually-hidden">{{$t('min_value')}}</span>
        <input
          v-model.lazy="minValue"
          class="double-range__value-input"
          type="number"
          :step="rangeStep"
          @input="holdUpdateFilter"
          @blur="updateFilter"
          @keyup.enter="updateFilter"
        >
        <span class="double-range__localized-value">
          {{Number(selectedMin).toLocaleString($i18n.locale)}}
        </span>
      </label>
      &mdash;
      <label class="double-range__value">
        <span class="visually-hidden">{{$t('max_value')}}</span>
        <input
          v-model.lazy="maxValue"
          class="double-range__value-input"
          type="number"
          :step="rangeStep"
          @input="holdUpdateFilter"
          @blur="updateFilter"
          @keyup.enter="updateFilter"
        >
        <span class="double-range__localized-value">
          {{Number(selectedMax).toLocaleString($i18n.locale)}}
        </span>
      </label>
    </div>
    <div class="double-range__ranges-wrapper">
      <div class="double-range__range-progress-wrapper">
        <div ref="minProgress" class="double-range__min-range-progress"></div>
        <div ref="maxProgress" class="double-range__max-range-progress"></div>
      </div>
      <input
        v-model.number="minValue"
        class="double-range__range double-range__range--min"
        type="range"
        :min="rangeMin"
        :max="rangeMax"
        :step="rangeStep"
      >
      <input
        v-model.number="maxValue"
        class="double-range__range double-range__range--max"
        type="range"
        :min="rangeMin"
        :max="rangeMax"
        :step="rangeStep"
      >
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import FilterResetBtn from '@/components/catalog/filters/filter-reset-btn';
import { getRangeMin, getRangeMax, getDevider } from '@/assets/js/util';
import DescriptionTooltip from "@/components/common/description-tooltip";

const DEBOUNCE_TIME = 1000;

export default {
  components: {
    DescriptionTooltip,
    'filter-reset-btn': FilterResetBtn
  },
  props: {
    filter: Object,
  },
  data() {
    return {
      rangeMin: 0,
      rangeMax: 100,
      selectedMin:  0,
      selectedMax: 100,
      progressOnePercent: 1,
      title: this.filter.propertyType.shortName,
      filterSemanticId: this.filter.propertyType.semanticId,
      precision: this.filter.propertyType.precision,
      rangeStep: 1,
      isUpdateFilterHolded: false,
      measure: this.filter.propertyType.measure || '',
    }
  },
  computed: {
    minValue: {
      get() {
        return this.selectedMin;
      },
      set(newValue) {
        this.setNewMin(Number(newValue));
      },
    },
    maxValue: {
      get() {
        return this.selectedMax;
      },
      set(newValue) {
        this.setNewMax(Number(newValue));
      }
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
      this.rangeStep = this.precision > 0 ?
                        this.filter.propertyType.rangeStep / getDevider(this.precision) :
                        this.filter.propertyType.rangeStep;

      this.rangeMin = Number(this.filter.propertyValues.min.toFixed(this.precision));
      this.rangeMax = Number(this.filter.propertyValues.max.toFixed(this.precision));

      this.progressOnePercent = (this.rangeMax - this.rangeMin) / 100;

      const rawSelectedMin = getRangeMin(this.filter.propertyValues.selectedMin, this.rangeMin, this.rangeMax);
      this.selectedMin = Number(rawSelectedMin.toFixed(this.precision));

      const rawSelectedMax = getRangeMax(this.filter.propertyValues.selectedMax, this.rangeMin, this.rangeMax);
      this.selectedMax = Number(rawSelectedMax.toFixed(this.precision));

      this.updateMinAndProgress(this.selectedMin);
      this.updateMaxAndProgress(this.selectedMax);
    },
    updateFilterDebounced: debounce(function() {
      this.updateFilter();
    }, DEBOUNCE_TIME),
    setNewMin(newValue) {
      const value = this.getNewMinValue(newValue);
      this.updateMinAndProgress(value);

      if (this.isUpdateFilterHolded) return;

      this.updateFilterDebounced();
    },
    setNewMax(newValue) {
      const value = this.getNewMaxValue(newValue);
      this.updateMaxAndProgress(value);

      if (this.isUpdateFilterHolded) return;

      this.updateFilterDebounced();
    },
    getNewMinValue(newValue) {
      let result;

      if (newValue === null || newValue < this.rangeMin) {
        result = this.rangeMin;
      } else if (newValue >= this.selectedMax) {
        result = this.selectedMax;
      } else {
        result = newValue;
      }

      return result;
    },
    getNewMaxValue(newValue) {
      let result;

      if (newValue === null || newValue > this.rangeMax ) {
        result = this.rangeMax;
      } else if (newValue <= this.selectedMin) {
        result = this.selectedMin;
      } else {
        result = newValue;
      }

      return result;
    },
    updateMinAndProgress(newValue) {
      this.selectedMin = newValue;
      this.drawMinProgress();
    },
    updateMaxAndProgress(newValue) {
      this.selectedMax = newValue;
      this.drawMaxProgress();
    },
    drawMinProgress() {
      this.$refs.minProgress.style.width = this.calculateMinProgressWidth();
    },
    drawMaxProgress() {
      this.$refs.maxProgress.style.width = this.calculateMaxProgressWidth();
    },
    calculateMinProgressWidth() {
      return `${(this.selectedMin - this.rangeMin) / this.progressOnePercent}%`;
    },
    calculateMaxProgressWidth() {
      return `${(this.rangeMax - this.selectedMax) / this.progressOnePercent}%`;
    },
    resetRanges() {
      this.updateMinAndProgress(this.rangeMin);
      this.updateMaxAndProgress(this.rangeMax);
      this.clearFilter();
    },
    clearFilter() {
      this.$emit('on-filter-change', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: null
      });
    },
    updateFilter() {
      if (this.isUpdateFilterHolded) {
        this.releaseUpdateFilter();
      }

      if (
        this.selectedMin === this.rangeMin &&
        this.selectedMax === this.rangeMax
      ) {
        return this.clearFilter();
      }

      this.$emit('on-filter-change', {
        id: this.filter.propertyType.id,
        type: this.filter.type,
        values: {
          [`range.${this.filterSemanticId}`]: `${this.selectedMin}~${this.selectedMax}`
        } || null
      });
    },
    holdUpdateFilter() {
      this.isUpdateFilterHolded = true;
    },
    releaseUpdateFilter() {
      this.isUpdateFilterHolded = false;
    }
  }
}
</script>

<style lang="scss">
/**
* За основу взят пример Аны Тюдор
* https://css-tricks.com/multi-thumb-sliders-particular-two-thumb-case/
*/
@mixin thumb() {
  border: none;
  /* get rid of Firefox thumb border */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* get rid of Firefox corner rounding */
  background: radial-gradient(circle, #ffffff 4px, var(--thumb-color) 5px);
  pointer-events: auto;
  cursor: pointer;
}

@mixin track() {
  width: 100%;
  height: 100%;
  background: none;
}

@mixin value() {
  display: flex;
  align-items: center;
  width: 78px;
  height: 18px;
  padding: 6px 11px;

  color: $text-black;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;

  background-color: #ffffff;
  border: 1px solid $grey;
  border-radius: 4px;
  outline-color: $azure;
  cursor: text;
}

@mixin progress() {
  content: "";
  position: absolute;
  top: -12px;
  z-index: 2;

  width: 0;
  height: 4px;

  border-radius: 4px;
  background-color: $grey;
}

.double-range {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  max-width: 390px;
  min-width: 236px;
  padding: 12px 0;

  color: $text-black;
}

.double-range__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-bottom: 12px;
}

.double-range__title {
  position: relative;
  width: 100%;
  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
  pointer-events: none;
}

/*
Блок с input'ами для чисел
*/
.double-range__inputs-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.double-range__value {
  position: relative;

  /* stylelint-disable */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  /* stylelint-enable */
}

.double-range__value:first-child {
  margin-right: 12px;
}

.double-range__value:last-child {
  margin-left: 12px;
}

/*
Input для ввода числа
*/
.double-range__value-input {
  @include value;

  position: relative;
}

/*
Визуальная копия input'а для ввода числа,
но для отображения локализованного значения
*/
.double-range__localized-value {
  @include value;

  position: absolute;
  top: 0;
  left: 0;
}

.double-range__value-input:focus ~ .double-range__localized-value {
  z-index: -1;
}

/*
Блок с 2-мя range'ами
*/
.double-range__ranges-wrapper {
  position: relative;

  display: grid;
  grid-template-rows: 20px;
  width: 100%;

  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 8.5px;
    left: 0;
    right: 0;

    width: 100%;
    height: 3px;

    background-color: $azure;
    border-radius: 3px;
  }
}

/*
Нативный Range и его перестилизованный ползунок
*/
.double-range__range {
  --thumb-color: #13b8ae;
  position: relative;
  z-index: 2;

  grid-column: 1;
  grid-row: 1;
  margin: 0;

  background: none;

  pointer-events: none;
  outline: none;

  /* stylelint-disable */
  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb,
  & {
    -webkit-appearance: none;
  }
  /* stylelint-enable */

  &::-webkit-slider-runnable-track {
    @include track;
  }

  &::-moz-range-track {
    @include track;
  }

  &::-webkit-slider-thumb {
    @include thumb;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &:hover,
  &:focus {
    z-index: 3;
    --thumb-color: #0d9a9e;
  }
}

.double-range__range--min {
  padding-right: 20px;
}

.double-range__range--max {
  padding-left: 20px;
}

/*
Прогресс-бар
*/
.double-range__range-progress-wrapper {
  position: relative;
  width: calc(100% - 20px);
}

.double-range__min-range-progress {
  @include progress();

  left: 0;
}

.double-range__max-range-progress {
  @include progress();

  right: -20px;
}
</style>
