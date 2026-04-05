<template>
  <section
    v-if="
      collectionData && collectionData.blocks && collectionData.blocks.length
    "
    class="categories"
  >
    <div class="categories__header">
      <SectionHeader :link="collectionData.heading" />
    </div>
    <ul
      v-for="(block, index) in collectionData.blocks"
      :key="index"
      class="categories__container"
    >
      <li
        v-for="item in block.categories"
        :key="item.id"
        class="categories__item"
      >
        <old-link
          class="category-card"
          :class="`type-${item.type}`"
          :to="item.link"
        >
          <div class="category-card__image">
            <div class="category-card__image-wrap">
              <LazyImg
                class="category-card__image-img"
                :src="getProperPhoto(item.image)"
                :alt="item.title"
              />
            </div>
          </div>
          <div class="category-card__title">{{ item.title }}</div>
        </old-link>
      </li>
    </ul>
  </section>
</template>


<script>
import { CdnImageSize } from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';

import SectionHeader from "@/components/common/section-header";
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    SectionHeader,
    LazyImg,
  },
  mixins: [GetProperImageMX],
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          blocks: [],
          heading: "",
        };
      },
    },
  },
  methods: {
    getProperPhoto(img) {
      return this.$mx_getProperImage(img, "promo-categories-item");
    },
  }
};
</script>


<style lang="scss" scoped>
@import "assets/scss/_mixins";

.categories {
  padding: 12px 0;

  @media (min-width: $pad) {
    padding: 24px 0;
  }

  @media (min-width: $desktop-mid) {
    padding: 32px 0;
  }
}

.categories__container {
  display: grid;
  grid-template-columns: repeat(12, minmax(120px, 1fr));
  grid-auto-flow: column;
  align-items: start;
  gap: 12px;
  width: 100%;
  margin: -10px;
  padding: 10px;

  list-style: none;
  overflow-x: auto;

  @media (min-width: $desktop-mid) {
    grid-template-columns: repeat(6, minmax(120px, 1fr));
    grid-auto-flow: row;
    gap: 20px;
  }
}

.categories__item {
  width: 100%;
  min-width: 120px;
  max-width: 224px;

  &:hover .category-card__image-img {
    @include move-vertical(-15px);
  }
}

.category-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.category-card__image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  min-width: 120px;
  width: 100%;
  padding-bottom: 100%;

  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: -50%;
    z-index: 1;

    width: 162%;
    height: 190%;

    border-radius: 50%;
    background-color: #ffffff;

    transition: all linear 170ms;
  }
}

.type-1 .category-card__image::after {
  background-color: $fuchsia;
}

.type-2 .category-card__image::after {
  background-color: #1ad6ba;
}

.type-3 .category-card__image::after {
  background-color: $grt-blue;
}

.category-card__image-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.category-card__image-img {
  @include move-vertical(0);
  flex-shrink: 0;
  display: block;
  width: 90%;
  height: 90%;

  object-fit: contain;

  @media (min-width: $desktop-mid) {
    width: 70%;
    height: 70%;
  }
}

.category-card__title {
  padding: 12px 12px 6px;

  font-size: 11px;
  font-weight: 600;
  text-align: center;
  color: #131313;
  transition: color ease-out 250ms;

  @media (min-width: 768px) {
    font-size: 17px;
  }
}
</style>
