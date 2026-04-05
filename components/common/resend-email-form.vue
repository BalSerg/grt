<template>
  <div>
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
      email: this.username,
      message: ''
    };
  },
  computed: {
    recoveryMessage() {
      return this.message
        ? this.message
        : this.$tc('login.resend_email_instructions', this.username);
    }
  },
  methods: {
    submit() {
      this.$v.email.$touch();

      if (this.$v.email.$pending || this.$v.email.$error) {
        return;
      }

      this.$axios
        .post('napi/auth/restore', { username: this.email })
        .then(response => {
          if (response.data.result === 'ok') {
            return this.$emit('onSuccessPasswordRecoveryQuery', this.email);
          }
        })
        .catch(err => {
          if (err.response.data.errors) {
            return (this.message = err.response.data.errors[0]);
          }

          this.message = err;
        });
    }
  }
};
</script>

<style>
.entry-point__email--margin-top {
  margin-bottom: 0;
}
</style>
