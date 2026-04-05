<template>
  <span class="skeleton skeleton--one-line-text">
    <span>Loading</span>
  </span>
</template>

<style lang="scss">
.skeleton--one-line-text {
  display: inline-block;
  width: 40px;
  height: 18px;

  font-size: 13px;
  line-height: 1.4;
  vertical-align: baseline;

  span {
    visibility: hidden;
  }
}
</style>
