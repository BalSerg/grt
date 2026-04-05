<template>
  <section class="blockbrands">
    <client-only>
      <VueSlickCarousel v-if="isDesktop" v-bind="config">
        <old-link v-for="block in blocks" :key="block.id" :to="block.link">
          <div class="blockbrands__item">
            <div class="blockbrands__item-title">{{block.title}}</div>
            <div class="blockbrands__item-wrapper">
              <img v-for="brand in block.brands" :key="brand.id" :src="brand.image" :alt="brand.alt"/>
            </div>
            <div class="blockbrands__item-quantity">
              {{block.productsQuantity}}
              <span>{{$t("of_goods")}}</span>
            </div>
          </div>
        </old-link>
      </VueSlickCarousel>
    </client-only>

    <div v-if="!isDesktop" class="blockbrands-no-desktop">
      <old-link v-for="block in blocks" :key="block.id" :to="block.link" class="blockbrands__item">
        <div class="blockbrands__item-title">{{block.title}}</div>
        <div class="blockbrands__item-wrapper">
          <img v-for="brand in block.brands" :key="brand.id" :src="brand.image" :alt="brand.alt"/>
        </div>
        <div class="blockbrands__item-quantity">
          {{block.productsQuantity}}
          <span>{{$t("of_goods")}}</span>
        </div>
      </old-link>
    </div>
  </section>
</template>

<script>
import OldLink from "@/components/old-link";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { mapGetters } from 'vuex';

export default {
  components: {
    OldLink,
    VueSlickCarousel
  },
  props: {
    collectionData: {
      type: Object,
      default () {
        return {
          blocks: [],
        }
      }
    }
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
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        responsive: [
          {
            breakpoint: 1041,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      },
      blocks: []
    }
  },
  created() {
    this.blocks = this.collectionData.blocks;
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_mixins";

.blockbrands {
  margin: 32px 0 0;

  img {
    display: block;
    max-width: 148px;
    width: 100%;
  }

  &__item {
    border: 1px solid $light-grey-ui;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    margin: 0 10px 3px;
    padding: 20px;
    transition: all ease-out 250ms;

    &:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: all ease-in 250ms;
    }

    &-title {
      @include text-level-17();
      font-weight: 600;
      margin: 0 0 4px;
      text-align: center;
    }

    &-wrapper {
      align-items: center;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 8px;
    }

    &-quantity {
      @include text-level-15();
      color: $text-grey;
      font-weight: 600;
      text-align: center;
      text-transform: lowercase;
    }
  }

  .blockbrands-no-desktop {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;

    .blockbrands__item-wrapper {
      grid-template-columns: repeat(2, max(148px));
    }

    .blockbrands__item-title {
      margin: 0 20px 3px 0;
    }
  }
}

</style>
