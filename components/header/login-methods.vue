<template>
  <div class="login-methods">
    <p class="login-methods__text">{{ $t('header.enter') }}</p>
    <button
      class="grt-btn grt-btn--filled grt-btn--block grt-btn--small login-methods__enter-btn"
      type="button"
      @click="openSignIn"
    >{{ $t('header.sign_in') }}</button>
    <button class="login-methods__sign-up-link" @click="openSignUp">{{ $t('header.sign_up') }}</button>
  </div>
</template>

<script>

import SignIn from './sign-in';
import SignUp from './sign-up';
import { ModalBus } from '@/event-bus/modal-bus';


export default {
  methods: {
    openSignIn() {
      this.$parent.$emit('on-close');

      ModalBus.$emit('open', {
        component: SignIn
      });
    },
    openSignUp() {
      this.$parent.$emit('on-close');

      ModalBus.$emit('open', {
        component: SignUp
      });
    },
  }
}
</script>

<style lang="scss">
.login-methods {
  @media (min-width: $desktop-mid) {
    width: 220px;
  }
}

.login-methods__text {
  @media (min-width: $desktop-mid) {
    margin-bottom: 12px;

    font-size: 13px;
    line-height: 1.4;
    color: $text-black;
  }
}

.login-methods__enter-btn {
  margin-bottom: 10px;
}

.login-methods__sign-up-link {
  display: inline-block;
  width: 100%;
  padding: 0;

  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  color: $grt-blue;
  font-family: $main-font-family;
  line-height: 1.4;

  background-color: transparent;
  cursor: pointer;
}
</style>
