<template>
  <div class="header-tool__wrapper header-tool__profile">
    <button class="header-tool header-tool__ultimate" @click="openModal">
      <div class="header-tool__icon">
        <user-avatar-with-login/>
      </div>
      <div class="header-tool__text">
        {{ $t('header.profile') }}
      </div>
    </button>
    <ModalDropdown :is-modal-opened="isModalOpened" @onModalClose="closeModal">
      <UserMenu />
    </ModalDropdown>
  </div>
</template>

<script>
import UserMenu from '@/components/header/user-menu';
import ModalDropdown from '@/components/common/modal-dropdown';
import UserAvatarWithLogin from "@/components/common/user-avatar-with-login";

export default {
  components: {
    UserMenu,
    ModalDropdown,
    UserAvatarWithLogin
  },
  data() {
    return {
      isModalOpened: false
    };
  },
  watch: {
    isModalOpened(isVisible) {
      return isVisible ? this.$disableBodyScroll() : this.$enableBodyScroll();
    }
  },
  methods: {
    openModal() {
      this.isModalOpened = true;
      document.addEventListener('keydown', this.onEscPress);
    },
    closeModal() {
      this.isModalOpened = false;
      document.removeEventListener('keydown', this.onEscPress);
    },
    onEscPress(evt) {
      if (evt.key === 'Escape') {
        this.closeModal();
      }
    }
  }
};
</script>

<style lang="scss">
.header-tool__blank {
  animation-delay: 0.25s;
}

.header-tool {
  appearance: none;
  border: none;
  background-color: transparent;
}

.header-tool__wrapper {
  position: relative;
}

.header-tool__profile {
  order: 2;

  @media (min-width: $desktop-mid) {
    order: 0;
  }
}
</style>
