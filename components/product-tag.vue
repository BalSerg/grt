<template>
  <div class="product-tag" :style="`--tag-color: ${bgColor};`">
    {{ text }}
  </div>
</template>

<script>

const TagColor = {
  FUCHSIA: '#fc3f71',
  LAVENDER: '#cf97e4',
  GREEN: '#219653',
};

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgColor() {
      return TagColor[this.color.toUpperCase()] || '#bebebe';
    }
  }
}
</script>

<style lang="scss">
.product-tag {
  --tag-color: #bebebe;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  font-size: 10px;
  line-height: 1.3;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;

  background-color: var(--tag-color, #bebebe);
  border-radius: 3px;
  cursor: default;
}
</style>
