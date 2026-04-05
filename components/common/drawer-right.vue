<template>
  <div class="base-drawer">
    <button class="base-drawer__close" type="button" @click="close">
      <svg
        fill="none"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <circle cx="12" cy="12" fill="#fff" r="12" />
        <g clip-path="url(#clip0)">
          <path
            d="M12.662 12.001l5.2-5.2a.469.469 0 10-.663-.663l-5.2 5.2-5.2-5.2a.469.469 0 10-.662.663l5.2 5.2-5.2 5.2a.469.469 0 10.663.663l5.2-5.2 5.2 5.2a.467.467 0 00.662 0 .469.469 0 000-.663l-5.2-5.2z"
            fill="#7E7E7E"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <path d="M0 0h12v12H0z" fill="#fff" transform="translate(6 6)" />
          </clipPath>
        </defs>
      </svg>
    </button>
    <div
      :class="{
        'base-drawer__body--fixed':
          isCurrenciesListVisible || isLangsListVisible,
      }"
      class="base-drawer__body"
    >
      <div class="user-settings">
        <nuxt-link
          :to="localePath(`${basePath}/${defaultSemanticId}/`)"
          class="user-settings__item user-settings__item--bold"
          @click.native="close"
        >
          {{ $t('goto_catalog') }}
        </nuxt-link>
        <h3 class="user-settings__item user-settings__header">
          {{ $t('settings') }}
        </h3>
        <ul class="user-settings__list user-settings-list">
          <li class="user-settings-list__item">
            <div class="settings-selector">
              <button
                class="settings-selector__activator settings-selector__activator--red"
                type="button"
                @click="toggleCurrencySelector"
              >
                <span>{{ $t('selectCurrency') }}</span>
                <span>{{ currentCurrency }}</span>
              </button>
              <div
                v-if="isCurrenciesListVisible"
                class="settings-selector__popup"
              >
                <div class="settings-selector__popup-head">
                  <button
                    class="settings-selector__back-btn"
                    type="button"
                    @click="toggleCurrencySelector"
                  >
                    <svg
                      fill="none"
                      height="8"
                      width="7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        d="M1.231 3.17a1 1 0 000 1.66L4.87 7.28a1 1 0 001.559-.83v-4.9a1 1 0 00-1.56-.83L1.232 3.17z"
                        fill="#282828"
                      />
                    </svg>
                  </button>
                  <h4 class="settings-selector__popup-head-text">
                    {{ $t('selectCurrency') }}
                  </h4>
                </div>
                <div class="settings-selector__options-list">
                  <button
                    v-for="code in sortCurrencyList"
                    :key="code"
                    class="settings-selector__option"
                    type="button"
                    @click="selectCurrency(code)"
                  >
                    {{ code }}&nbsp;&bull;&nbsp;{{
                      $t(`currency.${code.toLowerCase()}`)
                    }}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="user-settings-list__item">
            <div class="settings-selector">
              <button
                class="settings-selector__activator settings-selector__activator--blue"
                type="button"
                @click="toggleLangSelector"
              >
                <span>{{ $t('language') }}</span>
                <span>{{ currentLocale.name }}</span>
              </button>
              <div v-if="isLangsListVisible" class="settings-selector__popup">
                <div class="settings-selector__popup-head">
                  <button
                    class="settings-selector__back-btn"
                    type="button"
                    @click="toggleLangSelector"
                  >
                    <svg
                      fill="none"
                      height="8"
                      width="7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        d="M1.231 3.17a1 1 0 000 1.66L4.87 7.28a1 1 0 001.559-.83v-4.9a1 1 0 00-1.56-.83L1.232 3.17z"
                        fill="#282828"
                      />
                    </svg>
                  </button>
                  <h4 class="settings-selector__popup-head-text">
                    {{ $t('language') }}
                  </h4>
                </div>
                <div class="settings-selector__options-list">
                  <button
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    class="settings-selector__option"
                    type="button"
                    @click="switchLang(locale.code)"
                  >
                    {{ locale.name }}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Footer @on-close="$emit('on-close')" />
      </div>
    </div>
  </div>
</template>

<script>
import Contacts from '@/components/footer/contacts';
import Social from '@/components/footer/social';
import LongCookiesMixin from '@/mixins/long-cookies-mx';
import CurrencyMixin from '@/mixins/currency-mx';
import {BasePath, CookieName, DefaultSemanticId} from '@/assets/js/const';
import {sortCurrency} from "~/assets/js/util";
import Footer from "~/components/footer/footer";

