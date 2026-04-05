<template>
  <div class="container">
    <div class="error-page">
      <h1 class="error-page__header grt-h1">
        {{ $t('errors.500.something_went_wrong') }}
      </h1>
      <p class="error-page__message grt-text-1">
        {{ $t('errors.500.message') }}
      </p>
      <a href="/">{{ $t('errors.500.link') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error500',
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
  background-image: url("/nimages/errors/500.svg");
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
