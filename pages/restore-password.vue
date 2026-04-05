<template>
  <main class="page-main">
    <div class="container">
      <component :is="componentId"></component>
    </div>
  </main>
</template>

<script>
import RestorePasswordForm from '@/components/common/restore-password-form';
import RestorePasswordExpired from '@/components/common/restore-password-expired';

export default {
  components: {
    RestorePasswordForm,
    RestorePasswordExpired
  },
  data() {
    return {
      componentId: ''
    };
  },
  async fetch() {
    await this.$axios
      .post('napi/auth/restore/check', this.$route.query)
      .then(response => {
        this.componentId = 'RestorePasswordForm';
      })
      .catch(err => {
        this.componentId = 'RestorePasswordExpired';
      });
  },
  head() {
    return {
      title: `GlobalRusTrade - ${this.$t('login.password_recovery')}`
    };
  }
};
</script>
