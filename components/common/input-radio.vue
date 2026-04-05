<template>
  <label class="grt-radio__control" :class="{ 'grt-radio__control--error': v.$error }">
    <input
      v-model="text"
      type="radio"
      :name="name_radio"
      :required="required"
      :value="value_radio"
    />
    <span class="grt-radio__control-icon"></span>
    <span class="grt-radio__control-text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    required: Boolean,
    value_radio: String,
    name_radio: String,

    v: {
      type: Object,
      required: false
    },
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      }
    },
  },
}
</script>

<style lang="scss">

.grt-radio__control {
  display: flex;
  flex-flow: row;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;

  &:hover .grt-radio__control-icon {
    background: $grt-blue;
    transition: background ease-out 250ms;
  }

  &-text {
    position: relative;
    font-size: 14px;
    color: #000000;
  }

  &-icon {
    position: relative;
    height: 12px;
    width: 12px;
    margin: 0 15px 0 0;
    background: $text-grey;
    border-radius: 50%;
    transition: background ease-out 250ms;

    &::after {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      display: block;
      width: 8px;
      height: 8px;
      background: $white;
      border-radius: 50%;
      transform: scale(1);
      transition: transform ease-out 250ms;
    }
  }

  >input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked {
      & + .grt-radio__control-icon {
        background: $grt-blue;
        transition: background ease-out 250ms;

        &::after {
          transform: scale(0.5);
          transition: all ease-in 250ms;
        }
      }
    }
  }
}
</style>

