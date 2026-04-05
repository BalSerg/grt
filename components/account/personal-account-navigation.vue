<template>
  <section>
    <h2 class="personal-account-navigation__title-mobile" v-if="isMobile">{{ $t('account.navigation.heading') }}</h2>
    <input v-if="isMobile" class="personal-account-navigation__checkbox" type="checkbox" id="chk">
    <label class="personal-account-navigation__burger" for="chk"><b></b></label>
    <aside class="personal-account__navigation">
      <div class="account-navigation__title">{{ $t('account.navigation.heading') }}</div>
      <nav class="account-navigation__links">
        <div v-for="item of navigation"
             :key="item.id"
             class="account-navigation__link"
             :class="{'active': item.name == $route.params.slug}"
        >
          <nuxt-link :to="localePath(`/account/${item.name}`)">{{ $t(`account.${item.name}.heading`) }}</nuxt-link>
        </div>
        <div v-if="false" class="account-navigation__pointer"></div>
      </nav>
    </aside>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'PersonalAccountNavigation',
  props: {
    navigation: Array
  },
  computed: {
    ...mapGetters({
      isMobile: 'tech/isMobile'
    }),
  }
}
</script>

<style lang="scss">
.account-navigation {
  &__title {
    padding: 0 0 0 8px;
    margin: 0 0 8px;

    font-size: 18px;
    line-height: 1;
    font-weight: bold;
    color: $text-black;
  }

  &__links {
    position: relative;
  }

  &__link {
    --link-color: $text-black;
    margin: 4px 0;

    a {
      color: var(--link-color);
      display: block;
      padding: 4px 8px;
      position: relative;
      z-index: 2;
    }

    .nuxt-link-active {
      color: $grt-blue;
      font-weight: 600;
      background-color: #f0f0f0;
      border-radius: 4px;
      position: relative;
      z-index: 1;

      &::before {
        position: absolute;
        left: -24px;
        top: 0;

        display: block;
        width: 2px;
        height: 100%;

        background: $grt-blue;

        content: "";
      }
    }
  }

  &__pointer {
    width: 2px;
    background-color: $grt-blue;
    min-height: 10px;
    position: absolute;
    left: 0;
    top: 24px;
    transition: all linear 200ms;
  }
}

@media screen and (max-width: $pad - 1) {
  .account-navigation__title {
    display: none;
  }

  .personal-account-navigation {
    &__title-mobile {
      margin: 0 0 16px 16px;

      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      color: $text-black;
    }

    &__checkbox {
      display: none;

      &:checked {
        & ~ .personal-account__navigation {
          opacity: 1;
          transition: opacity ease-in 250ms;
        }

        & ~ .personal-account-navigation__burger {
          &::before {
            transform: translateY(5px) rotate(45deg);
          }

          &::after {
            transform: translateY(3px) rotate(-45deg);
          }

          b {
            opacity: 0;
            transition: all ease-out 250ms;
          }

          &::after,
          &::before {
            transition: all ease-out 500ms;
          }
        }
      }
    }

    &__burger {
      position: absolute;
      right: 16px;
      top: 7px;

      width: 18px;
      height: 12px;
      display: block;

      background: $white;

      cursor: pointer;

      &::after,
      &::before {
        content: "";

        transition: all ease-in 250ms;
      }

      &::after,
      &::before,
      b {
        width: 18px;
        height: 2px;
        display: block;

        border-right: 1px;
        background: $text-black;
      }

      b {
        position: absolute;
        top: 5px;

        opacity: 1;
        transition: all ease-in 500ms;
      }

      &::after {
        transform: translateY(-2px) rotate(0deg);
      }

      &::before {
        transform: translateY(10px) rotate(0deg);
      }
    }
  }
}

</style>
