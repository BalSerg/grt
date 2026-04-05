<template>
  <button
    class="base-button"
    type="button"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import "assets/scss/_mixins";

.base-button {
  @include base-button();
}
</style>
