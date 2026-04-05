<template>
  <div class="grt-text-input">
    <div
      :class="{ 'grt-text-input__control--error': v.$error }"
      class="grt-text-input__control"
    >
      <div class="grt-text-input__slot">
        <div class="grt-text-input__field">
          <input
            :id="uniqueIDPrefixForText"
            v-model="text"
            :class="{'er-form': v.$error || isInvalid || isfieldNoDirty, 'val-form': !v.$invalid && text}"
            :disabled="disabled"
            class="grt-text-input__input"
            type="text"
            @blur="v.$touch()"
          />
          <label
            :class="{ 'grt-text-input__label--focus': text }"
            :for="uniqueIDPrefixForText"
            class="grt-text-input__label"
            >{{ pseudo_placeholder }}<span v-if="required">*</span></label
          >
        </div>
      </div>
      <div class="grt-text-input__messages">
        <div class="grt-text-input__message">{{ error_message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const getRandomIntFromZeroToTenThounsand = () => {
  const min = 0;
  const max = 10000;
  return Math.floor(Math.random() * (max - min)) + min;
};

export default {
  props: {
    isInvalid: Boolean,
    value: {
      type: String,
      default: '',
    },
    pseudo_placeholder: '',
    error_message: '',
    v: {
      type: Object,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isfieldNoDirty: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      },
    },
    uniqueIDPrefixForText() {
      return `${getRandomIntFromZeroToTenThounsand()}-text`;
    },
  }
};
</script>

<style lang="scss">
.er-form {
  border-color: $coral;
}

.val-form {
  border-color: $azure4;
}

</style>
