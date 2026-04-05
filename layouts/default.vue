<template>
  <div class="page-body">
    <HeaderNew/>
    <nuxt :key="$route.fullPath"/>
    <Footer v-if="isDesktopWithScroll"/>
    <client-only>
      <Modal/>
      <ModalComponent
        v-if="!!GET_MODAL_COMPONENT_NAME"
        :key="GET_MODAL_COMPONENT_NAME"
      />
      <loading v-show="GET_LOAD_TRIGGER"/>
    </client-only>
  </div>
</template>

<script>
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import {mapActions, mapGetters} from 'vuex'
import {CookieName, EnvMode} from '@/assets/js/const'
import {getCurrencyByPassedLang} from '@/assets/js/currHelper'

import LongCookiesMixin from '@/mixins/long-cookies-mx'
import CurrencyMixin from '@/mixins/currency-mx'
import langDetection from '@/utils/langDetection'

import HeaderNew from '@/components/header/header-new'
import Footer from '@/components/footer/footer'
import Modal from '@/components/common/modal'
import ModalComponent from '@/modules/SMS_validation/modalComponent'
import PATH from '@/assets/js/const.path'
import {FETCH_HEADER} from '~/store/header'

export default {
  name: 'Default',
  components: {
    HeaderNew,
    Footer,
    Modal,
    ModalComponent,
  },
  mixins: [LongCookiesMixin, CurrencyMixin],
  data: () => ({
    isPrimaryRenderingDone: false, // чтобы при загрузке страницы язык не "прыгал" - сначало проявляется дефолтный, и лишь через секунду вступает пользовательский язык. Да.
  }),
  watch: {
    '$i18n.locale'() {
      this.$store.dispatch('header/' + FETCH_HEADER)
    },
  },
  methods: {
    ...mapActions({
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT',
      FETCH_CART: 'cart/FETCH_CART',
    }),
    async discoverCountry() {
      if (!localStorage[COUNTRY_CODE]) {
        const localAxios = this.$axios.create()
        const {data: countryData} = await localAxios.get('https://ip2c.org/s')
        if (countryData && countryData.split(';').length > 1) {
          const countryCode = countryData.split(';')[1]
          localStorage.setItem(COUNTRY_CODE, countryCode)
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      GET_LOAD_TRIGGER: 'tech/GET_LOAD_TRIGGER',
      GET_MODAL_COMPONENT_NAME: 'tech/GET_MODAL_COMPONENT_NAME',
      isDesktopWithScroll: 'tech/isDesktop'
    }),
  },
  mounted() {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
    }
  },
  async created() {
    this.$store.commit(
      'tech/setIsDevEnv',
      process.env.GRT_ENV === EnvMode.DEVELOPMENT
    )

    // order lang, discoverCountry, initCurrency & remake lang_cookie
    if (process.client) {
      await langDetection(
        this.$nuxt.context.$cookies,
        this.$route.fullPath,
        this.$i18n
      ) // <<<<<<< use nextTick()
        .then(() => {
          const currentLang = this.$i18n.locale
          this.setLongTermCookies(CookieName.LANGUAGE, currentLang)

          if (!this.$cookies.get(CookieName.CURRENCY)) {
            const currency = getCurrencyByPassedLang(currentLang)
            this.handleCurrencySelect(currency)
          }

          this.isPrimaryRenderingDone = true
        })

      await this.discoverCountry()
      this.initCurrency()
    }

    // предопределение типа валюты
    if (this.$cookies.get(CookieName.CURRENCY)) {
      this.$store.commit(
        'tech/setCurrency',
        this.$cookies.get(CookieName.CURRENCY)
      )
    }

    // загруз корзины для отображения count у иконки Корзины
    if (!this.$route.path.includes(PATH.CART)) {
      await this.FETCH_CART({grab: 'buy'})
    }

    // загрузка id фаворитных товаров
    await this.HANDLING_of_FAVORITE_PRODUCT({
      operationType: '$get',
      id: false,
    })
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()

    const meta = [
      ...i18nSeo.meta,
      {
        hid: 'description',
        name: 'description',
        content: this.$t('meta.description'),
      },
      {
        property: 'og:site_name',
        content: 'GlobalRusTrade',
      },
      {
        name: 'application-name',
        content: 'GlobalRusTrade',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'GlobalRusTrade',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: this.$t('meta.title'),
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.$t('meta.description'),
      },
      {
        property: 'og:url',
        content: `https://globalrustrade.com${this.$route.path}`,
      },
      {
        property: 'og:image',
        content: 'https://globalrustrade.com/images/og/grt-cover.jpg',
      },
      {
        property: 'og:image:width',
        content: '600',
      },
      {
        property: 'og:image:height',
        content: '600',
      },
      {
        property: 'vk:image',
        content: 'https://globalrustrade.com/images/og/grt-cover.jpg',
      },
      {
        property: 'fb:image',
        content: 'https://globalrustrade.com/images/og/grt-cover.jpg',
      },
      {
        property: 'fb:app_id',
        content: '2368975760088263',
      },
      {
        property: 'twitter:image',
        content: 'https://globalrustrade.com/images/og/grt-cover.jpg',
      },
      {
        property: 'twitter:description',
        content: this.$t('meta.twitter_description'),
      },
      {
        property: 'twitter:cart',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:url',
        content: `https://globalrustrade.com${this.$route.path}`,
      },
    ]

    this.$store.commit('meta/setLayoutMetaTags', {meta})

    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs,
      },
      meta,
      link: [...i18nSeo.link],
    }
  },
}
</script>

<style lang="scss">
.page-body {
  position: relative;
}

.page-main {
  position: relative;
  z-index: $zMain;
}

.page-main--above-header {
  z-index: $zAbove + $zHeader;
}

.user-confirm-position {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
</style>
