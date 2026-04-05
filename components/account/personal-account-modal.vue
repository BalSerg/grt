<template>
  <section v-if="closeModalFlag" class="personal-account-modal" >
    <div class="personal-account-modal__close" @click="closeModal"></div>
    <h2 class="personal-account-modal__title">{{$t('account.modal.title')}}</h2>
    <div  class="personal-account-modal__text">{{$t('account.modal.any_messenger')}}</div>
    <div  class="personal-account-modal__icons">
      <a href="viber://chat?number=+79096465665" target="_blank"><img src="/nimages/icons/common/viber2.svg" alt=""></a>
      <a href="https://t.me/GlobalRusTrade" target="_blank"><img src="/nimages/icons/common/telegram2.svg"/></a>
      <a href="https://wa.me/79096465665" target="_blank"><img src="/nimages/icons/common/whatsapp2.svg" alt=""></a>
      <a href=""><img src="/nimages/icons/common/mail2.svg" alt=""></a>
    </div>
    <div  class="personal-account-modal__text">{{$t('account.modal.social_network')}}</div>
    <div  class="personal-account-modal__icons">
      <a href="https://www.facebook.com/globalrustrade/" target="_blank"><img src="/nimages/icons/common/facebook2.svg"/></a>
      <a href="https://www.instagram.com/globalrustrade/" target="_blank"><img src="/nimages/icons/common/instagram2.svg" alt=""></a>
    </div>
  </section>
</template>

<script>
export default {
  name: "personal-account-modal",
  data() {
    return {
      closeModalFlag: true,
    }
  },
  methods: {
    closeModal() {
      this.closeModalFlag = false
    }
  }
}
</script>

<style lang="scss">
.personal-account-modal {
  position: relative;
  z-index: 1;

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;

    display: block;
    height: 11px;
    width: 11px;

    background: transparent !important;
    border: 0;

    &::before,
    &::after {
      position: absolute;

      display: block;

      background: $text-black;

      content: "";
      cursor: pointer;
      transform: rotate(45deg);
    }

    &::before {
      top: 0;
      left: calc((100% - 1px) / 2);

      height: 11px;
      width: 1px;
    }

    &::after {
      left: 0;
      top: calc((100% - 1px) / 2);

      height: 1px;
      width: 11px;
    }
  }

  &__title {
    margin: 0 0 12px;

    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: $text-black;
  }

  &__text {
    margin: 8px 0;

    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    color: $text-grey-2;
  }

  &__icons {
    > a {
      display: inline-block;
      margin: 0 0 0 16px;

      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>
