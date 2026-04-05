<template>
  <div class="product-gallery-image">
    <div
      v-if="isVideo"
      class="product-gallery-image__video"
    ></div>
    <LazyImg
      v-else
      class="product-gallery-image__img"
      :src="image"
      :alt="name"
    />
  </div>
</template>

<script>
import { MediaType } from '@/assets/js/const';
import LazyImg from '@/components/lazy-img';


export default {
  components: {
    LazyImg
  },
  props: {
    name: String,
    image: String,
    type: String,
  },
  computed: {
    isVideo() {
      return this.type === MediaType.VIDEO;
    }
  }
}
</script>

<style lang="scss">
.product-gallery-image {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 58px;

  border-radius: 4px;
  border: 2px solid transparent;
  overflow: hidden;

  transition: all ease 0.3s;

  @media (min-width: $desktop-large) {
    width: 93px;
    height: 93px;
  }
}

.product-gallery-image__img {
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  background-color: #f6f6f6;
  object-fit: contain;
  object-position: center;
}

.product-gallery-image__video {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-image: url("/nimages/icons/play-video.svg");
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center;
  background-color: #f6f6f6;
}
</style>
