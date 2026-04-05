<template>
  <div class="product-labels">
    <div
      v-for="label in visibleLabels"
      :key="label.semanticId"
      class="product-labels__label-item"
    >
      <nuxt-link
        class="product-labels__label-wrapper"
        :to="label.link"
      >
        <img
          class="product-labels__label-icon"
          :src="`/nimages/product-labels/${label.semanticId}.svg`"
          :alt="label.name"
        >
        <LabelTooltip :label="label" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import LabelTooltip from '@/components/labels/label-tooltip';

export default {
  components: {
    LabelTooltip,
  },
  props: {
    visibleLabels: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.product-labels {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
}

.product-labels__label-item {
  padding: 8px;
}

.product-labels__label-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  position: relative;

  &:hover {
    .label-tooltip {
      visibility: visible;
      opacity: 1;
    }
  }
}

.product-labels__label-icon {
  display: block;
}
</style>
