<template>
  <section class="entry-point">
    <h2 class="entry-point__header">{{$t('login.resend_email')}}</h2>
    <div v-if="!isEmailSent">
      <i18n path="login.resend_email_instructions" tag="p" class="entry-point__message">
        <template #email>
          <b>{{email}}</b>
        </template>
      </i18n>

      <form novalidate @submit.prevent="submit">
        <div class="entry-point__email entry-point__email--margin-top">
          <InputEmail v-model="email" :v="$v.email" />
        </div>
        <button
          class="grt-btn grt-btn--filled grt-btn--block entry-point__password-to-email-btn"
          type="submit"
        >
          {{ $t('login.send') }}
        </button>
      </form>
    </div>

    <div v-if="isEmailSent">
      <i18n path="login.resend_email_instructions_after_submit" tag="p" class="entry-point__message">
        <template #email>
          <b>{{email}}</b>
        </template>
      </i18n>
      <details class="details-message">
        <summary class="details-message__title">{{$t('login.didnt_get_email')}}</summary>
        <ul class="details-message__list">
          <li class="details-message__text details-message__text--check">{{$t('login.check_spam')}}</li>
          <li class="details-message__text details-message__text--check">{{$t('login.check_spelling')}}</li>
          <li class="details-message__text details-message__text--check">{{$t('login.request_resend')}}</li>
          <li class="details-message__text details-message__text--check">{{$t('login.didnt_help')}} <a href="mailto:support@globalrustrade.com">support@globalrustrade.com</a></li>
        </ul>
      </details>
    </div>

  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import InputEmail from '@/components/common/input-email';

export default {
  components: {
    InputEmail
  },
  props: {
    username: String
  },
  validations: {
    email: { required, email }
  },
  data() {
    return {
      isEmailSent: false,
      email: this.username,
      message: ''
    }
  },
  methods: {
    closeModal() {
      this.$parent.$emit('onModalPopupClose');
    },
    submit() {
      this.$v.email.$touch();

      if (this.$v.email.$pending || this.$v.email.$error) {
        return;
      }

      this.$axios
        .post('napi/auth/resending', { username: this.email })
        .then(response => {
          if (response.data && response.data.success) {
            this.isEmailSent = true;
          }
        })
        .catch(err => {
          if (err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
            return (this.message = err.response.data.errors[0]);
          }

          this.message = err;
        });
    }
  },
}
</script>

<style>
.entry-point__email--margin-top {
  margin-bottom: 0;
}
</style>
