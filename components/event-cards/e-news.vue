<template>
  <section class="news">
    <div class="news__header">
      <SectionHeader :link="header" />
    </div>
    <client-only>
      <VueSlickCarousel v-bind="config">
        <div v-for="newsItem in news" :key="newsItem.id" class="news__item">
          <NewsItem :data="newsItem" />
        </div>
      </VueSlickCarousel>
    </client-only>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import NewsItem from '@/components/event-cards/event-card';
import SectionHeader from '@/components/common/section-header';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import { news } from '@/assets/js/mocks';

export default {
  components: {
    NewsItem,
    SectionHeader,
    VueSlickCarousel
  },
  data() {
    return {
      news,
      config: {
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      },
      header: {
        title: this.$t('section.header.news'),
        url: '/about'
      }
    };
  }
};
</script>

<style lang="scss">
.news {
  margin-bottom: 32px;

  @media (min-width: $desktop-large) {
    position: relative;

    margin: 0 -10px;
    margin-bottom: 64px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      display: block;
      width: 10px;
      height: 100%;

      background-color: #ffffff;
    }

    &::after {
      left: unset;
      right: 0;
    }
  }
}

.news__header {
  @media (min-width: $desktop-large) {
    margin-left: 10px;
  }
}

.news .slick-arrow {
  @media (min-width: $desktop-large) {
    top: 80px;

    &.slick-prev {
      left: 4px;
    }

    &.slick-next {
      right: 4px;
    }
  }
}
</style>
