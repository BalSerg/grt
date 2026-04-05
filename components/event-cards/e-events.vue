<template>
  <section class="events">
    <div class="events__header">
      <SectionHeader :link="header" />
    </div>
    <client-only>
    <VueSlickCarousel v-bind="config">
      <div v-for="eventItem in events" :key="eventItem.id" class="event__item">
        <EventItem :data="eventItem" :is-event="true"/>
      </div>
    </VueSlickCarousel>
    </client-only>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import EventItem from "@/components/event-cards/event-card";
import SectionHeader from "@/components/common/section-header";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import {events} from "@/assets/js/mocks";

export default {
  components: {
    EventItem,
    SectionHeader,
    VueSlickCarousel
  },
  data () {
    return {
      events,
      config: {
        "arrows": true,
        "speed": 500,
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "infinite": true,
        "responsive": [
          {
            "breakpoint": 1024,
            "settings": {
              "slidesToShow": 2,
              "slidesToScroll": 1
            }
          },
        ]
      },
      header: {
        title: this.$t('section.header.events'),
        url: '/about',
      }
    }
  }
}
</script>

<style lang="scss">
.events {
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

    .slick-arrow {
      top: 70px;
    }

    .slick-arrow.slick-prev {
      left: 4px;
    }

    .slick-arrow.slick-next {
      right: 4px;
    }
  }
}

.events__header {
  @media (min-width: $desktop-large) {
    margin-left: 10px;
  }
}
</style>
