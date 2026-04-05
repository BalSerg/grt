<template>
  <button
    class="filter-reset-btn"
    type="button"
    @click="reset"
  >
    <slot>{{$t('reset')}}</slot>
  </button>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$emit('reset-filter');
    }
  }
}
</script>

<style lang="scss">
.filter-reset-btn {
  padding: 0;

  font-size: 13px;
  line-height: 1.4;
  color: $text-grey;

  background-color: transparent;
  border-bottom: 1px dashed $text-grey;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    color: $grt-blue;
    border-color: $grt-blue;
  }
}
</style>
