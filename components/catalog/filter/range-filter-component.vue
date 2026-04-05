<template>
  <div class="catalog-sidebar_filter-item">
    <div class="catalog-sidebar_filter-row">
      <div class="catalog-sidebar_filter-title">
        {{data.title}}
      </div>
      <div class="catalog-sidebar_filter-helper">
        Сбросить
      </div>
    </div>
    <div class="catalog-sidebar_filter-range">
      <input type="range" :min="data.min" :max="data.max" multiple="multiple" step="100" :value="data.max / 2">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>
