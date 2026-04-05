<template>
  <section class="container catalog-category-description">
    <div
      class="catalog-category-description__body"
      v-html="categoryDescription"
    ></div>
  </section>
</template>

<script>
export default {
  props: {
    categoryDescription: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.catalog-category-description__body {
  padding: 24px 56px;

  color: #5b5b5b !important;

  background-color: $light-grey-ui;
  border-radius: 6px;

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h2 {
    margin-top: 0.83em;
    margin-bottom: 0.83em;

    font-size: 1.5em;
    font-weight: 600;
  }

  h3 {
    margin-top: 1em;
    margin-bottom: 1em;

    font-size: 1.17em;
    font-weight: 600;
  }
}
</style>
