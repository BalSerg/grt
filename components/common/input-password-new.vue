<template>
  <div class="grt-text-input">
    <div
      class="grt-text-input__control"
      :class="{ 'grt-text-input__control--error': v.$error }"
    >
      <div class="grt-text-input__slot">
        <div class="grt-text-input__field">
          <input
            :id="uniqueIDPrefixForPassword"
            v-model="password"
            class="grt-text-input__input"
            :type="inputType"
            :disabled="disabled"
          />
          <label
            class="grt-text-input__label"
            :class="{ 'grt-text-input__label--focus': password }"
            :for="uniqueIDPrefixForPassword"
            >{{ $t('login.create_password') }}</label
          >
          <button
            class="grt-text-input__show-password-toggler"
            type="button"
            @click="togglePasswordVisibility"
          ></button>
        </div>
      </div>
      <div class="grt-text-input__messages">
        <div class="grt-text-input__message">
          {{ $t('login.enter_correct_password') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomIntFromZeroToTenThounsand } from '@/assets/js/util';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isError: false,
      errorMessage: '',
      showPassword: false,
    };
  },
  computed: {
    password: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      },
    },
    uniqueIDPrefixForPassword() {
      return `${getRandomIntFromZeroToTenThounsand()}-email`;
    },
    inputType() {
      return this.showPassword ? 'text' : 'password';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss">
.grt-text-input__input:disabled {
  cursor: not-allowed;
}
</style>
