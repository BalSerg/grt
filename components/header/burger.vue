<template>
  <div class="burger">
    <button class="burger-button" @click="openMenu">
      <span class="visually-hidden">{{$t('open_menu')}}</span>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C5.175 12 4.5 11.325 4.5 10.5C4.5 9.675 5.175 9 6 9H30C30.825 9 31.5 9.675 31.5 10.5C31.5 11.325 30.825 12 30 12H6ZM6 19.5H30C30.825 19.5 31.5 18.825 31.5 18C31.5 17.175 30.825 16.5 30 16.5H6C5.175 16.5 4.5 17.175 4.5 18C4.5 18.825 5.175 19.5 6 19.5ZM6 27H30C30.825 27 31.5 26.325 31.5 25.5C31.5 24.675 30.825 24 30 24H6C5.175 24 4.5 24.675 4.5 25.5C4.5 26.325 5.175 27 6 27Z" fill="#007AFF"/>
      </svg>
    </button>

    <transition name="slide-fade">
      <DrawerRight
        v-if="isOpen"
        :currencies="currencyList"
        @on-close="closeMenu"
      />
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    DrawerRight: () => import('@/components/common/drawer-right')
  },
  props: {
    currencyList: Array
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openMenu() {
      this.isOpen = true;
    },
    closeMenu() {
      this.isOpen = false;
    }
  }
}
</script>

<style lang="scss">
.burger {
  display: none;

  @media screen and (max-width: $pad - 1) {
    display: block;
  }

  @media screen and (max-width: $desktop-mid - 1) {
    display: block;
  }

  &-button {
    @media screen and (max-width: $desktop-mid) {
      width: 36px;
      height: 36px;
      margin-left: 0;
      background-color: #ffffff;
      border-radius: 0;
      outline: none;
      display: flex;
      cursor: pointer;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 0;

      svg {
        width: 36px;
        height: 36px;
      }
    }

    @media screen and (max-width: $pad - 1) {
      background-color: #ffffff;
      height: 32px;
      width: 32px;
      border-radius: 0;
      outline: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      margin-top: 0;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    @media (min-width: $desktop-mid) {
      width: 48px;
      height: 48px;

      svg {
        width: 48px;
        height: 48px;
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
