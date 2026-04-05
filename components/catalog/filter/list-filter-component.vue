<template>
  <div class="catalog-sidebar_filter-item">
    <div class="catalog-sidebar_filter-row">
      <div class="catalog-sidebar_filter-title">{{data.title}}</div>
      <div class="catalog-sidebar_filter-helper">
        Сбросить
      </div>
    </div>
    <div class="catalog-sidebar_filter-list">
      <div v-for="item in data.items" :key="item.key" class="catalog-sidebar_filter-listitem">
        <input :id="item.key" type="checkbox" :name="item.name">
        <label :for="item.key">{{item.title}}</label>
      </div>
    </div>
    <div class="catalog-sidebar_filter-expander">Посмотреть все</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss">
.catalog-sidebar_filter-list {
  margin: 8px 0;
}
</style>
