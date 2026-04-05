<template>
  <ul class="news__tag-box">
    <li v-for="(tag, i) in tagsArr" :key="i" class="news__tag">
      {{ tag.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tagsArr: {
      type: Array,
      default: () => [],
    }
  },
}
</script>

<style scoped lang="scss">
.news {
  &__tag-box {
    display: flex;
    padding: 0;
    margin: 0;
  }

  &__tag {
    margin: 0 8px 0 0;
    padding: 3px 7px;
    background: #219653;
    border-radius: 3px;
    color: $white;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    list-style: none;
  }
}
</style>
