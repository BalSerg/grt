<template>
  <div>
    <i18n path="login.password_recovery_via_email_3" tag="p" class="entry-point__message">
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
</template>

<script>
export default {
  props: {
    username: String
  },
  computed: {
    email() {
      return this.username;
    }
  }
}
</script>
