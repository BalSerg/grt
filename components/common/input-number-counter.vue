<template>
  <client-only>
    <div
      class="grt-number-input"
      v-on="listeners"
    >
      <div class="grt-number-input__wrapper">
        <button
          class="grt-number-input__button grt-number-input__button--minus"
          :class="{'disabled' : !isDecreasable}"
          type="button"
          @click="decrease"
        >
          <span class="visually-hidden">{{ $t('to_reduce') }}</span>
          <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M.84 1.84V.51h4.31v1.33H.84z" fill="#7E7E7E"/>
          </svg>
        </button>
        <span>
          <slot></slot>
          <input v-bind="attrs"
                 id="grt-number-input"
                 ref="input"
                 class="grt-number-input__input"
                 type="number"
                 inputmode="numeric"
                 :name="name"
                 :value="currentValue"
                 :min="0"
                 :max="max"
                 :step="step"
                 :readonly="readonly || !inputtable"
                 :placeholder="placeholder"
                 autocomplete="off"
                 :style="`--digits-count: ${digitsCount}`"
                 @focus="selectAll"
                 @change="change"
                 @paste="paste"
          >
        </span>

        <button
          class="grt-number-input__button grt-number-input__button--plus"
          :class="{'disabled' : !isIncreasable}"
          type="button"
          @click="increase"
        >
          <span class="visually-hidden">{{ $t('to_enlarge') }}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.59 4.05H9.2v1.21H5.59V9H4.37V5.26H.77V4.05h3.6V.29h1.22v3.76z" fill="#7E7E7E"/>
          </svg>
        </button>
      </div>

      <template v-if="hasLabel">
        <slot>
          <label class="grt-number-input__label" for="grt-number-input">{{ $t('enter_quantity') }}</label>
        </slot>
      </template>
    </div>
  </client-only>
</template>

<script>
const isNaN = Number.isNaN || window.isNaN;
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/;
const normalizeDecimalNumber = (value, times = 100000000000) => (
  REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value
);

export default {
  name: 'NumberInput',
  model: {
    event: 'change',
  },
  props: {
    attrs: {
      type: Object,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputtable: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    readonly: Boolean,
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: NaN,
    },
    hasLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMounted: false,
      currentValue: NaN,
    };
  },
  computed: {
    digitsCount() {
      return this.currentValue.toString().length;
    },
    isIncreasable() {
      const num = this.currentValue;
      return isNaN(num) || num < this.max;
    },
    isDecreasable() {       // функция работает не верно.
      const num = this.currentValue;
      return isNaN(num) || num > this.min;
    },
    listeners() {
      const listeners = {...this.$listeners};
      delete listeners.change;
      return listeners;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (
          // Avoid triggering change event when created
          !(isNaN(newValue) && typeof oldValue === 'undefined')

          // Avoid infinite loop
          && newValue !== this.currentValue
        ) {
          this.setValue(newValue);
        }
      },
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    selectAll(event) {
      event.target.select();
    },
    change(event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)));
    },
    paste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;

      if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
        event.preventDefault();
      }
    },
    decrease() {
      if(this.disabled)
        return

      if (this.min < this.currentValue) {
        this.setValue(Math.min(this.max, Math.max(
          this.min,
          normalizeDecimalNumber(this.currentValue - this.step),
        )));
      }
    },
    increase() {
      if(this.disabled)
        return

      if (this.isIncreasable) {
        let {currentValue} = this;

        if (isNaN(currentValue)) {
          currentValue = 0;
        }

        this.setValue(Math.min(this.max, Math.max(
          this.min,
          normalizeDecimalNumber(currentValue + this.step),
        )));
      }
    },
    setValue(value) {
      const oldValue = this.currentValue;
      let newValue = this.rounded ? Math.round(value) : value;

      if (this.min <= this.max) {
        newValue = Math.min(this.max, Math.max(this.min, newValue));
      }

      this.currentValue = newValue;

      if (newValue === oldValue) {
        // Force to override the number in the input box.
        this.$refs.input.value = newValue;
      }

      if (this.isMounted) {
        this.$emit('change', newValue, oldValue);
      }
    },
  }
};
</script>

<style lang="scss">
.grt-number-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0;
}

.grt-number-input__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  background-color: $light-grey-ui;
  border-radius: 3px;
}

.grt-number-input__button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 33px;
  height: 40px;
  padding: 0;

  background-color: $light-grey-ui;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover svg *,
  &:focus svg * {
    fill: $text-black;
    transition: all 0.3s ease;
  }

  &.disabled {
    opacity: 0.35;
    cursor: default;

    & svg {
      path {
        fill: $text-black;
      }
    }
  }
}

.grt-number-input__label {
  margin-left: 8px;

  font-size: 13px;
  line-height: 1.4;

  @media (min-width: $desktop-mid) {
    margin-left: 24px;
  }

  @media (min-width: $desktop-large) {
    font-size: 14px;
  }
}

.grt-number-input__input {
  --digits-count: 1;
  --digit-width: 8px;

  -moz-appearance: textfield;
  display: flex;
  width: calc(var(--digit-width) * var(--digits-count));
  min-width: 24px;
  margin: 0 2px;
  padding: 0;

  font-family: $main-font-family;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  color: $text-black;

  background-color: $light-grey-ui;
  border: 1px solid $light-grey-ui;

  transition: border-color 0.15s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>
