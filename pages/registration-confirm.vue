<template>
  <client-only>
    <main class="page-main message-page">
      <div class="container message-page__container">
        <h1 v-if="isRegistrationSuccessful" class="grt-h1 message-page__header">{{$t('login.registration_successful')}}</h1>
        <h1 v-else class="grt-h1 message-page__header">{{errorMessage}}</h1>
        <nuxt-link :to="localePath('/')">{{$t('login.go_to_mainpage')}}</nuxt-link>
      </div>
    </main>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      isRegistrationSuccessful: true,
      errorMessage: ''
    }
  },
  head() {
    return {
      title: `GlobalRusTrade - ${this.$t('login.registration_confirm')}`
    };
  },
  mounted() {
    this.$axios.post('napi/auth/validate/', this.$route.query)
      .then(response => {
        this.isRegistrationSuccessful = true;
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.errors.length > 0) {
          this.errorMessage = err.response.data.errors[0];
        }
        this.isRegistrationSuccessful = false;
      });
  }
}
</script>

<style lang="scss">
.message-page__container {
  margin-top: 24px;
  height: 60vh;
  min-height: 360px;
}

.message-page__header {
  margin-bottom: 16px;
}
</style>
