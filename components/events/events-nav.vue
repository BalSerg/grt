<template>
  <aside class="static-page__sidebar">
    <div class="static-page__sidebar-title">
      <nuxt-link :to="localePath('/events/')">
        {{$t('section.header.events')}}
      </nuxt-link>
    </div>
    <nav class="static-page__nav" :class="{'visible': navStatus}">
      <ul>
        <li v-for="(val, key, idx) in eventsNavigation" :key="idx" class="static-page__nav-parent">
          <button
            class="static-page__nav-toggler"
            :class="{'expanded': $route.params.year === key}"
            @click="expandYear">
            Expand
          </button>
          <nuxt-link :to="localePath(`/events/year/${key}`)">
            {{key}}
          </nuxt-link>
          <ul>
            <li v-for="month in val" :key="month" class="static-page__nav-child">
              <nuxt-link :to="localePath(`/events/year/${key}/month/${month}`)">
                {{getNameOfMonth(key, month)}} {{key}}
              </nuxt-link>
            </li>
          </ul>
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
import { handleFetchError } from '@/assets/js/util';
export default {
  data() {
    return {
      eventsNavigation: [],
      navStatus: false,
    }
  },
  async fetch() {
    try {
      const path = 'napi/static-pages/events/dates';
      const { data } = await this.$axios.get(path);
      this.eventsNavigation = data.result;
    }
    catch(err) {
      console.log(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
  methods: {
    getNameOfMonth(year, month) {
      const output = new Date(year, month - 1);
      return output.toLocaleString(this.$i18n.locale, {month: 'long'});
    },
    expandYear(e) {
      e.target.classList.toggle('expanded');
    },
    toggleNav() {
      this.navStatus = !this.navStatus;
    }
  }
}
</script>

<style lang="scss">
.static-page {
  &__sidebar {
    position: relative;
    width: 100%;

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

      a {
        color: #000000;
      }

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

    &-toggler {
      outline: none;
      border: none;
      -webkit-appearance: none;
      width: 32px;
      height: 32px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      text-indent: -9909px;
      user-select: none;
      cursor: pointer;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='6' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.461 4.138L.863 7.736a.319.319 0 00.45.45l3.824-3.823a.319.319 0 000-.45L1.314.089a.319.319 0 00-.451.45l3.598 3.599z' fill='%23282828'/%3e%3c/svg%3e");

      &.expanded {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='9' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.862 4.46L1.264.864a.319.319 0 00-.45.45l3.823 3.824a.319.319 0 00.45 0l3.824-3.824a.319.319 0 00-.451-.45L4.862 4.46z' fill='%23282828'/%3e%3c/svg%3e");

        & ~ ul {
          display: block;
        }
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
        position: relative;

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

          &.nuxt-link-exact-active {
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

          &:hover {
            background-color: #ffffff;
          }
        }

        ul {
          display: none;

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
