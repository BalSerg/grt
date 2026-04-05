<template>
  <aside class="static-page__sidebar">
    <div class="static-page__sidebar-title">FAQ</div>
    <nav class="static-page__nav" :class="{'visible': navStatus}">
      <ul v-if="navData.length > 0">
        <li
          v-for="link in navData"
          :key="link.id"
          :class="{'active': isHashActive(link.semanticId)}"
          >
          <nuxt-link :to="{hash: link.semanticId}" >
            {{link.title}}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <button
      class="static-page__burger"
      :class="{'active': navStatus}"
      @click="toggleNav"
    >{{$t('show_filters')}}
      <span></span>
    </button>
  </aside>
</template>

<script>
export default {
  name: "FaqNav",
  props: {
    navData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    path: {
      type: String
    }
  },
  data() {
    return {
      navStatus: false,
    }
  },
  mounted() {
    if(!this.$route.hash) {
      document.querySelectorAll('.static-page__nav ul li')[0].classList.add('active');
    }
  },
  methods: {
    toggleNav() {
      this.navStatus = !this.navStatus;
    },
    hideNav() {
      this.navStatus = false;
    },
    linkHandler(id) {
      if(this.navStatus) this.navStatus = !this.navStatus;
    },
    isHashActive(hash) {
      return this.$route.hash === `#${hash}`;
    }
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.static-page {
  &__sidebar {
    width: 100%;
    position: relative;

    @media screen and (min-width: $desktop-mid) {
      position: sticky;
      top: 24px;
    }

    &-title {
      padding: 0 32px;
      font-weight: bold;
      font-size: 18px;
      line-height: 1.5;
      color: $text-black;
      cursor: default;

      @media screen and (max-width: $desktop-mid) {
        padding: 0 15px;
        margin: 10px 0;
      }
    }

    @media screen and (min-width: $desktop-mid - 1) {
      padding: 24px 0;
      border-radius: 12px;
      background-color: $light-grey;
      width: 327px;
      flex-shrink: 0;
    }
  }

  &__burger {
    width: 32px;
    height: 32px;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    top: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    text-indent: -9999px;
    overflow: hidden;

    @media screen and (min-width: $desktop-mid - 1) {
      display: none;
    }

    span {
      width: 18px;
      height: 2px;
      background-color: $text-black;
      position: relative;

      &::before,
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: $text-black;
        left: 0;
        transition: 0.2s;
        will-change: auto;
      }

      &::before {
        top: -5px;
      }

      &::after {
        bottom: -5px;
      }
    }

    &.active {
      span {
        background-color: transparent;

        &::before {
          top: calc(50% - 1px);
          left: calc(50% - 9px);
          transform: rotate(-45deg);
        }

        &::after {
          top: calc(50% - 1px);
          left: calc(50% - 9px);
          transform: rotate(45deg);
        }
      }
    }
  }

  &__nav {
    padding: 6px 0;
    margin: 0;

    @media screen and (max-width: $desktop-mid - 1) {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      &.visible {
        display: block;
        position: absolute;
        left: -15px;
        top: 100%;
        right: -15px;
        background-color: #ffffff;
        z-index: 10;
        width: 100vw;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }
    }

    ul {
      display: block;
      margin: 0;
      padding: 0;
      line-height: 1;

      li {
        list-style: none;
        margin: 0;
        display: block;
        padding: 0;

        &.active {
          & > a {
            color: $grt-blue;

            &::before {
              content: "";
              width: 2px;
              position: absolute;
              bottom: 0;
              left: 0;
              top: 0;
              background-color: $grt-blue;
            }
          }
        }

        a {
          display: block;
          padding: 6px 32px;
          margin: 6px 0;
          color: $text-black;
          position: relative;
          font-size: 14px;
          transition: 0.25s;
          font-weight: 600;
          line-height: 1.46;

          &:hover {
            background-color: #ffffff;
          }
        }

        ul {
          a {
            font-weight: 400;
            padding: 6px 44px;
            margin: 6px 0;
          }
        }
      }
    }
  }
}
</style>
