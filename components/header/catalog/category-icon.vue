<template>
  <div>
    <img
      v-if="icon"
      class="catalog__item-icon"
      :src="`/nimages/icons/fullcategories/${icon}`"
      :alt="alt"
    >
    <DefaultCategoryIcon v-else />
  </div>
</template>

<script>
import DefaultCategoryIcon from './default-category-icon.vue';

export default {
  components: {
    DefaultCategoryIcon
  },
  props: {
    icon: {
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog__item {
  &:hover {
    .catalog__item-icon {
      filter: grayscale(0);
    }
  }

  .catalog__item-icon {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: scale-down;
    filter: grayscale(1);
    flex-shrink: 0;
    margin-right: 10px;
  }
}
</style>
