<template>
  <div class="catalog-sidebar_filter-item">
    <div class="catalog-sidebar_filter-row">
      <div class="catalog-sidebar_filter-title">{{data.title}}</div>
      <div class="catalog-sidebar_filter-toggler" :class="{'active': active}" @click="active = !active"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data(){
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
.catalog-sidebar_filter-toggler {
  width: 32px;
  height: 16px;
  background-color: #bebebe;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: linear 200ms;

  &::before {
    content: "";
    position: absolute;
    left: 1px;
    top: 1px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    transition: ease 0.28s;
  }

  &.active {
    background-color: #13b8ae;

    &::before {
      left: calc(100% - 15px);
    }
  }
}
</style>
