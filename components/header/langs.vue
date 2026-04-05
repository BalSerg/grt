<template>
  <div :class="{ 'dropdown-active': active }" class="dropdown">
    <div class="dropdown-label" @click="active = !active">
      <img :alt="currentLocale.name" :src="itemImage(currentLocale.code)"/>
      {{ currentLocale.name }}
    </div>
    <div v-if="active" class="dropdown-options">
      <div class="dropdown-container">
        <div
          v-for="locale in availableLocales"
          :key="locale.code"
          class="dropdown-option"
          @click="handleSwitchLang(locale.code)"
        >
          <img :alt="locale.name" :src="itemImage(locale.code)"/>
          {{ locale.name }}
        </div>
      </div>
    </div>
    <div class="dropdown-overlay" @click="active = !active"></div>
  </div>
</template>

<script>
import {CookieName} from 'assets/js/const'
import LongCookiesMixin from '@/mixins/long-cookies-mx'

export default {
  mixins: [LongCookiesMixin],
  data() {
    return {
      active: false,
      loaded: false,
    }
  },
  computed: {
    currentLocale() {
      const currentLoc = this.$i18n.locales.find(
        (locale) => locale.code === this.$i18n.locale
      )
      return currentLoc
    },
    availableLocales() {
      return this.$i18n.locales
    },
  },
  watch: {
    currentLocale: {
      handler(newLocale) {
        this.handleSwitchLang(newLocale.code);
      },
      deep: true,
    },
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    itemImage(lc) {
      return `/nimages/langs/${lc}.svg`
    },
    async handleSwitchLang(code) {
      this.setLongTermCookies(CookieName.LANGUAGE, code)
      await this.$i18n.setLocale(code).then(() => {
        this.active = false
      })
    },
  },
}
</script>

<style lang="scss">
.dropdown {
  margin-left: 20px;

  img {
    height: 17px;
    margin: 0 5px 0 0;
    width: 17px;
  }

  &-label {
    align-items: center;
    display: flex;
  }

  &.dropdown-active {
    .dropdown-options {
      min-width: initial;
      padding: 0;

      .dropdown-container {
        margin: 0;
      }

      .dropdown-option {
        align-items: center;
        border-bottom: 1px solid $grey;
        display: flex;
        padding: 5px 10px;

        &:last-child {
          border: 0;
        }
      }
    }
  }
}
</style>
