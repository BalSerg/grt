<template>
  <div class="label-tooltip">
    <span class="label-tooltip__text">{{label.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'LabelTooltip',
  props: {
    label: {
      type: Object,
      required: true,
      default: () => {return {}}
    }
  }
}
</script>

<style lang="scss">
.label-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 12px;
  padding-top: 6px;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: 200ms;

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4.5px 6px 4.5px;
    border-color: transparent transparent #ececec transparent;
    position: absolute;
    right: 8px;
    top: 0;
  }

  &__text {
    max-width: 220px;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    color: #000000;
    padding: 6px 9px;
    box-sizing: border-box;
    display: block;
  }
}
</style>