<template>
  <div class="feature-card">
    <div class="feature-card__image-container">
      <LazyImg
        class="feature-card__image"
        :src="data.image"
        :alt="data.text"
      />
    </div>
    <p class="feature-card__text">{{data.text}}</p>
  </div>
</template>

<script>
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    LazyImg
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 248px;
}

.feature-card__image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  margin-bottom: 24px;

  border-radius: 50%;
  background-color: $grey-bg;
  overflow: hidden;
}

.feature-card__image {
  flex-shrink: 0;
  display: block;
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.feature-card__text {
  text-align: center;

  font-weight: 600;
  font-size: 17px;
  line-height: 23px;

  color: $text-black;
}
</style>

