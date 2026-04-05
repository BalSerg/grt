<template>
  <div class="counter-input grt-text-input" :class="classes">
    <p class="counter-input__label">
      <slot> {{$t('enter_quantity')}} </slot>
    </p>
    <client-only>
      <VueNumberInput v-model="goodsCount" :min="1" inline controls/>
    </client-only>
  </div>
</template>
<script>
import VueNumberInput from '@chenfengyuan/vue-number-input';

export default {
  components: {
    VueNumberInput
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    classes: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    goodsCount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style lang="scss">
.counter-input {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: $main-font-family;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.4;
  color: $text-black;


  .number-input {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .number-input__button {
      width: 22px;
      height: 22px;
      padding: 0;

      color: #bebebe;

      border: 1px solid #e9e9e9;
      border-radius: 4px;
      background-color: #f4f4f4;
      cursor: pointer;

      &:hover {
        &::before,
        &::after {
          background-color: $grt-blue;
        }
      }
    }

    .number-input__input {
      width: 77px;
      flex-shrink: 0;
      padding: 0 3px;

      text-align: center;
      font-family: $main-font-family;
      font-size: 13px;
      line-height: 1.4;

      border: none;
    }
  }
}

.counter-input__label {
  margin: 0;
}
</style>
