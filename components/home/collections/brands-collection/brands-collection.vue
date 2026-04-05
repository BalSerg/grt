<template>
  <section
    v-if="
      collectionData &&
      collectionData.brandList &&
      collectionData.brandList.length
    "
    class="brands"
  >
    <client-only>
      <div class="brands-heading">
        <SectionHeader :link="collectionData.heading" />
      </div>
      <div class="brands-list">
        <ul v-if="!isDesktop" class="brands-list__list">
          <li
            v-for="item in collectionData.brandList"
            :key="item.id"
            class="brands-list__list-item"
          >
            <old-link classes="brands-item" :to="item.link">
              <div class="brands-inner">
                <LazyImg
                  :src="getProperLogo(item.image)"
                  :alt="item.title"
                />
              </div>
            </old-link>
          </li>
        </ul>

        <div v-if="isDesktop">
          <VueSlickCarousel v-bind="config">
            <old-link
              v-for="item in collectionData.brandList"
              :key="item.id"
              classes="brands-item"
              :to="item.link"
            >
              <div class="brands-inner">
                <LazyImg
                  :src="getProperLogo(item.image)"
                  :alt="item.title"
                />
              </div>
            </old-link>
          </VueSlickCarousel>
        </div>
      </div>
    </client-only>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

import { mapGetters } from 'vuex';
import { CdnImageSize, DefaultImage } from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';

import SectionHeader from "@/components/common/section-header";
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    SectionHeader,
    VueSlickCarousel,
    LazyImg,
  },
  mixins: [GetProperImageMX],
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          heading: "",
          brandList: [],
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop'
    }),
  },
  data() {
    return {
      config: {
        arrows: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        infinite: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    getProperLogo(img) {
      return this.$mx_getProperImage(img, "promo-brands-item");
    },
  }
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.brands {
  padding: 12px 0;

  @media (min-width: $pad) {
    padding: 24px 0;
  }

  @media (min-width: $desktop-mid) {
    padding: 32px 0;
  }

  &-list {
    padding: 0 0 20px;
  }

  &-inner {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 5px;
    background-color: $white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    margin: 10px;
    height: 120px;

    img {
      @include move-vertical(0);
      height: 120px;
      display: block;
      width: 120px;
      object-fit: scale-down;

      @media (min-width: $desktop-mid) {
        height: 100px;
        max-width: 100%;
        width: auto;
      }
    }

    &:hover img {
      @include move-vertical(-15px);
    }
  }
}

.brands-heading .section-title {
  margin-bottom: 2px;

  @media (min-width: $desktop-mid) {
    margin-bottom: 22px;
  }
}

.brands-list__list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0 -10px;
  padding: 0;

  list-style: none;
  overflow-x: scroll;
}

.brands-list__list-item {
  flex-shrink: 0;
}
</style>
