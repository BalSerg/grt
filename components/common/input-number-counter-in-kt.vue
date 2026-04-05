<template>
  <client-only>
    <div
      :class="{
      'grt-number-input__product': !inCatalog,
      'grt-number-input__in-cart': isInCart,
    }"
      class="grt-number-input"
      v-on="listeners"
    >
      <div
        :class="inCatalog ? 'grt-number-input__wrapper__catalog' : 'grt-number-input__wrapper__product'"
        class="grt-number-input__wrapper"
      >
        <button
          :class="{
          'disabled' : !isDecreasable,
          'grt-number-input__button__catalog': inCatalog,
          'grt-number-input__button__product': !inCatalog
          }"
          class="grt-number-input__button grt-number-input__button--minus"
          type="button"
          @click="decrease"
        >
          <span class="visually-hidden">{{ $t('to_reduce') }}</span>
          <svg fill="none" height="2" viewBox="0 0 6 2" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M.84 1.84V.51h4.31v1.33H.84z" fill="#7E7E7E"/>
          </svg>
        </button>
        <span>
          <slot></slot>
          <input id="grt-number-input"
                 ref="input"
                 :max="max"
                 :min="0"
                 :name="name"
                 :placeholder="placeholder"
                 :readonly="readonly || !inputtable"
                 :step="step"
                 :style="`--digits-count: ${digitsCount}`"
                 :value="currentValue"
                 autocomplete="off"
                 class="grt-number-input__input"
                 disabled
                 inputmode="numeric"
                 type="number"
                 v-bind="attrs"
                 @change="change"
          >
        </span>

        <button
          :class="{
          'disabled' : !isIncreasable,
          'grt-number-input__button__catalog': inCatalog,
          'grt-number-input__button__product': !inCatalog
          }"
          class="grt-number-input__button grt-number-input__button--plus"
          type="button"
          @click='increase'
        >
          <span class="visually-hidden">{{ $t('to_enlarge') }}</span>
          <svg fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg">
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
    inCatalog: {
      type: Boolean,
      default: false,
    },
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
    },
    productId: {
      type: Number,
      default: NaN,
    },
    isInProductCard: {
      type: Boolean,
      default: false
    },
    isInCart: {
      type: Boolean,
      default: false
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
    change(event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)));
      this.$emit('increaseProducts', {id: this.productId, count: this.currentValue})
    },
    decrease() {
      if (this.disabled) {
        return;
      }

      if (this.currentValue === 1 && !this.isInCart) {
        this.$emit('removeProduct');
        return;
      }

      if (this.min < this.currentValue) {
        this.setValue(Math.min(this.max, Math.max(
          this.min,
          normalizeDecimalNumber(this.currentValue - this.step)
        )));

        if (this.isInProductCard) {
          this.$emit('decreaseProducts', {id: this.productId, count: this.currentValue})
        }
      }
    },
    increase() {
      if (this.disabled)
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

        if (!this.isInCart) {
          if (currentValue === 0) this.$emit('showToast', 'cart.product_added')
          this.$emit('increaseProducts', {id: this.productId, count: currentValue + 1})
        }
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
}

.grt-number-input__product {
  padding: 5px 0;
}

.grt-number-input__in-cart {
  .grt-number-input__wrapper,
  button,
  input,
  span {
    background-color: #f8f8f8;
  }

  .grt-number-input__button--minus,
  .grt-number-input__button--plus {
    border: 0;
  }
}

.grt-number-input__wrapper {
  display: flex;
  align-items: center;

  background-color: $white;
  border-radius: 3px;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
}

.grt-number-input__wrapper__catalog {
  width: 100%;
  justify-content: space-between;
  height: 38px;
}

.grt-number-input__wrapper__product {
  width: fit-content;
  justify-content: center;
}

.grt-number-input__button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 33px;
  padding: 0;

  background-color: $white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover svg *,
  &:focus svg *,
  svg * {
    fill: $text-black;
    transition: all 0.3s ease;
  }

  &--minus {
    border-right: 1px solid #dfdfdf;
  }

  &--plus {
    border-left: 1px solid #dfdfdf;
  }

  &:hover {
    background-color: $mid-grey-ui;
  }

  &.disabled {
    &:hover {
      background-color: transparent;
    }

    svg {
      path {
        fill: $text-black;
      }
    }
  }
}

.grt-number-input__button__catalog {
  height: 36px;
}

.grt-number-input__button__product {
  height: 40px;
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

  background-color: $white;
  border: 0;

  transition: border-color 0.15s;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[readonly] {
    background-color: #f8f8f8;
  }
}
</style>
