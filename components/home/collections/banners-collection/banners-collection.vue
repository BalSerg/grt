<template>
  <section
    v-if="
      collectionData && collectionData.banners && collectionData.banners.length
    "
    class="hulk"
    :data-count="collectionData.banners.length"
  >
    <div
      v-for="banner in collectionData.banners"
      :key="banner.id"
      class="bruce"
    >
      <old-link :to="banner.link">
        <picture>
          <source
            media="(min-width: 1024px)"
            :data-srcset="banner.images.D"
            :srcset="banner.images.D"
          />
          <source
            media="(min-width: 512px)"
            :data-srcset="banner.images.T"
            :srcset="banner.images.T"
          />
          <LazyImg :src="banner.images.M" :alt="banner.title" />
        </picture>
        <p v-if="collectionData.isTitleShowing" class="bruce__title">
          {{ banner.title }}
        </p>
      </old-link>
    </div>
  </section>
</template>

<script>
import LazyImg from '@/components/lazy-img'

export default {
  components: {
    LazyImg,
  },
  props: {
    collectionData: {
      type: Object,
      default() {
        return {
          banners: [],
        }
      },
    },
  },
}
</script>

<style lang="scss">
.hulk {
  display: grid;
  grid-gap: 20px;
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  padding: 12px 0;
  box-sizing: border-box;
  border-radius: 3px;

  @media (min-width: $pad) {
    padding: 24px 0;
  }

  @media (min-width: $desktop-mid) {
    padding: 32px 0;
  }

  img {
    display: block;
    width: 100%;

    border-radius: 3px;
  }

  &[data-count="2"] {
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 2fr);
    }
  }

  &[data-count="4"] {
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 12px;
    }
  }
}

.bruce {
  border-radius: 3px;
  overflow: hidden;

  &:hover {
    .bruce__title {
      color: $grt-blue;
      transition: color ease-in 250ms;
    }
  }
}

.bruce__title {
  padding: 4px 12px 0;

  font-size: 11px;
  font-weight: 600;
  text-align: center;
  color: $text-black;
  transition: color ease-out 250ms;

  @media (min-width: 768px) {
    padding: 12px 12px 0;
    font-size: 17px;
  }
}
</style>
