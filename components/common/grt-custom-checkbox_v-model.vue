<template>
  <label :class="{'full-width': checkboxToLeftTop}" class="grt-custom-checkbox">
    <input v-model="computedData"
           :disabled="disabled"
           :value="disabled ? false : value"
           class="grt-custom-checkbox__input"
           type="checkbox"
    />
    <svg :class="{'checkbox-to-left-top': checkboxToLeftTop}" class="grt-custom-checkbox__svg" fill="none" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path
        :class="{'error-border': isError}"
        class="grt-custom-checkbox__svg-border"
        d="M16 0H2a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V2a2 2 0 00-2-2z"
        fill="#007aff"
      />
      <path class="grt-custom-checkbox__svg-bg" d="M15 16H3a1 1 0 01-1-1V3c0-.5.5-1 1-1h12c.6 0 1 .5 1 1v12c0 .6-.4 1-1 1z" fill="#ffffff"/>
      <path class="grt-custom-checkbox__svg-checkmark" d="M7.6 13.7a1 1 0 01-1.5 0L2.3 9.9a1 1 0 010-1.4 1 1 0 011.5 0l3 3 7.4-7.2a1 1 0 011.5 0c.4.4.4 1 0 1.5l-8 7.9z" fill="none"/>
    </svg>
    <slot/>
  </label>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean]
    },
    isError: {
      type: Boolean,
      default: false
    },
    getFunction: {
      type: Function,
      default: () => console.log('getFunction no work')
    },
    setFunction: {
      type: Function,
      default: val => console.log('val = ', val)
    },
    checkboxToLeftTop: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    computedData: {
      get() {
        return this.getFunction()
      },
      set(newVal) {
        this.setFunction(newVal)
      }
    }
  }
}
</script>

<style lang="scss">
.grt-custom-checkbox {
  width: fit-content;
  height: 100%;
  --cb-size: 18px;

  display: flex;
  align-items: center;
  column-gap: 19px;

  cursor: pointer;
}

.full-width {
  width: 100%;
}

.grt-custom-checkbox__input {
  width: var(--cb-size);
  height: var(--cb-size);
  flex-shrink: 0;
  margin: 0;

  visibility: hidden;
  cursor: pointer;
}

.checkbox-to-left-top {
  align-self: flex-start;
}

.grt-custom-checkbox__svg {
  width: var(--cb-size);
  height: var(--cb-size);

  * {
    transition: all 0.1s linear;
  }
}

.grt-custom-checkbox__input:checked + .grt-custom-checkbox__svg {
  .grt-custom-checkbox__svg-bg {
    fill: #2f80ed;
  }

  .grt-custom-checkbox__svg-checkmark {
    fill: $white;
  }
}

.error-border {
  fill: $coral;
}
</style>
