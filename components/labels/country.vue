<template>
  <img
    class="product-card-labels__icon"
    :src="`/nimages/country-flags-svg/svg/${label.semanticId}.svg`"
    :alt="label.name"
  >
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: true
    }
  }
}
</script>
