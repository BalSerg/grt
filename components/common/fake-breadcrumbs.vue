<template>
  <div class="catalog-breadcrumbs fake">
    <template v-if="isLoading">
      <div class="breadcrumbs-skeleton">
        &nbsp;
      </div>
    </template>
    <template v-else>
      <div class="catalog-crumb">
        <div class="catalog-breadcrumbs__link">
          <nuxt-link :to="localePath('/')">{{$t('homepage')}}</nuxt-link>
        </div>
        <div class="catalog-breadcrumbs__toggler"></div>
      </div>
      <div v-if="fakeParent" class="catalog-crumb">
        <nuxt-link :to="localePath(fakeParent.url)">
          {{$t(fakeParent.title)}}
        </nuxt-link>
        <div class="catalog-breadcrumbs__toggler"></div>
      </div>
      <div class="catalog-crumb">
        {{fakePath}}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    fakePath: {
      type: String,
      required: true
    },
    fakeParent: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.isLoading = !this.isLoading
  }
}
</script>

<style lang="scss">
.catalog-breadcrumbs {
  padding: 10px 0;
  font-size: 13px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  &.fake {
    .catalog-breadcrumbs__toggler {
      cursor: default;
    }
  }

  &__toggler {
    margin: 0 0 0 10px;
    font-size: 10px;
    width: 10px;
    height: 10px;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      border-right: 1px solid #7e7e7e;
      border-bottom: 1px solid #7e7e7e;
      transition: 0.1s;
      position: absolute;
      top: calc(50% - 3px);
      right: calc(50% - 2px);
      transform: rotate(-45deg);
    }
  }

  .breadcrumbs-skeleton {
    padding: 15px 10px 15px;
  }

  .catalog-crumb {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
    padding: 15px 10px 15px 0;

    @media screen and (max-width: $desktop-mid - 1) {
      display: none;

      &:nth-last-child(2) {
        display: flex;
      }
    }

    &.active {
      .catalog-crumb__kids {
        visibility: visible;
        display: block;
      }

      .catalog-breadcrumbs__toggler {
        &::after {
          transform: rotate(45deg);
          left: calc(50% - 4px);
          top: calc(50% - 6px);
        }
      }
    }
  }
}
</style>
