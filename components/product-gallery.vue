<template>
  <div class="product-gallery">

    <div
      ref="bigImageRef"
      class="product-gallery__big-image-wrapper"
    >
      <ProductLabels
        v-if="visibleLabels.length > 0"
        :visible-labels="visibleLabels"
      />

      <!-- TODO: Порефакторить в будущем. -->
      <div
        v-for="media in productGallery.media"
        :key="media.link"
        class="product-gallery__media"
      >
        <ProductImage
          v-if="media.link === selectedMedia.link"
          :name="productGallery.productName"
          :selected-media="getProperImage(media)"
          :type="media.type"
        />
      </div>
    </div>

    <button
      v-if="isControlVisible"
      class="product-gallery__control product-gallery__control--prev"
      type="button"
      @click="showPrevPhoto"
    >
      <span class="visually-hidden">{{$t('show_previous_photo')}}</span>
      <svg fill="none" height="8" width="15" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 1.3l5.8 6.04c.2.21.52.21.72 0 .2-.2.2-.55 0-.75L7.86.16a.5.5 0 00-.73 0L.98 6.59c-.2.2-.2.55.01.75.2.2.51.2.71 0L7.5 1.3z" fill="#B8B8B8"/>
      </svg>
    </button>
    <button
      v-if="isControlVisible"
      class="product-gallery__control product-gallery__control--next"
      type="button"
      @click="showNextPhoto"
    >
      <span class="visually-hidden">{{$t('show_next_photo')}}</span>
      <svg fill="none" height="8" width="15" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 6.7L1.7.67a.5.5 0 00-.72 0c-.2.2-.2.55 0 .75l6.16 6.43c.2.21.53.21.73 0l6.15-6.43c.2-.2.2-.55-.01-.75a.5.5 0 00-.71 0L7.5 6.7z" fill="#B8B8B8"/>
      </svg>
    </button>

    <div class="product-gallery__carousel-wrapper">
      <div ref="carouselRef" class="product-gallery__carousel">
        <div v-for="(image, idx) in productGallery.media"
          :key="`image-${idx}`"
          class="product-gallery__carousel-card"
        >
          <label
            class="product-gallery__card-container"
          >
            <input
              v-model="selectedMedia"
              :value="image"
              class="product-gallery__card-selector"
              name="product-image"
              type="radio"
            >
            <ProductGalleryImage
              :image="getProperThumb(image.link)"
              :mainImage="mainImage"
              :name="productGallery.productName"
              :type="image.type"
            />
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ResizeObserver} from '@juggle/resize-observer';
import GetProperImageMX from '@/mixins/get-proper-image-mx';
import {MediaType} from '@/assets/js/const';

import ProductImage from '@/components/product-image';
import ProductGalleryImage from '@/components/product-gallery-image';


const COUNTRY_TYPE = 'country';

export default {
  components: {
    ProductImage,
    ProductGalleryImage,
    ProductLabels: () => import('@/components/product-labels'),
  },
  mixins: [GetProperImageMX],
  props: {
    productGallery: {
      type: Object,
      default: () => ({
        productName: '',
        labels: [],
        media: []
      })
    }
  },
  data() {
    return {
      selectedMedia: this.productGallery.media[0],
      isControlVisible: true,
      resizeObserver: null,
      mainImage: null,
    }
  },
  computed: {
    photosCount() {
      return this.productGallery.media ? this.productGallery.media.length : 0
    },
    visibleLabels() {
      return this.productGallery.labels.filter(x => x.typeSemanticId !== COUNTRY_TYPE);
    },
  },
  mounted() {
    const carousel = this.$refs.carouselRef;
    const bigImage = this.$refs.bigImageRef;

    this.resizeObserver = new ResizeObserver(() => {
      this.isControlVisible = carousel.clientHeight > bigImage.clientHeight;
    });

    this.resizeObserver.observe(carousel);
    this.resizeObserver.observe(bigImage);
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    getProperImage(media) {
      if (media.type === MediaType.VIDEO) {
        return media.link
      }
      const listImages = [697, 731, 697, 566, 731, 697, 566, 290].map(size => `${this.$mx_getProperImage(media.link, `pc-main-${size}`)}`)
      this.mainImage = listImages[0]
      return listImages
    },
    getProperThumb(img) {
      return this.$mx_getProperImage(img, "pc-thumb");
    },
    findCurrentIndex() {
      return this.productGallery.media.findIndex((it) => it.link === this.selectedMedia.link);
    },
    findPrevIndex(index) {
      return index === 0 ? this.productGallery.media.length - 1 : index - 1;
    },
    findNextIndex(index) {
      return index >= this.productGallery.media.length - 1 ? 0 : index + 1;
    },
    selectNextPhoto(index) {
      this.selectedMedia = this.productGallery.media[index];
      this.$refs.carouselRef.style.transform = `translateY(-${100 / this.photosCount * index}%)`;
    },
    showPrevPhoto() {
      const currentIndex = this.findCurrentIndex();
      const nextIndex = this.findPrevIndex(currentIndex);
      this.selectNextPhoto(nextIndex);
    },
    showNextPhoto() {
      const currentIndex = this.findCurrentIndex();
      const nextIndex = this.findNextIndex(currentIndex);
      this.selectNextPhoto(nextIndex);
    },
  }
}
</script>

