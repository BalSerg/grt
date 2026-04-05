<template>
  <section class="col3cat6">
    <div v-for="block in blocks" :key="block.id" class="col3cat6__item">
      <nuxt-link  class="col3cat6-title" :to="block.link">
          {{block.title}}
          <span>{{$t("section.header.watch")}}</span>
      </nuxt-link>
      <div class="col3cat6__item-wrapper">
        <div v-for="category in block.categories" :key="category.id" class="col3cat6-content">
          <nuxt-link :to="category.link">
            <LazyImg
              :src="getProperPhoto(category.image)"
              :alt="category.alt"
            />
          </nuxt-link>
          <div class="col3cat6-content__name">
            <nuxt-link :to="category.link">
              {{category.title}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { CdnImageSize } from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';

import LazyImg from '@/components/lazy-img';

export default {
  components: {
    LazyImg,
  },
  mixins: [GetProperImageMX],
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          blocks: []
        };
      },
    },
  },
  data() {
    return {
      blocks: []
    };
  },
  created() {
    this.blocks = this.collectionData.blocks;
  },
  methods: {
    getProperPhoto(img) {
      return this.$mx_getProperImage(img, "promo-categories-item");
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_mixins";

.col3cat6 {
  @media screen and (min-width: $desktop-mid) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin: 64px 0 0;
  }

  @media screen and (max-width: $desktop-mid) {
    margin: 40px 0 0;
  }

  @media screen and (max-width: $pad) {
    margin: 20px 0 0;
  }

  &__item {
    @media screen and (max-width: $desktop-mid) {
      & + div {
        margin: 40px 0 0;
      }
    }

    @media screen and (max-width: $pad) {
      & + div {
        margin: 25px 0 0;
      }
    }
  }

  &-title {
    @include text-level-28();
    justify-content: center;
    color: $text-black;
    cursor: pointer;
    display: flex;
    transition: color ease-in 250ms;

    &:hover {
      color: $grt-blue;
      transition: color ease-out 250ms;
    }

    @media screen and (max-width: $desktop-mid) {
      margin: 0 0 17px;
      justify-content: space-between;
      text-align: center;
    }

    @media screen and (max-width: $pad) {
      margin: 0 0 13px;
    }

    @media screen and (min-width: $desktop-mid) {
      text-align: center;
      margin: 0 0 24px;

      span {
        display: none;
      }
    }
  }

  &__item-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18px;
  }

  &-content {
    img {
      border-radius: 4px;
      display: block;
      width: 100%;
    }

    .col3cat6-content__name {
      @include text-level-17();
      font-weight: 600;
      margin: 10px 0 0;
      text-align: center;

      a {
        color: $text-black;
      }

      @media screen and (max-width: $mobile) {
        margin: 4px 0 0;
      }
    }
  }
}
</style>
