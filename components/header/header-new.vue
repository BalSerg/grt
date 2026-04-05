<template>
  <header class="header">
    <div class="header-gradient">
      <div class="header-container__top">
        <div class="header-container__links">
          <Links />
        </div>
        <div class="header-container__currency">
          <Currency :currencyList="currencies" />
        </div>
        <div class="header-container__language">
          <Langs />
        </div>
      </div>
      <div class="header-container">
        <div class="header-container__mid">
          <div class="header-container__logo">
            <nuxt-link :to="localePath('/')">
              <picture>
                <source
                  media="(min-width: 1025px)"
                  srcset="/nimages/logo/logo-desktop.svg"
                />
                <source
                  media="(min-width: 768px)"
                  srcset="/nimages/logo/logo-tablet.svg"
                />
                <img
                  class="header-logo__image"
                  src="/nimages/logo/logo-mobile.svg"
                  alt="Global Rus Trade"
                  width="90"
                  height="22"
                />
              </picture>
            </nuxt-link>
          </div>
          <div class="header-container__catalog">
            <CatalogDesktop />
          </div>
          <div class="header-container__search">
            <template v-if="!isLoaded">
              <div class="search-bar__fake">
                <span class="search-bar__fake-text">
                  {{ $tc('header.search', productsCountFake) }}
                </span>
              </div>
            </template>
            <template v-else>
              <Searchbar :goods-total-number="productsCount" />
            </template>
          </div>

          <div class="header-container__tools">
            <template v-if="!isLoaded">
              <div class="header-tools__fake">
                <div class="fake-tool"></div>
                <div class="fake-tool"></div>
                <div class="fake-tool"></div>
              </div>
            </template>
            <template v-else>
              <Tools v-if="fetchedUser" :is-desktop="true" />
              <Burger :currency-list="currencies" />
            </template>
          </div>
        </div>
        <div class="header-container__bottom">
          <HeaderBottom :promo-links="promoLinks" />
        </div>
        <CookiesMessage v-if="!areCookiesAccepted" />
      </div>
      <Loading />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { CookieName } from '@/assets/js/const'
import resizeObserverMixin from '@/mixins/resize-observer-mx'
import Links from '@/components/header/links'
import Currency from '@/components/header/currency'
import Langs from '@/components/header/langs'
import CatalogDesktop from '@/components/header/catalog-spa'
import Searchbar from '@/components/header/search-bar'
import Tools from '@/components/header/tools'
import Loading from '@/components/loading_old'
export default {
  data() {
    return {
      loading: false,
      isLoaded: false,
      productsCountFake: 185900,
      fetchedUser: false,
      areCookiesAccepted: true,
    }
  },
  components: {
    Links,
    Currency,
    Langs,
    CatalogDesktop,
    Searchbar,
    Tools,
    Loading,
  },
  mixins: [resizeObserverMixin],
  computed: {
    ...mapState('header', ['currencies', 'productsCount', 'promoLinks']),
  },
  async mounted() {
    this.isLoaded = true
    await this.$store.dispatch('userData/fetchUserData')
    this.fetchedUser = true
    await this.$store.dispatch('userData/fetchCart')
  },
  async created() {
    if (process.client) {
      this.areCookiesAccepted =
        (await this.$cookies.get(CookieName.COOKIE_ACCEPT)) || false
    }
  },
}
</script>

