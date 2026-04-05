<template>
  <div class="authorization-modal__text-choice">{{ $t('authorization.choice') }}</div>
</template>

<script>
export default {
  name: "authorization-text-choice"
}
</script>

<style lang="scss">
.authorization-modal__text-choice {
  font-size: 14px;
  line-height: 19px;
  color: $text-black;
  text-align: center;
}
</style>
