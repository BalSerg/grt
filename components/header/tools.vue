<template>
  <div class="header-tools">
    <CatalogMob/>
    <UserLoggedIn v-if="user"/>
    <UserLogin v-else/>
    <Favs/>
    <div class="header-tool__wrapper header-tool__cart">
      <NuxtLink
        :to="
          localePath({
            path: PATH.CART,
            query: { grab: 'buy' },
          })
        "
      >
        <CartWidgetIconSimple :count="productsCount">
          {{ $t('header.cart') }}
        </CartWidgetIconSimple>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import PATH from 'assets/js/const.path'
import User from '@/components/header/user'
import UserLoggedIn from '@/components/header/user-logged-in'
import UserLogin from '@/components/header/user-login'

import CartWidgetIconSimple from '@/components/cart/cart-widget-icon_simple'

import Favs from '@/components/header/favs'
import CatalogMob from '@/components/header/catalog-mob'

export default {
  components: {
    User,
    UserLogin,
    UserLoggedIn,
    CartWidgetIconSimple,
    Favs,
    CatalogMob,
  },
  computed: {
    ...mapState('cart', ['productsCount']),
    ...mapGetters({
      user: 'userData/user',
      isDevEnv: 'tech/isDevEnv',
    }),
    PATH() {
      return PATH
    },
  },
}
</script>
<style lang="scss">
.header-tools {
  padding: 9px 0;

  @media screen and (max-width: $desktop-mid - 1) {
    padding-left: 20px;
  }
}

.header-tool__text {
  white-space: nowrap;
  color: $text-black;
}

.header-tool__wrapper {
  position: relative;
  padding-left: 32px;

  @media screen and (max-width: $desktop-mid - 1) {
    padding: 0;
  }

  .header-tool {
    margin-left: 0;

    font: inherit;
  }
}

.header-tool__blank {
  position: relative;

  width: 34px;
  height: 34px;

  background-color: #fafafa;
  border-radius: 50%;

  @media (max-width: $desktop-mid - 1) {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0) 81%);

      animation-duration: 0.6s;
      animation-iteration-count: infinite;
      animation-name: loader-animate;
      animation-timing-function: linear;
    }
  }

  @media (min-width: $desktop-mid) {
    width: 45px;
    height: 45px;

    animation: bounce 1.5s infinite;
  }
}

// Мобильный лоадер
@keyframes loader-animate {
  0% {
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -7px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}
</style>