<style lang="scss">
header {
  .header {
    &-container {
      background-color: $white;

      &__top {
        color: $white;
        font-size: 13px;
        background-color: transparent;
        padding: 8px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        max-width: 1440px;
        width: 96%;
        margin: 0 auto;
        flex-wrap: nowrap;

        @media screen and (max-width: $desktop-mid - 1) {
          display: none;
        }
      }

      &__mid {
        display: flex;
        flex-wrap: nowrap;
        width: 96%;
        max-width: 1440px;
        box-sizing: border-box;
        margin: 0 auto;
        position: relative;
        z-index: 199;
      }

      &__bottom {
        display: none;

        @media screen and(min-width: $desktop-mid) {
          display: block;
        }
      }

      &__links {
        flex-grow: 1;
        flex-shrink: 0;
      }

      &__langs {
        flex-grow: 0;
        flex-shrink: 0;
      }

      &__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        padding: 12px 0;

        @media (min-width: 768px) {
          padding: 16px 0;
        }

        @media (min-width: $desktop-mid) {
          padding: 30px 0 30px;
        }

        .header-logo__image {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          width: 90px;
          height: 22px;

          aspect-ratio: 45 / 11;

          @media (min-width: $pad) {
            width: 112px;
            height: 40px;

            aspect-ratio: 14 / 5;
          }

          @media (min-width: $desktop-mid) {
            width: 224px;
            height: 99px;

            aspect-ratio: 224 / 99;
          }
        }
      }

      &__catalog {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &__search {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        flex-grow: 1;

        & .search-bar__fake {
          background: #000000;
          border-radius: 24px;
          background-color: $light-grey;
          border: 1px solid $grey;
          height: 48px;
          box-sizing: border-box;
          flex-shrink: 0;
          margin-left: 24px;
          margin-right: 48px;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 24px;
          flex-grow: 1;

          @media (max-width: $desktop-mid - 1) {
            display: none;
          }

          &-text {
            font-size: 15px;
          }

          &::after {
            content: "";
            width: 24px;
            height: 24px;
            position: absolute;
            top: calc(50% - 12px);
            right: 18px;
            left: unset;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMDA3QUZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4yNTUgMTUuMjk1aDEuMDU0bDUuNjU2IDUuNjhjLjU0Ny41NDcuNTQ3IDEuNDQgMCAxLjk4N2ExLjQxIDEuNDEgMCAwMS0xLjk4OCAwbC01LjY2OS01LjY2N3YtMS4wNTNsLS4zNi0uMzczYTguNjczIDguNjczIDAgMDEtNy4xMjMgMS45NzNjLTMuNzA4LS42MjctNi42Ny0zLjcyLTcuMTIzLTcuNDUzQy4wMSA0Ljc0OSA0Ljc1Ny4wMDIgMTAuNC42OTVjMy43MzUuNDU0IDYuODMgMy40MTQgNy40NTcgNy4xMmE4LjY2NSA4LjY2NSAwIDAxLTEuOTc0IDcuMTJsLjM3My4zNnptLTEyLjk1My02YzAgMy4zMiAyLjY4IDYgNiA2czYtMi42OCA2LTYtMi42OC02LTYtNi02IDIuNjgtNiA2eiIgY2xpcC1ydWxlPSJldmVub2RkIj48L3BhdGg+PC9zdmc+");
          }
        }
      }

      &__tools {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        & .header-tools__fake {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          min-width: 160px;
          box-sizing: border-box;

          @media screen and (max-width: $desktop-mid) {
            display: none;
          }
        }

        & .fake-tool {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: $light-grey;
          margin-left: 38px;
          animation: bounce 600ms ease infinite;

          &:nth-child(2) {
            animation-delay: 200ms;
          }

          &:nth-child(3) {
            animation-delay: 400ms;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(1, 1) translate(0, 0);
          }

          30% {
            transform: scale(1, 0.9) translate(0, 10px);
          }

          75% {
            transform: scale(1, 1.1) translate(0, -25px);
          }

          100% {
            transform: scale(1, 1) translate(0, 0);
          }
        }
      }
    }
  }

  & .header-gradient {
    background: linear-gradient(89deg, #2372eb, $fuchsia);
    background-size: 160% 140%;
    background-position: 50% 50%;
    animation: HeaderGradient 6s ease infinite;

    @media screen and (max-width: $desktop-mid - 1) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 220;
    }

    @media screen and (max-width: $desktop-mid - 1) {
      & .header-loader {
        height: 2px;
      }
    }

    @media screen and (max-width: $pad - 1) {
      & .header-loader {
        height: 1px;
      }
    }
  }

  @keyframes HeaderGradient {
    0% {
      background-position: 0% 9%;
    }

    50% {
      background-position: 100% 92%;
    }

    100% {
      background-position: 0% 9%;
    }
  }
}

.page-body {
  @media (max-width: $desktop-mid - 1) {
    padding-top: 72px;
  }

  @media (max-width: $pad - 1) {
    padding-top: 40px;
  }
}

.header-top {
  background: linear-gradient(88.73deg, #2372eb 5.54%, #fc3f71 93.84%);
  color: #ffffff;
  font-size: 13px;
  line-height: 1;
  padding: 9px 0;

  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.dropdown {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: center;

  .dropdown-label {
    cursor: pointer;
  }

  .dropdown-options {
    position: absolute;
    background-color: #ffffff;
    min-width: 180px;
    padding: 5px 0;
    border-radius: 12px;
    opacity: 0;
    visibility: hidden;
    top: 100%;
    right: 0;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    text-align-last: left;
    flex-grow: 1;
    height: 0;
    overflow: hidden;
    z-index: 1200;
    transition: height linear 200ms;

    &::before {
      position: absolute;
      top: -10px;
      right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 10px 8px;
      border-color: transparent transparent #ffffff transparent;
    }

    .dropdown-container {
      border-radius: 12px;
      max-height: 100%;
      overflow-y: auto;
      margin: 5px 10px;
      padding: 8px 0;
    }

    .dropdown-container::-webkit-scrollbar {
      background-color: #ffffff;
      border-radius: 0 12px 12px 0;
      width: 16px;
    }

    /* background of the scrollbar except button or resizer */
    .dropdown-container::-webkit-scrollbar-track {
      background-color: #ffffff;
      border-radius: 0 12px 12px 0;
    }

    .dropdown-container::-webkit-scrollbar-track:hover {
      background-color: #f4f4f4;
    }

    /* scrollbar itself */
    .dropdown-container::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 5px solid #ffffff;
    }

    .dropdown-container::-webkit-scrollbar-thumb:hover {
      background-color: #a0a0a5;
      border: 4px solid #f4f4f4;
    }

    /* set button(top and bottom of the scrollbar) */
    .dropdown-container::-webkit-scrollbar-button {
      display: none;
    }

    .dropdown-option {
      padding: 5px 10px;
      background-color: #ffffff;
      transition: all linear 140ms;
      color: #131313;
      flex-shrink: 0;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background-color: rgb(201, 245, 253);
      }
    }
  }

  .dropdown-overlay {
    position: fixed;
    z-index: 499;
    background-color: transparent;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    display: none;
    transition: opacity 200ms linear;
  }

  &.dropdown-active {
    .dropdown-options {
      visibility: visible;
      opacity: 1;
      height: auto;
      max-height: 220px;
      overflow: visible;
    }

    .dropdown-overlay {
      visibility: visible;
      opacity: 1;
      display: block;
    }
  }
}
</style>
