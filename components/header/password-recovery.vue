<template>
  <section class="entry-point">
    <h2 class="entry-point__header">{{$t('login.password_recovery')}}</h2>
    <component
      :is="componentId"
      :username="email"
      @onSuccessPasswordRecoveryQuery="showSentEmailMessage"
    ></component>
  </section>
</template>

<script>
import SentEmailMessage from '@/components/header/sent-email-message';
import PasswordRecoveryForm from '@/components/header/password-recovery-form';


export default {
  components: {
    SentEmailMessage,
    PasswordRecoveryForm
  },
  props: {
    username: String
  },
  data() {
    return {
      componentId: 'PasswordRecoveryForm',
      email: this.username
    }
  },
  computed: {
    usernameAsEmail() {
      return this.username;
    }
  },
  methods: {
    closeModal() {
      this.$parent.$emit('onModalPopupClose');
    },
    showSentEmailMessage(email) {
      this.email = email;
      this.componentId = 'SentEmailMessage';
    }
  },
}
</script>
