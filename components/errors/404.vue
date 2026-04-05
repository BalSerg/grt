<template>
  <div class="container">
    <div class="error-page error-page--404">
      <h1 class="error-page__header grt-h1">{{ $t('errors.400.message') }}</h1>
      <old-link to="/">{{ $t('errors.400.link') }}</old-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.error-page {
  height: 80vh;
  margin-top: 53px;
  padding: 32px 0;
  background-image: url("/nimages/errors/404.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
  background-size: contain;

  @media (min-width: $desktop-mid) {
    margin-top: 0;
    padding: 64px 0;
    background-position-x: 25%;
    background-position-y: bottom;
  }
}

.error-page--404 {
  height: 70vh;
  background-size: contain;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  @media (min-width: $desktop-mid) {
    background-size: contain;
    background-position-x: right;
  }
}

.error-page__header {
  margin-bottom: 12px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
}

.error-page__message {
  max-width: 380px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
}
</style>
