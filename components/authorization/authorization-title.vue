<template>
  <h2 class="authorization-modal__head-title">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: "authorization-title"
}
</script>

<style lang="scss">
.authorization-modal__head-title {
  font-size: 23px;
  line-height: 34px;
  font-weight: 600;
  color: $text-black;
}
</style>