export default {
  components: {
    Footer,
    Contacts,
    Social,
  },
  mixins: [LongCookiesMixin, CurrencyMixin],
  props: {
    currencies: Array,
  },
  data() {
    return {
      isDrawerVisible: false,
      isCurrenciesListVisible: false,
      isLangsListVisible: false,
      selectedCurrency: null,
      basePath: BasePath.CATALOG,
      defaultSemanticId: DefaultSemanticId.PRODUCTS,
    }
  },
  computed: {
    currentCurrency() {
      return this.$store.getters['tech/currency'] || this.$t('selectCurrency');
    },
    sortCurrencyList() {
      return sortCurrency(this.currencies)
    },
    copyrightText() {
      const currentYear = new Date().getFullYear();
      return `© 2015—${currentYear}, Global Rus Trade`;
    },
    currentLocale() {
      const currentLoc = this.$i18n.locales.find(
        locale => locale.code === this.$i18n.locale
      );
      return currentLoc;
    },
    availableLocales() {
      return this.$i18n.locales;
    }
  },
  watch: {
    isDrawerVisible(isVisible) {
      return isVisible ? this.$disableBodyScroll() : this.$enableBodyScroll();
    },
  },
  methods: {
    switchLang(code) {
      if (process.client) {
        this.close();
      }
      this.handleSwitchLang(code);
    },
    async handleSwitchLang(code) {
      this.setLongTermCookies(CookieName.LANGUAGE, code)
      await this.$i18n.setLocale(code)
    },
    toggleCurrencySelector() {
      this.isCurrenciesListVisible = !this.isCurrenciesListVisible;
    },
    toggleLangSelector() {
      this.isLangsListVisible = !this.isLangsListVisible;
    },
    selectCurrency(code) {
      this.handleCurrencySelect(code);

      if (process.client) {
        this.close();
        window.location.reload(true);
      }
    },
    close() {
      this.$emit('on-close');
      document.removeEventListener('keydown', this.onEscPress);
    },
    open() {
      document.addEventListener('keydown', this.onEscPress);
    },
    onEscPress(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
.base-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1200;

  display: flex;
  align-items: flex-start;
}

.base-drawer__close {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 100%;
  padding: 0;

  background-color: rgba(40, 40, 40, 0.6);

  svg {
    align-self: flex-start;
    margin-top: 17px;
  }
}

.base-drawer__body {
  flex-grow: 1;
  background-color: #ffffff;
  overflow: auto;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.user-settings {
  position: relative;

  height: 100%;
}

.base-drawer__body--fixed .user-settings {
  overflow: hidden;
}

.user-settings__item {
  display: flex;
  align-items: center;
  padding: 19px 14px;

  font-size: 13px;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }
}

.user-settings__header {
  color: $text-black;
  font-weight: 600;

  background-color: #f4f4f4;
}

.user-settings-list {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

.user-settings-list__item {
  justify-content: space-between;
}

.user-settings__item--bold {
  font-weight: 600;
}

.user-settings__item--narrow {
  padding: 12px 14px;

  color: $text-black;
}

.settings-selector {
  width: 100%;
}

.settings-selector__activator {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 14px;
  box-sizing: border-box;

  font-size: 13px;
  line-height: 1.4;
  color: $text-black;
  font-weight: 400;

  background-color: transparent;
  outline: none;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 14px;
    right: 14px;

    height: 1px;

    background-color: #e9e9e9;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 6px;
  }

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }
}

.settings-selector__activator--red::before {
  background-color: $fuchsia;
}

.settings-selector__activator--blue::before {
  background-color: $grt-blue;
}

.user-settings-list__item:last-child .settings-selector__activator::after {
  content: none;
}

.settings-selector__popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;

  background-color: #ffffff;
}

.settings-selector__popup-head {
  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 35px;

  background-color: #f4f4f4;

  transform: translate3d(0, 0, 0);
}

.settings-selector__popup-head-text {
  margin: 0 auto;

  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
  color: $text-black;
}

.settings-selector__back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 56px;
  padding: 0;

  background-color: transparent;
}

.settings-selector__option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 19px;

  font-size: 13px;
  line-height: 1.4;
  color: $text-black;
  font-weight: 400;

  background-color: #ffffff;

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }
}

.user-settings__footer {
  padding: 24px 14px 0;

  &.footer {
    background-color: #ffffff;
  }
}
</style>
