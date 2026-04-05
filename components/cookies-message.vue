<template>
  <div v-if="isVisible" class="bottom-message" @click="isVisible = false">
    <div class="bottom-message__body">
      <p class="bottom-message__text">{{ $t('cookie_accept') }}</p>
      <button
        class="bottom-message__btn grt-btn grt-btn--filled"
        type="button"
        @click="agreeAndClose"
      >
        {{ $t('coockie_agreed') }}
      </button>
    </div>
  </div>
</template>

<script>
import { CookieName } from '@/assets/js/const';
import LongCookiesMixin from '@/mixins/long-cookies-mx';

export default {
  mixins: [LongCookiesMixin],
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    agreeAndClose() {
      this.isVisible = false;

      this.setLongTermCookies(CookieName.COOKIE_ACCEPT, true);
    }
  }
};
</script>

<style lang="scss">
.bottom-message {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1101;

  display: flex;
  flex-direction: column;

  background-color: rgba(40, 40, 40, 0.6);
}

.bottom-message__body {
  position: relative;
  z-index: 1102;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 16px;

  background-color: #ffffff;

  @media (min-width: $pad) {
    padding: 20px;
  }

  @media (min-width: $desktop-mid) {
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
  }
}

.bottom-message__text {
  margin-bottom: 16px;

  font-size: 13px;
  line-height: 1.4;
  color: $text-black;

  @media (min-width: $desktop-mid) {
    position: relative;

    margin-bottom: 0;
    margin-right: 26px;
    padding-left: 88px;

    font-size: 15px;
    line-height: 1.6;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      left: 0;

      width: 58px;
      height: 51px;
      background-image: url("/nimages/logo/logo-bottom-name.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }
  }
}
</style>
