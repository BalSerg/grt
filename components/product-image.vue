<template>
  <div class="product-image">

    <ProductVideo
      v-if="isVideo"
      :src="selectedMedia"
      :title="name"
    />

    <template v-else>
      <picture
        ref="imageRef"
        class="product-image__img"
        @mouseleave="unzoomImg"
        @mousemove="zoomImg"
      >
        <template v-for="(image, idx) in selectedMedia">
          <source
            :key="idx"
            :media="sizeList[idx]"
            :srcset="image"
          >
        </template>
        <img
          ref="imageRef"
          :src="mainImage"
          alt="name"
          class="product-image__img"
          @mouseleave="unzoomImg"
          @mousemove="zoomImg"
        >
      </picture>
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {MediaType} from '@/assets/js/const';

const MIN_IMAGE_ZOOM_SIZE = 800; // px

export default {
  components: {
    ProductVideo: () => import('@/components/product-video'),
  },
  data() {
    return {
      sizeList: [
        '(min-width: 1440px)',
        '(max-width: 1439px) and (min-width: 1381px)',
        '(max-width: 1380px) and (min-width: 1161px)',
        '(max-width: 1160px) and (min-width: 768px)',
        '(max-width: 767px) and (min-width: 721px)',
        '(max-width: 720px) and (min-width: 591px)',
        '(max-width: 590px) and (min-width: 321px)',
        '(max-width: 320px)'
      ]
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    selectedMedia: {
      type: [String, Array],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    mainImage: String,
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop',
    }),
    isVideo() {
      return this.type === MediaType.VIDEO;
    },
  },
  methods: {
    zoomImg(evt) {
      if (!this.isDesktop) return
      if (
        this.$refs.imageRef.naturalWidth < MIN_IMAGE_ZOOM_SIZE ||
        this.$refs.imageRef.naturalHeight < MIN_IMAGE_ZOOM_SIZE
      ) {
        this.$refs.imageRef.style.cursor = `default`;
        return
      }

      const currentTarget = evt.currentTarget;
      const {left, top, width, height} = currentTarget.getBoundingClientRect();

      const x = Number(50 - ((evt.clientX - left) / width) * 100) / 2;
      const y = Number(50 - ((evt.clientY - top) / height) * 100) / 2;

      this.$refs.imageRef.style.transform = `scale(2) translate(${x}%, ${y}%)`;
    },
    unzoomImg() {
      if (!this.isDesktop) return
      this.$refs.imageRef.style.transform = '';
    }
  }
}
</script>

<style lang="scss">
.product-image {
  position: relative;

  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  min-width: 58px;
  width: 100%;
  padding-top: 100%;

  border-radius: 4px;
  overflow: hidden;
}

.product-image__no-image {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  background-color: $grey;
  border-radius: 4px;
}

.product-image__img {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  background-color: #f6f6f6;
  object-fit: contain;

  @media (min-width: $desktop-mid) {
    &:hover {
      cursor: zoom-in;
    }
  }
}

.product-image__video-embed {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
</style>
