<template>
  <div class="cart-tabs">
    <div class="cart-tabs__wrapper">
      <div v-for="({grabType, count}, ind) of grabs"
           :key="ind"
           :class="{'cart-tabs__tab--active': grabType === displayedCartTab}"
           class="cart-tabs__tab"
           @click="changeTab(grabType)"
      >
        {{ $t('header.' + grabType) }}
        ({{ count }})
      </div>
      <HintPopup v-if="grabs.length > 1">
        {{ $t('hint') }}
      </HintPopup>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import PATH from 'assets/js/const.path'
import HintPopup from "@/components/common/hint-popup";

export default {
  components: {HintPopup},
  data() {
    return {
      grabs: [],
    }
  },
  mounted() {
    this.saveGrabs()
  },
  computed: {
    ...mapState('cart', ['cartSet', 'displayedCartTab']),
  },
  watch: {
    'cartSet.grabs': {
      handler() {
        this.saveGrabs();
      },
      deep: true,
    }
  },
  methods: {
    ...mapActions({
      FETCH_CART: 'cart/FETCH_CART',
    }),
    saveGrabs() {
      this.grabs = this.cartSet.grabs.filter(grab => grab.count > 0)
    },
    changeTab(grab) {
      if (grab === this.displayedCartTab) return

      this.$router.replace(this.localePath({
        path: PATH.CART,
        query: {grab}
      }))
    }
  },
}
</script>

<style lang="scss">
.cart-tabs {
  position: relative;

  @media (min-width: $pad) {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 8px;

      width: 100%;
      height: 1px;

      background-color: $grt-blue;
    }
  }
}

.cart-tabs__wrapper {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: -8px;
  padding: 8px 0 8px 16px;

  @media (max-width: 580px) {
    align-items: flex-start;
  }

  @media (max-width: $pad - 1) {
    overflow-x: scroll;

    &::after {
      content: "";
      position: relative;

      flex-shrink: 0;
      width: 16px;
      background-color: transparent;
    }
  }

  @media (min-width: $pad) {
    padding: 8px 16px;
  }

  @media (min-width: $desktop-mid) {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 8px 32px;
  }
}

.cart-tabs__tab {
  // box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 7px 16px 8px;
  margin-left: 8px;

  font-size: 16px;
  line-height: 1.4;
  color: $text-black;

  border: 1px solid $mid-grey-ui;
  border-radius: 40px;
  cursor: pointer;

  @media (min-width: $pad) {
    position: relative;
    padding: 6px 24px 9px;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.cart-tabs__tab--active {
  color: $white;

  border-color: $grt-blue;
  background-color: $grt-blue;

  @media (min-width: $pad) {
    z-index: 1;
    padding: 8px 24px 9px;

    color: $text-black;

    background-color: $white;
    border-bottom-color: $white;
    border-bottom-width: 1px;

    &::after {
      content: "";
      position: absolute;
      bottom: -3px;

      width: 100%;
      height: 3px;

      background-color: $white;
    }
  }
}
</style>
