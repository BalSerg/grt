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
          />
          <label
            class="grt-text-input__label"
            :class="{ 'grt-text-input__label--focus': password }"
            :for="uniqueIDPrefixForPassword"
            >{{ $t('login.password') }}</label
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
        <div
          class="grt-text-input__message grt-text-input__message--persistent"
        >
          <button
            class="grt-text-input__password-recovery-btn"
            type="button"
            @click="openPasswordRecovery"
          >
            {{ $t('login.password_forgot') }}
          </button>
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
    openPasswordRecovery() {
      this.$emit('onPasswordRecoveryClick');
    },
  },
};
</script>

<style lang="scss">
.grt-text-input__message--persistent {
  display: block;
  margin-top: 3px;

  line-height: 1.4;
}

.grt-text-input__show-password-toggler {
  position: absolute;
  top: 50%;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 0;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.898 7.688C15.755 7.493 12.35 2.9 8 2.9S.244 7.493.102 7.688a.528.528 0 000 .622C.244 8.506 3.65 13.098 8 13.098s7.755-4.592 7.898-4.787a.527.527 0 000-.623zM8 12.043c-3.204 0-5.98-3.048-6.8-4.044.82-.997 3.589-4.044 6.8-4.044 3.204 0 5.979 3.048 6.8 4.045-.82.997-3.59 4.043-6.8 4.043z' fill='%237E7E7E'/%3E%3Cpath d='M8 4.836A3.168 3.168 0 004.835 8 3.168 3.168 0 008 11.166 3.168 3.168 0 0011.165 8 3.168 3.168 0 008 4.836zm0 5.275A2.112 2.112 0 015.89 8c0-1.164.946-2.11 2.11-2.11 1.163 0 2.11.946 2.11 2.11 0 1.163-.947 2.11-2.11 2.11z' fill='%237E7E7E'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  transform: translateY(-50%);
}

.grt-text-input__input[type="text"] ~ .grt-text-input__show-password-toggler {
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.898 7.688C15.755 7.493 12.35 2.9 8 2.9S.244 7.493.102 7.688a.528.528 0 000 .622C.244 8.506 3.65 13.098 8 13.098s7.755-4.592 7.898-4.787a.527.527 0 000-.623zM8 12.043c-3.204 0-5.98-3.048-6.8-4.044.82-.997 3.589-4.044 6.8-4.044 3.204 0 5.979 3.048 6.8 4.045-.82.997-3.59 4.043-6.8 4.043z' fill='%237E7E7E'/%3E%3Cpath d='M8 4.836A3.168 3.168 0 004.835 8 3.168 3.168 0 008 11.166 3.168 3.168 0 0011.165 8 3.168 3.168 0 008 4.836zm0 5.275A2.112 2.112 0 015.89 8c0-1.164.946-2.11 2.11-2.11 1.163 0 2.11.946 2.11 2.11 0 1.163-.947 2.11-2.11 2.11z' fill='%237E7E7E'/%3E%3Crect x='1.297' y='1.831' width='1.625' height='18.147' rx='.813' transform='rotate(-42.255 1.297 1.83)' fill='%237E7E7E' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E");
}

.grt-text-input__password-recovery-btn {
  padding: 0;

  font-size: 11px;
  line-height: 1.4;
  color: $grt-blue;
  text-decoration: none;
  text-align: left;

  background-color: transparent;
  cursor: pointer;
}
</style>
