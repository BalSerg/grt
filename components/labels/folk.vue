<template>
  <img src="/nimages/labels/folk.svg" class="folk-icon" :alt="label.name">
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.folk-icon {
  filter: brightness(1.75) saturate(0);
  transition: none;
}
</style>
