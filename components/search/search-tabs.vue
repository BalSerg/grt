<template>
  <div class="search-heading">
    <div v-if="!pageLoaded" class="search-query blank">&nbsp;</div>
    <div v-else class="search-query">
      <i18n path="search_results_by_request">
        <template #request>
          <strong>{{ decodedSlug }}</strong>
        </template>
        <template #entity>
          <span>{{ $t(`search.tabs.${tabsActive}`).toLowerCase() }}</span>
        </template>
      </i18n>
      {{ tabsCount[tabsActive] }}
    </div>
    <div class="search-tabs">
      <div class="search-tabs__nav">
        <button
          v-for="(value, key) in tabsCount"
          :key="key"
          :ref="`${key}-tab`"
          class="search-tab"
          :class="{'active-tab' : active === key }"
          :disabled="value <= 0"
          @click="switchTab(key)"
        >
          <div class="search-tab__label">
            {{$t(`search.tabs.${key}`)}}
          </div>
          <div class="search-tab__count">
            ({{value}})
          </div>
        </button>
        <div
          class="search-tab__indicator"
          :style="`left: ${tabIndicator.left}px; width: ${tabIndicator.right}px`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabsCount: Object,
    tabsActive: String
  },
  data() {
    return {
      active: '',
      pageLoaded: false,
      tabIndicator: {
        left: 0,
        right: 0
      }
    }
  },
  computed: {
    decodedSlug() {
      return decodeURIComponent(this.$route.params.slug);
    }
  },
  mounted() {
    this.active = this.tabsActive;
    this.updateTab();
    this.pageLoaded = true;
  },
  methods: {
    updateTab(){
      setTimeout(() => {
        this.tabIndicator.left = Math.ceil(this.$refs[`${this.tabsActive}-tab`][0]?.offsetLeft);
        this.tabIndicator.right = Math.ceil(this.$refs[`${this.tabsActive}-tab`][0]?.getBoundingClientRect().width);
      }, 100)
    },

    switchTab(name) {
      if(name === this.tabsActive) {
        return;
      }
      this.$emit('onChangeTab', name)
      const el = this.$refs[`${name}-tab`][0];
      this.tabIndicator.left = Math.ceil(el.offsetLeft);
      this.tabIndicator.right = Math.ceil(el.getBoundingClientRect().width);
    }
  }
}
</script>

<style lang="scss">
.search-heading {
  @media screen and (max-width: $desktop-mid - 1) {
    padding-top: 60px;
  }
}

.search-query {
  font-size: 17px;
  line-height: 1.6;
  padding: 24px 0 30px;

  @media screen and (max-width: $pad - 1) {
    padding: 0 0 12px;
  }
}

.search-tabs {
  &__nav {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid $grey;

    @media screen and (max-width: $pad - 1) {
      justify-content: space-between;
    }
  }

  &__container {
    padding: 40px 0;
  }
}

.search-tab {
  margin-right: 60px;
  cursor: pointer;
  padding: 7px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  background-color: #ffffff;
  outline: none;

  @media screen and (max-width: $pad - 1) {
    margin: 0;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &__label {
    color: $text-grey;
  }

  &__count {
    color: $text-grey;
    padding-left: 6px;
  }

  &.active-tab {
    .common-tab__label {
      color: $text-black;
    }
  }

  &__indicator {
    position: absolute;
    bottom: -3px;
    height: 5px;
    border-radius: 7px;
    background-color: $azure;
    transition: all ease-in-out 300ms;
  }
}
</style>
