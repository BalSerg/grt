<template>
  <section class="col2Banner3">
    <div class="col2Banner3-big">
      <old-link :to="banner.link">
        <picture>
          <source
            media="(min-width: 1025px)"
            :data-srcset="banner.images.D"
            :srcset="banner.images.D"
          >
          <source
            media="(min-width: 320px)"
            :data-srcset="banner.images.T"
            :srcset="banner.images.T"
          >
          <LazyImg
            :alt="banner.alt"
            :src="banner.images.M"
          />
        </picture>
      </old-link>
    </div>
    <div class="col2Banner3-small">
      <old-link v-for="item in small" :key="item.id" :to="item.link || '#'">
        <picture>
          <source
            media="(min-width: 1024px)"
            :data-srcset="item.images.D"
            :srcset="item.images.D"
          >
          <source
            media="(min-width: 320px)"
            :srcset="item.images.T"
            :data-srcset="item.images.T"
          >
          <LazyImg
            :alt="item.alt"
            :src="item.images.M"
          />
        </picture>
      </old-link>
    </div>
  </section>
</template>

<script>
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    LazyImg
  },
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          banners: [],
        };
      },
    },
  },
  data() {
    return {
      banner: {},
      small: [],
    };
  },
  created() {
    [this.banner, ...this.small] = this.collectionData.banners;
  },
};
</script>

<style lang="scss">
.col2Banner3 {
  display: flex;
  margin: 0 0 24px;

  @media screen and (min-width: $desktop-mid) {
    margin: 0 0 64px;
  }

  @media screen and (min-width: $pad) {
    margin: 0 0 50px;
  }

  img {
    display: block;
    height: 100%;
    width: 100%;
  }

  &-big {
    border-radius: 3px;
    overflow: hidden;
    margin: 0 20px 0 0;
  }

  &-small {
    > a {
      border-radius: 3px;
      display: block;
      overflow: hidden;

      &:last-child {
        margin: 24px 0 0;
      }
    }
  }

  @media screen and (max-width: $desktop-mid) {
    display: block;

    &-big {
      margin: 0 0 24px;
    }

    &-small {
      > a:last-child {
        margin: 24px 0 0;
      }
    }
  }

  @media screen and (max-width: $pad) {
    &-big {
      margin: 0 0 16px;
    }

    &-small {
      > a:last-child {
        margin: 16px 0 0;
      }
    }
  }
}
</style>
