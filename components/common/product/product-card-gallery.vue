<template>
  <div class="product-card__gallery">
    <div
      class="product-card__cover"
      @touchstart="startSwipe"
      @touchend="endSwipe"
    >
      <nuxt-link :to="localePath(galleryOptions.link)">
        <LazyImg
          v-for="(image, idx) in slicedGallery"
          :key="`image-${idx}`"
          class="product-card__cover-img"
          :class="{'product-card__cover-img--selected': image === coverSrc}"
          :alt="galleryOptions.alt"
          :src="getProperImage(image)"
        />
      </nuxt-link>
    </div>

    <ProductCardLabels
      class="product-card__labels"
      :supplier="galleryOptions.supplier"
      :labels="galleryOptions.labels"
    />

    <div v-if="galleryOptions.discount < 100" class="product-card__discount">
      -{{ galleryOptions.discount }}%
    </div>

    <template v-if="galleryOptions.gallery.length > 1">
      <div
        class="product-card__shutter"
        @mouseleave="returnCover"
        @click="goToProduct"
      >
        <div
          v-for="(shutter, idx) in slicedGallery"
          :key="idx"
          class="product-card__shutter-slice"
          @mouseenter="changeCover(shutter, idx)"
        ></div>
      </div>

      <div class="product-card__paginator">
        <button
          v-for="(shutter, idx) in slicedGallery"
          :key="`slide-btn-${idx}`"
          type="button"
          class="product-card__paginator-bullet"
          :class="{ active: count === idx }"
          @click="changeCover(shutter, idx)"
        >
          <span class="visually-hidden">{{ `${$t('slide')} ${1 + idx}` }}</span>
        </button>
      </div>
    </template>

  </div>
</template>

<script>
import { DefaultImage } from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';

import LazyImg from '@/components/lazy-img';
import ProductCardLabels from '@/components/common/product/product-card-labels';

export default {
  components: {
    LazyImg,
    ProductCardLabels,
  },
  mixins: [GetProperImageMX],
  props: {
    galleryOptions: {
      gallery: {
        type: Array,
        default: []
      },
      link: {
        type:String,
        default: ''
      },
      alt: {
        type:String,
        default: ''
      },
      discount: {
        type: Number,
        default: 0
      },
      supplier: {
        type: Object,
        default: {
          countryId: '',
          countryName: ''
        }
      },
      labels: {
        type: Array,
        default: []
      },
    }
  },
  data() {
    return {
      cover: null,
      count: 0,
      shift: null,
    };
  },
  computed: {
    defaultCover() {
      return this.galleryOptions.gallery.length < 1
        ? DefaultImage.NO_PRODUCT_PHOTO
        : this.galleryOptions.gallery[0];
    },
    slicedGallery() {
      return this.galleryOptions.gallery.slice(0, 5);
    },
    coverSrc() {
      return this.cover || this.defaultCover;
    },
  },
  methods: {
    getProperImage(img) {
      return this.$mx_getProperImage(img, "minipc-main");
    },
    startSwipe(evt) {
      this.shift = Math.abs(evt.changedTouches[0].clientX)
    },
    endSwipe(evt) {
      const swipe = Math.abs(evt.changedTouches[0].clientX);
      const sens = 45;
      if ((this.shift - swipe) > sens) {
        if (this.count >= this.slicedGallery.length -1) {
          this.count = 0;
          this.swipeCover();
        }
        else {
          this.count++;
          this.swipeCover();
        }
        return;
      }

      if ((swipe - this.shift) > sens) {
        if (this.count === 0) {
          this.count = this.slicedGallery.length -1;
          this.swipeCover();
        }
        else {
          this.count--;
          this.swipeCover();
        }
      }
    },
    swipeCover (){
      this.changeCover(this.slicedGallery[this.count], this.count);
      this.shift = null;
    },
    changeCover(shutter, idx) {
      this.cover = shutter;
      this.count = idx;
    },
    returnCover() {
      this.cover = this.slicedGallery[0];
    },

    /**
     * В компоненте есть nuxt-link, но из-за мини-галереи на него не попасть,
     * поэтому дополнительно на клик по галерее добавлен router.push().
     * Сам nuxt-link остаётся, чтобы во-первых, эту ссылку было видно в DOM,
     * во-вторых, у товаров с одной фотографией нет галереи.
     */
    goToProduct() {
      this.$router.push(this.localePath(this.galleryOptions.link));
    },
  },
};
</script>

<style lang="scss">
.product-card {
  &__gallery {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: stretch;
  }

  &__discount {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 6;

    display: flex;
    align-content: center;
    box-sizing: border-box;
    min-height: 24px;
    padding: 3px 7px;

    font-size: 13px;
    font-weight: 600;
    color: #ffffff;

    background-color: $fuchsia;
    border-radius: 4px;
  }

  &__cover {
    position: relative;
    z-index: 5;

    width: 100%;
    padding-bottom: 100%;

    line-height: 1;

    background-color: #fafafa;
    border-radius: 4px;
    overflow: hidden;

    transition: 0.5s;

    .product-card__cover-img {
      display: none;
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: contain;

      // background-image: url("/nimages/icons/common/no-img.svg");
      // background-position: center center;
      // background-repeat: no-repeat;
      // background-size: 25%;
    }

    .product-card__cover-img--selected {
      display: block;
    }
  }

  &__shutter {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;

    @media screen and (max-width: $pad) {
      display: none;
    }
  }

  &__shutter-slice {
    display: flex;
    flex-grow: 1;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: stretch;
    box-sizing: border-box;

    background-color: transparent;
    cursor: pointer;
  }

  &__paginator {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 12px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    .product-card__paginator-bullet {
      appearance: none;

      flex-shrink: 0;
      width: 12px;
      height: 12px;
      padding: 0;

      background-color: transparent;
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='3' fill='%23B8B8B8' stroke='%23fff'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 8px 8px;
      border: none;
      outline: none;
      cursor: pointer;

      &.active {
        background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='3' fill='%23007AFF' stroke='%23fff'/%3E%3C/svg%3E");
      }
    }
  }
}

.product-card__labels {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 11;
}

</style>
