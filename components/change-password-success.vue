<template>
  <div>
    <div class="entry-point__password-hint entry-point__password-hint--column restore-password__password-hint">
      <div class="entry-point__password-hint-message">
        <p>{{$t('login.password_change_success_message')}}</p>
      </div>
    </div>
    <button class="grt-btn grt-btn--filled" type="button" @click="redirectToMainPage">{{$t('login.go_to_website')}}</button>
  </div>
</template>

<script>
const TIMEOUT_BEFORE_REDIRECT = 5000;

export default {
  methods: {
    redirectToMainPage() {
      this.$router.push(this.localePath('/'));
    }
  }
}
</script>
