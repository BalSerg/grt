<template>
  <section class="block-collection">
    <SectionHeader :link="collectionData.link" />
    <client-only>
      <VueSlickCarousel v-bind="config">
        <div
          v-for="collection in block.collections"
          :key="collection.id"
          class="block-collection__item"
        >
          <picture>
            <source
              media="(min-width: 1024px)"
              :data-srcset="collection.images.D"
              :srcset="collection.images.D"
            >
            <source
              media="(min-width: 320px)"
              :data-srcset="collection.images.T"
              :srcset="collection.images.T"
            >
            <LazyImg
              :src="collection.images.M"
              :alt="collection.alt"
            />
          </picture>
          <div v-if="isDesktop">
            <div v-for="dot in collection.dots" :key="dot.id">
              <div
                class="block-collection__item-dot"
                :style="{ left: dot.left, top: dot.top }"
                @click="openModalPopup(dot)"
              >
                <span></span>
              </div>
            </div>
            <div class="block-collection__item-description">
              <div class="block-collection__item-description-title">
                {{ collection.descriptionTitle }}
              </div>
              <div class="block-collection__item-description-text">
                {{ collection.descriptionText }}
              </div>
              <button class="grt-btn grt-btn--filled" type="button">
                {{ collection.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </client-only>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { ModalBus } from '@/event-bus/modal-bus';
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import SectionHeader from "@/components/common/section-header";
import ProductCard from "@/components/common/product/product-card";
import LazyImg from '@/components/lazy-img';
import { mapGetters } from 'vuex';

export default {
  components: {
    VueSlickCarousel,
    SectionHeader,
    ProductCard,
    LazyImg
  },
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          block: {},
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop'
    })
  },
  data() {
    return {
      config: {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
      block: {},
    };
  },
  created() {
    this.block = this.collectionData.block;
  },
  methods: {
    openModalPopup(dot) {
      ModalBus.$emit('open', {
        component: ProductCard,
        props: { product: dot.good },
        classes: 'block-collection-modal',
      });
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.block-collection {
  margin: 64px 0 0;

  &__item {
    position: relative;

    > img {
      border-radius: 4px;
    }

    //размеры блока &-dot
    $width: 32px;
    $height: 32px;

    &-dot {
      position: absolute;
      left: 300px;
      top: 400px;

      display: flex;
      align-items: center;
      justify-content: center;
      height: $width;
      width: $width;

      cursor: pointer;

      &::before {
        position: absolute;
        left: 0;
        top: 0;

        display: block;
        box-sizing: border-box;
        height: $width;
        width: $width;

        content: "";
        border: 2px solid $fuchsia;
        border-radius: 50%;

        transform: scale(1);
      }

      > span {
        position: relative;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;

        display: block;
        height: 24px;
        width: 24px;

        background: $fuchsia;
        border-radius: 50%;

        transition: background ease-out 250ms;

        &::after,
        &::before {
          position: absolute;
          bottom: 0;
          top: 0;
          left: 0;
          right: 0;

          display: block;
          margin: auto;
          height: 2px;
          width: 10px;

          background: $white;

          content: "";
          transition: background ease-out 250ms;
        }

        &::after {
          height: 10px;
          width: 2px;
        }
      }

      &:hover {
        &::before {
          animation: wave 500ms ease-in-out;
        }

        > span {
          background: $white;
          transition: background ease-in 250ms;

          &::before,
          &::after {
            background: $fuchsia;
            transition: background ease-in 250ms;
          }
        }
      }

      @keyframes wave {
        0% {
          transform: scale(1);
        }

        25% {
          transform: scale(0.5);
        }

        50% {
          transform: scale(1);
        }

        75% {
          transform: scale(1.2);
        }

        100% {
          transform: scale(1);
        }
      }
    }

    &-description {
      position: absolute;
      left: 60px;
      top: 35px;

      box-sizing: border-box;
      padding: 20px 30px 35px;
      width: 302px;

      color: $text-black;

      background: rgba(255, 255, 255, 0.7);
      border-radius: 4px;

      &-title {
        @include text-level-17();

        margin: 0 0 17px;

        font-weight: 600;
      }

      &-text {
        @include text-level-13();

        margin: 0 0 10px;
      }
    }
  }
}

.block-collection-modal {
  .modal__dialog {
    position: absolute;
    z-index: inherit;

    height: 386px;
    width: 248px;
    margin: auto;
    min-width: auto;

    overflow: visible;
  }

  .modal__close-btn {
    position: absolute;
    right: -32px;
    top: - 28px;

    display: block;
    height: 32px;
    width: 32px;
    padding: 0;

    border-radius: 50%;
    cursor: pointer;
    background: $white;

    &::after,
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      content: "";

      display: block;
      height: 2px;
      width: 16px;
      margin: auto;

      background-color: $text-black;
    }

    &::after {
      transform: rotate(-45deg);
    }

    &::before {
      transform: rotate(45deg);
    }
  }

  .modal__body {
    height: 100%;
    width: 100%;
    z-index: 1100;

    box-shadow: none;
    border-radius: 6px;
  }

  .modal__overlay {
    background-color: $white;
    opacity: 0.01;
    z-index: 1000;
  }

  .product-card {
    &:hover .product-card__body,
    .product-card__body {
      position: static;
      z-index: 800;
      width: 100%;
      padding: 0;
      box-shadow: none;
    }

    &:hover .product-card__controls,
    .product-card__controls {
      align-items: center;
      justify-content: space-between;
      display: flex;
      margin-top: 24px;
    }
  }
}
</style>
