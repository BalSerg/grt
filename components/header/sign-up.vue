<template>
  <div class="entry-point">
    <h2 class="entry-point__header">{{ $t('login.registration') }}</h2>
    <div
      v-if="message"
      class="entry-point__message entry-point__message--error"
    >
      {{ message }}
    </div>

    <form novalidate @submit.prevent="submit">
      <div class="entry-point__email">
        <InputEmail v-model.lazy="form.email" :v="$v.form.email" />
      </div>
      <div class="entry-point__password">
        <InputPasswordNew v-model.lazy="form.password" :v="$v.form.password" />
      </div>
      <div class="entry-point__password-hint">
        <h3 class="entry-point__password-hint-message">
          {{ $t('login.password_requirement.message') }}
        </h3>
        <ul class="entry-point__password-hint-list">
          <li class="entry-point__password-hint-item">
            <input
              class="entry-point__password-hint-input"
              type="checkbox"
              :checked="$v.form.password.minLength && $v.form.password.required"
            />
            <label class="entry-point__password-hint-label">
              {{ $tc('login.password_requirement.min_length', passwordMinLength) }}
            </label>
          </li>
          <li class="entry-point__password-hint-item">
            <input
              class="entry-point__password-hint-input"
              type="checkbox"
              :checked="$v.form.password.matchPassword && $v.form.password.required"
            />
            <label class="entry-point__password-hint-label">
              {{ $t('login.password_requirement.letters') }}
            </label>
          </li>
          <li class="entry-point__password-hint-item">
            <input
              class="entry-point__password-hint-input"
              type="checkbox"
              :checked="
                $v.form.password.hasFigures && $v.form.password.required
              "
            />
            <label class="entry-point__password-hint-label">
              {{ $t('login.password_requirement.figures') }}
            </label>
          </li>
        </ul>
      </div>

      <div class="entry-point__agreement">
        <label
          class="grt-checkbox"
        >
          <input
            v-model="form.agreesWithSubscribe"
            class="grt-checkbox__input"
            type="checkbox"
          />
          <svg
            class="grt-checkbox__icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="grt-checkbox__bg"
              d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2Z"
              stroke="#bebebe"
              fill="none"
            />
            <path
              class="grt-checkbox__checkmark"
              d="M7.13965 10.8596C6.87965 11.1196 6.45965 11.1196 6.19965 10.8596L3.80632 8.46622C3.68148 8.34166 3.61133 8.17256 3.61133 7.99622C3.61133 7.81987 3.68148 7.65077 3.80632 7.52622C4.06632 7.26622 4.48632 7.26622 4.74632 7.52622L6.66632 9.44622L11.253 4.85955C11.513 4.59955 11.933 4.59955 12.193 4.85955C12.453 5.11955 12.453 5.53955 12.193 5.79955L7.13965 10.8596Z"
              fill="none"
            />
            <rect
              class="grt-checkbox__outline"
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="0.5"
              stroke="none"
            />
          </svg>
          <span class="grt-checkbox__label">
            {{$t('login.receive_personal_offers')}}
          </span>
        </label>
      </div>

      <button class="grt-btn grt-btn--filled grt-btn--block" type="submit">
        {{ $t('login.register_now') }}
      </button>
    </form>

    <button class="entry-point__sign-up" @click="openSignIn">
      {{ $t('header.sign_in') }}
    </button>

    <p class="entry-point__footer-agreement">
      {{ $t('login.accept_terms.accept') }}
      <nuxt-link :to="localePath(`/docs/terms-of-use`)">{{ $t('login.accept_terms.agreement') }}</nuxt-link>
    </p>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import SignIn from './sign-in';
import SignUpConfirmMessage from './sign-up-confirm-message';
import { ModalBus } from '@/event-bus/modal-bus';
import { PasswordRequirements } from '@/assets/js/const';

import InputEmail from '@/components/common/input-email';
import InputPasswordNew from '@/components/common/input-password-new';


