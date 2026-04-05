<template>
  <section class="entry-point">
    <h2 class="entry-point__header">{{$t('login.registration_ending')}}</h2>
    <p class="entry-point__message">{{$t('login.email_confirm_message')}} <b>{{username}}</b> </p>
    <details class="details-message">
      <summary class="details-message__title">{{$t('login.didnt_get_email')}}</summary>
      <ul class="details-message__list">
        <li class="details-message__text details-message__text--check">{{$t('login.check_spam')}}</li>
        <li class="details-message__text details-message__text--check">{{$t('login.check_spelling')}}</li>
        <li class="details-message__text details-message__text--check">{{$t('login.request_resend')}}</li>
        <li class="details-message__text details-message__text--check">{{$t('login.didnt_help')}} <a href="mailto:support@globalrustrade.com">support@globalrustrade.com</a></li>
      </ul>
    </details>
  </section>
</template>

<script>
export default {
  props: {
    username: String
  },
  methods: {
    closeModal() {
      this.$parent.$emit('onModalPopupClose');
    },
  }
}
</script>

<style lang="scss">
/* Убираем стандартный маркер Chrome */
details summary::marker {
  display: none;
}
/* Убираем стандартный маркер Firefox */
details > summary {
  list-style: none;
}

.details-message {
  margin-top: 16px;
}

.details-message__title {
  font-size: 13px;
  line-height: 1.4;
  color: $grt-blue;
  text-decoration: underline dashed;

  cursor: pointer;
}

.details-message__list {
  margin: 0;
  margin-top: 12px;
  padding: 0;
  list-style: none;
}

.details-message__text {
  position: relative;

  margin-bottom: 13px;
  padding-left: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;

    width: 10px;
    height: 10px;

    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M4.6 10.48a.61.61 0 01-.87 0L.27 7.02a.92.92 0 010-1.3L.7 5.3a.92.92 0 011.3 0l2.16 2.16L10 1.61a.92.92 0 011.3 0l.43.44c.36.36.36.94 0 1.3L4.6 10.48z' fill='%23219653'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Cpath fill='%23fff' d='M0 0h12v12H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>
