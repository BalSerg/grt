<template>
  <div class="catalog-sidebar_nav">
    <div class="catalog-sidebar__close" @click="$emit('on-show-mobile-navigation')"></div>
    <div v-for="item in data" :key="item.key" class="catalog-sidebar_nav-item" >
      <nuxt-link :to="localePath(`${basePath}/${item.semanticId}/`)">{{item.name}}</nuxt-link>
      <div v-if="item.children">
        <div v-for="sibling in item.children" :key="sibling.key" class="catalog-sidebar_nav-sibling">
          <nuxt-link :to="localePath(`${basePath}/${sibling.semanticId}/`)">{{sibling.name}}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BasePath } from '@/assets/js/const';

export default {
  props: {
    data: Array
  },
  data() {
    return {
      basePath: BasePath.CATALOG
    }
  },
}
</script>

<style lang="scss">
.catalog-sidebar {
  flex-shrink: 0;
  width: 295px;
  padding-right: 30px;
  font-size: 13px;
  box-sizing: border-box;

  @media screen and (max-width: $desktop-mid - 1) {
    width: 0;
    flex-shrink: 1;
    padding: 0;
  }

  &__close {
    display: none;

    @media screen and (max-width: $desktop-mid - 1) {
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 40px;
      background-color: #ffffff;
      z-index: 100;
      box-shadow: 0 0 3px 10px rgba(255, 255, 255, 0.75);

      &::before,
      &::after {
        content: "";
        width: 2px;
        height: 18px;
        background-color: $text-black;
        position: absolute;
        top: calc(50% - 9px);
        left: calc(50% - 1px);
      }

      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }
  }

  &_nav {
    padding-bottom: 20px;

    &-item {
      @media screen and (max-width: $pad - 1) {
        padding: 0 4px;

        &:last-child {
          padding-bottom: 50px;
        }
      }

      & > a {
        color: #282828;
        text-decoration: none;
        padding: 5px 12px;
        position: relative;
        margin-bottom: 4px;
        display: block;
        border-radius: 4px;

        &::before {
          content: "";
          width: 7px;
          height: 7px;
          border: 1px solid transparent;
          border-left-color: #282828;
          border-top-color: #282828;
          position: absolute;
          top: calc(50% - 3.5px);
          border-radius: 1px;
          left: 0;
          transform: rotate(-45deg);
          box-sizing: border-box;
        }
      }

      &:last-child {
        & > a {
          background-color: #83eed4;

          &::before {
            content: unset;
          }
        }
      }
    }

    &-sibling {
      padding-left: 12px;

      a {
        color: #282828;
        text-decoration: none;
        padding: 5px 12px;
        position: relative;
        margin-bottom: 4px;
        border-radius: 4px;
        display: block;
        transition: 300ms;

        &:hover {
          background-color: #a7f3e0;
        }

        &::before {
          content: unset;
        }
      }
    }

    @media screen and (max-width: $desktop-mid - 1) {
      display: none;
    }
  }

  &_filter {
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 13px;
    color: #282828;

    &-row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    &-item {
      margin-bottom: 24px;
    }

    &-title {
      font-weight: 600;
      flex-grow: 1;
    }

    &-helper {
      color: #7e7e7e;
      border-bottom: 1px dashed #7e7e7e;
      cursor: pointer;
    }

    &-expander {
      color: #007aff;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>
