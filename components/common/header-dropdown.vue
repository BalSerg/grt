<template>
  <div class="header-dropdown">
    <div class="header-dropdown__dialog">
      <slot></slot>
    </div>
    <div class="header-dropdown__overlay" @click="close"></div>
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener('keyup', this.onEscKeyup);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onEscKeyup);
  },
  methods: {
    close() {
      this.$emit('on-close');
    },
    onEscKeyup(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }
}
</script>

<style lang="scss">
.header-dropdown {
  position: absolute;
  top: 60px;
  left: calc(50% - 108px);
  z-index: $zAbove + $zHeader;
}

.header-dropdown__dialog {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $zBase;

  box-sizing: border-box;
  display: block;
  padding: 16px;

  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);

  &::before {
    content: "";
    position: absolute;
    top: -7px;
    left: calc(50% - 7px);
    z-index: $zBelow + $zBase;

    width: 14px;
    height: 14px;

    background-color: #ffffff;

    transform: rotate(45deg);
  }
}

.header-dropdown__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $zBelow + $zBase;

  display: block;

  background-color: rgba(0, 0, 0, 0);
}

</style>

