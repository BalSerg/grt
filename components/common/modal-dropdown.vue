<template>
  <div class="modal-dropdown" :class="isFullPage">
    <div class="modal-dropdown__modal" :class="getOpenedClass">
      <slot></slot>
    </div>
    <div class="modal-dropdown__overlay" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpened: Boolean,
    positioned: String,
    fullPage: Boolean
  },
  computed: {
    getOpenedClass () {
      return this.isModalOpened ?  'modal-dropdown__modal--opened' : '';
    },
    isFullPage () {
      return this.fullPage ? `modal-dropdown--full-page` : '';
    }
  },
  methods: {
    closeModal() {
      this.$emit('onModalClose');
    }
  }
}
</script>

<style lang="scss">
.modal-dropdown {
  z-index: $zModal;

  @media (min-width: $desktop-mid) {
    position: absolute;
    top: 60px;
    left: calc(50% - 108px);
    // z-index: 1000;
  }
}

.header .modal-dropdown {
  z-index: $zBelow + $zHeader;
}

.modal-dropdown__modal {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  box-sizing: border-box;
  display: none;
  padding: 16px 15px 8px;

  background-color: #ffffff;

  @media (min-width: 768px) {
    top: 70px;
  }

  @media (min-width: $desktop-mid) {
    position: relative;
    top: 0;

    border-radius: 4px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);

    &::before {
      content: "";
      position: absolute;
      top: -7px;
      left: calc(50% - 7px);
      z-index: 2;

      width: 14px;
      height: 14px;

      background-color: #ffffff;

      transform: rotate(45deg);
    }
  }
}

.header .modal-dropdown__modal {
  bottom: 52px;
}

.modal-dropdown--full-page .modal-dropdown__modal {
  @media (max-width: 1023px) {
    top: 0;
    bottom: 0;
  }
}

.modal-dropdown__modal--opened {
  display: block;
}

.modal-dropdown__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: none;

  background-color: rgba(0, 0, 0, 0);
}

.modal-dropdown__modal--opened ~ .modal-dropdown__overlay {
  display: block;
}
</style>

