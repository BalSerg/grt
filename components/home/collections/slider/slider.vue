<template>
  <section
    v-if="
      collectionData && collectionData.banners && collectionData.banners.length
    "
    class="carousel"
  >
    <client-only>
      <VueSlickCarousel v-bind="config">
        <div
          v-for="banner in collectionData.banners"
          :key="banner.id"
          class="carousel-item"
        >
          <old-link :to="banner.link">
            <picture>
              <source
                media="(min-width: 1024px)"
                :srcset="banner.images.D"
              >
              <source
                media="(min-width: 500px)"
                :srcset="banner.images.T"
              >
              <img
                :src="banner.images.M"
                :alt="banner.title"
              >
            </picture>
          </old-link>
        </div>
      </VueSlickCarousel>
    </client-only>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  components: {
    VueSlickCarousel,
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
      index: 1,
      loaded: false,
      config: {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 8,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
      },
    };
  },
  mounted() {
    this.loaded = !this.loaded;
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  padding: 32px 0 0;
  position: relative;

  @media screen and (max-width: 1024px) {
    padding: 8px 0 20px;
  }
}

.carousel-item {
  position: relative;
  min-width: 290px;
  max-width: 1440px;
  border-radius: 4px;
  overflow: hidden;

  a {
    display: block;
    width: 100%;
    line-height: 1;
  }

  img {
    display: block;
    width: 100%;
  }
}
</style>