<style lang="scss">
$mobile-indent-horizontal: 15px;
$mobile-col-gap: 6px;

.product-gallery {
  position: relative;

  overflow: hidden;

  @media (min-width: $desktop-mid) {
    display: grid;
    grid-template-columns: 58px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "gallery big-image";
    column-gap: 24px;
    margin-top: -5px;
    padding-top: 5px;
    margin-bottom: -5px;
    padding-bottom: 5px;
  }

  @media (min-width: $desktop-large) {
    grid-template-columns: 93px 1fr;
  }
}

.product-gallery__big-image-wrapper {
  display: grid;
  box-sizing: border-box;
  padding: 0 15px;
  flex-grow: 1;

  border-radius: 4px;

  @media (min-width: $pad) {
    padding: 0;
  }

  @media (min-width: $desktop-mid) {
    grid-area: big-image;
  }
}

.product-gallery__carousel-wrapper {
  position: relative;
  overflow: hidden;

  @media (min-width: $desktop-mid) {
    grid-area: gallery;
    width: 58px;
  }

  @media (min-width: $desktop-large) {
    width: 93px;
  }
}

.product-gallery__carousel {
  display: grid;
  margin-left: $mobile-indent-horizontal;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 58px);
  column-gap: $mobile-col-gap;
  margin-top: 12px;

  overflow-x: auto;
  border-radius: 4px;

  transition: all ease-out 0.3s;

  @media (max-width: $pad - 1) {
    &::after {
      content: "";
      position: relative;

      flex-shrink: 0;
      width: $mobile-indent-horizontal - $mobile-col-gap;

      background-color: transparent;
    }
  }

  @media (max-width: $desktop-mid - 1) {
    transform: translateY(0) !important;
  }

  @media (min-width: $pad) {
    margin-left: 0;
    margin-right: 0;
    margin-top: 18px;
  }

  @media (min-width: $desktop-mid) {
    position: absolute;
    top: 0;
    left: 0;

    grid-auto-flow: row;
    grid-template-rows: repeat(auto-fill, 58px);
    row-gap: 4px;
    margin: 0;

    overflow: hidden;
  }

  @media (min-width: $desktop-large) {
    grid-template-columns: repeat(auto-fill, 93px);
    grid-template-rows: repeat(auto-fill, 93px);
  }
}

.product-gallery__carousel-card {
  width: 58px;
  height: 58px;

  cursor: pointer;

  @media (min-width: $desktop-large) {
    width: 93px;
    height: 93px;
  }
}

.product-gallery__card-container {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  cursor: pointer;
}

.product-gallery__card-selector {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  width: 58px;
  height: 58px;
  margin: 0;
  box-sizing: border-box;

  appearance: none;
  opacity: 0.00001;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:checked + .product-gallery-image {
    border-color: $grt-blue;
  }

  &:focus + .product-gallery-image {
    border-color: $grt-blue;
  }

  @media (min-width: $desktop-large) {
    width: 93px;
    height: 93px;
  }
}

.product-gallery__control {
  display: none;

  @media (min-width: $desktop-mid) {
    position: absolute;
    left: 12px;
    z-index: 3;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 20px;
    padding: 0;

    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline-color: $grt-blue;
    cursor: pointer;

    svg path {
      transition: all ease 0.3s;
    }

    &:active svg path {
      fill: $grt-blue;
    }

    &--prev {
      top: 1px;
    }

    &--next {
      bottom: 1px;
    }
  }

  @media (min-width: $desktop-large) {
    left: 26px;

    width: 42px;
    height: 24px;
  }
}

.product-gallery__media {
  grid-column: 1;
  grid-row: 1;
}
</style>