export default {
  components: {
    InputEmail,
    InputPasswordNew
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        agreesWithSubscribe: true
      },
      message: '',
      passwordMinLength: PasswordRequirements.MIN_LENGTH
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(PasswordRequirements.MIN_LENGTH),
        hasFigures(password) {
          return PasswordRequirements.HAS_FIGURES_REGEXP.test(password);
        },
        matchPassword(password) {
          const result = PasswordRequirements.REGEXP.test(password);
          return result;
        }
      }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      const axios = this.$axios.create();
      axios.onError = () => {};

        axios
        .post('napi/auth/register', {
          username: this.form.email,
          password: this.form.password,
          mailAgreement: this.form.agreesWithSubscribe
        })
        .then(() => {
          ModalBus.$emit('open', {
            component: SignUpConfirmMessage,
            props: { username: this.form.email }
          });
        })
        .catch(err => {
          this.message = err.response.data.errors[0];
        });
    },
    openSignIn() {
      ModalBus.$emit('open', {
        component: SignIn,
      });
    }
  }
};
</script>

<style lang="scss">
.entry-point__password-hint {
  display: flex;
  align-items: baseline;
  margin-bottom: 24px;
}

.entry-point__password-hint-message {
  flex: 0 0 50%;

  font-size: 11px;
  line-height: 1.8;
  color: $text-black;
}

.entry-point__password-hint-list {
  flex: 0 0 50%;
  margin: 0;
  padding: 0;
  padding-left: 21px;

  list-style: none;
}

.entry-point__password-hint-item {
  position: relative;
}

.entry-point__password-hint-label {
  font-size: 11px;
  line-height: 1.4;
  color: $text-black;

  &::before {
    content: "";
    position: absolute;
    top: 7px;
    left: -16px;
    z-index: 1;

    width: 10px;
    height: 10px;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 10'%3E%3Cdefs/%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath fill='%237E7E7E' d='M3.83 8.74a.5.5 0 01-.72 0L.22 5.85a.77.77 0 010-1.08l.37-.36c.3-.3.78-.3 1.08 0l1.8 1.8 4.86-4.87c.3-.3.79-.3 1.08 0l.37.37c.3.3.3.78 0 1.08L3.83 8.74z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Cpath fill='%23fff' d='M0 0h10v10H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ffffff;
  }
}

.entry-point__password-hint-input {
  position: absolute;
  top: 7px;
  left: -16px;
  z-index: 0;

  width: 2px;
  height: 2px;

  visibility: hidden;
}

.entry-point__password-hint-input:checked ~ .entry-point__password-hint-label::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 10'%3E%3Cdefs/%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath fill='%23219653' d='M3.83 8.74a.5.5 0 01-.72 0L.22 5.85a.77.77 0 010-1.08l.37-.36c.3-.3.78-.3 1.08 0l1.8 1.8 4.86-4.87c.3-.3.79-.3 1.08 0l.37.37c.3.3.3.78 0 1.08L3.83 8.74z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Cpath fill='%23fff' d='M0 0h10v10H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
}

.entry-point__agreement {
  position: relative;

  margin-bottom: 14px;

  font-size: 13px;
  line-height: 1.4;
  color: $text-black;
}

.entry-point__agreement-input {
  position: absolute;
  top: 5px;
  left: 0;

  width: 10px;
  height: 10px;
  margin: 0;
  margin-left: 1px;
}

.entry-point__agreement-label {
  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
    z-index: 2;

    box-sizing: border-box;
    width: 12px;
    height: 12px;

    border: 2px solid;
    border-color: #dadada;
    border-radius: 2px;
    background-color: #ffffff;
  }
}

.entry-point__agreement-input:checked ~ .entry-point__agreement-label::before {
  border: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 12 12'%3E%3Cdefs/%3E%3Cpath fill='%23007AFF' fill-rule='evenodd' d='M1.333 0h9.334C11.4 0 12 .6 12 1.333v9.334C12 11.4 11.4 12 10.667 12H1.333C.6 12 0 11.4 0 10.667V1.333C0 .6.6 0 1.333 0zM4.2 8.86c.26.26.68.26.94 0l5.054-5.06a.664.664 0 10-.94-.94L4.666 7.446l-1.92-1.92a.664.664 0 10-.94.94L4.2 8.86z' clip-rule='evenodd'/%3E%3C/svg%3E");
}

.entry-point__footer-agreement {
  margin-top: 12px;

  font-size: 11px;
  line-height: 1.4;
  text-align: center;
  color: $text-grey;
}
</style>
