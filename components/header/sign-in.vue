<template>
  <div class="entry-point">
    <h2 class="entry-point__header">{{ $t('header.sign_in_title') }}</h2>

    <div v-if="message" class="entry-point__message entry-point__message--error">
      {{ message }}
    </div>

    <form novalidate @submit.prevent="submit">
      <div class="entry-point__email">
        <InputEmail
          v-model="form.email"
          :v="$v.form.email"
          :error-message="emailErrorMessage"
        >
          <template v-if="isRegistrationConfirmRequired" #action>
            <div class="grt-text-input__message grt-text-input__message--persistent">
              <button
                type="button"
                class="grt-text-input__password-recovery-btn"
                @click="openSendEmailWithRegistration"
              >{{ $t('login.send_email_again') }}</button>
            </div>
          </template>
        </InputEmail>
      </div>
      <div class="entry-point__password">
        <InputPassword
          v-model="form.password"
          :v="$v.form.password"
          @onPasswordRecoveryClick="openPasswordRecovery"
        />
      </div>
      <button class="grt-btn grt-btn--filled grt-btn--block" type="submit">
        {{ $t('header.sign_in') }}
      </button>
    </form>

    <button class="entry-point__sign-up" @click="openSignUp">
      {{ $t('header.sign_up') }}
    </button>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { ModalBus } from '@/event-bus/modal-bus';

import InputEmail from '@/components/common/input-email';
import InputPassword from '@/components/common/input-password';
import PasswordRecovery from '@/components/header/password-recovery';
import ResendEmail from '@/components/common/resend-email';
import SignUp from '@/components/header/sign-up';


export default {
  components: {
    InputEmail,
    InputPassword
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      message: '',
      emailErrorMessage: this.$t('login.enter_email'),
      isRegistrationConfirmRequired: false
    };
  },

  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      this.$axios
        .post('napi/auth/login', {
          username: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.$store.dispatch('userData/fetchUserData');
          ModalBus.$emit('close');
        })
        .catch(err => {
          if (err.response.data.result && err.response.data.result.isRegistrationConfirmRequired) {
            this.isRegistrationConfirmRequired = true;
          } else {
            this.isRegistrationConfirmRequired = false;
          }

          if (err.response.data) {
            return (this.message = err.response.data.errors[0]);
          }

          this.message = err;
        });
    },
    openSignUp() {
      ModalBus.$emit('open', {
        component: SignUp
      });
    },
    openPasswordRecovery() {
      ModalBus.$emit('open', {
        component: PasswordRecovery,
        props: { username: this.form.email }
      });
    },
    openSendEmailWithRegistration() {
      ModalBus.$emit('open', {
        component: ResendEmail,
        props: { username: this.form.email }
      });
    }
  }
};
</script>

<style lang="scss">
.entry-point {
  position: relative;

  @media (min-width: 768px) {
    width: 330px;
  }
}

.entry-point__header {
  margin-bottom: 18px;

  font-weight: 600;
  font-size: 18px;
  line-height: 1.4;
  color: $text-black;

  @media (min-width: 768px) {
    margin-bottom: 24px;

    font-size: 23px;
    line-height: 1.5;
  }
}

.entry-point__email {
  margin-bottom: 14px;
}

.entry-point__password {
  margin-bottom: 14px;
}

.entry-point__sign-up {
  display: block;
  width: 100%;
  margin-top: 21px;
  padding: 0;

  font-family: $main-font-family;
  text-align: center;
  font-size: 13px;
  line-height: 1.4;
  color: $grt-blue;

  appearance: none;
  background-color: transparent;
  cursor: pointer;
}

.entry-point__socials-title-wrapper {
  position: relative;

  display: flex;
  justify-content: center;
  margin-top: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 9px;
    left: 0;

    width: 100%;
    height: 1px;

    background-color: #e9e9e9;
  }
}
// TODO: Доделать социальные сети
.entry-point__socials-title {
  position: relative;
  z-index: 2;

  display: inline-block;
  width: auto;
  padding: 0 8px;

  font-size: 13px;
  line-height: 18px;
  vertical-align: middle;
  color: $text-black;

  background-color: #ffffff;
}

.entry-point__message {
  font-size: 13px;
  line-height: 140%;
  color: $text-black;

  &--error {
    margin-top: -12px;
    margin-bottom: 20px;

    color: $coral;
  }
}
</style>
