<template>
  <div ref="tooltipRef" class="grt-tooltip">
    <button :aria-label="$t('additional_info')" class="grt-tooltip__toggle" type="button"></button>
    <div :style="`left: ${tooltipBodyPosition}`" class="grt-tooltip__body">
      <p class="grt-tooltip__text">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
const TOOLTIP_INDENT = 8; // px

export default {
  props: {
    autoLeft: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tooltipPos: null,
    }
  },
  computed: {
    tooltipBodyPosition() {
      return this.tooltipPos && this.autoLeft ?
        `-${this.tooltipPos.left - TOOLTIP_INDENT}px` :
        `-${TOOLTIP_INDENT}px`;
    }
  },
  mounted() {
    this.tooltipPos = this.$refs.tooltipRef.getBoundingClientRect();
  }
}
</script>

<style lang="scss">
.grt-tooltip {
  position: relative;

  box-sizing: border-box;
  display: flex;
  align-self: center;
  padding-left: 8px;
  padding-right: 8px;
}

.grt-tooltip__toggle {
  position: relative;

  width: 16px;
  height: 16px;

  background-image: url("/nimages/icons/tooltip.svg");
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: -22px;
    left: 1px;
    z-index: 3;

    display: none;
    width: 14px;
    height: 14px;


    opacity: 0;
    background-color: #ffffff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);

    transform: rotate(45deg);
    transition: opacity 0.25s ease-in;
  }

  &:hover,
  &:focus {
    &::before,
    ~ .grt-tooltip__body {
      display: block;
      opacity: 1;
    }
  }
}

.grt-tooltip__body {
  position: absolute;
  bottom: 30px;
  left: -8px;
  z-index: 2;

  display: none;
  width: 190px;
  padding: 5px;

  opacity: 0;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

  transition: opacity 0.25s ease-in;
}

.grt-tooltip__text {
  position: relative;
  z-index: 2;

  background-color: #ffffff;
}
</style>
