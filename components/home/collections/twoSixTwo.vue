<template>
  <section class="twosixtwo">
    <div class="twosixtwo_wrapper">
      <div class="twosixtwo_wrapper-item">
        <div class="twosixtwo-name">{{categoriesBlockOne.title}}</div>
        <div class="twosixtwo-grid">
          <div v-for="item in categoriesBlockOne.categories" :key="item.id" class="twosixtwo-common">
            <old-link :to="item.link">
                <div class="twosixtwo-common-item">
                  <LazyImg
                    :src="item.photo"
                    :alt="item.title"
                  />
                </div>
            </old-link>
            <div class="twosixtwo-common-title">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="twosixtwo_wrapper-item">
        <div class="twosixtwo_name">{{brandsBlock.title}}</div>
        <div class="twosixtwo-grid">
          <a v-for="brand in brandsBlock.brands" :key="brand.id" :href="brand.href">
            <LazyImg
              :src="brand.logo"
              :alt="brand.title"
            />
          </a>
        </div>
      </div>
      <div class="twosixtwo_wrapper-item">
        <div class="twosixtwo-name">{{categoriesBlockTwo.title}}</div>
        <div class="twosixtwo-grid">
          <div v-for="item in categoriesBlockTwo.categories" :key="item.id" class="twosixtwo-common" >
            <old-link :to="item.link">
              <div class="twosixtwo-common-item">
                <LazyImg
                  :src="item.photo"
                  :alt="item.title"
                />
              </div>
            </old-link>
            <div class="twosixtwo-common-title">{{item.title}}</div>
          </div>
        </div>
      </div>
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
          categoriesBlockOne: {
            title:'',
            categories: []
          },
          categoriesBlockTwo: {
            title:'',
            categories: []
          },
          brandsBlock: {
            title:'',
            brands: []
          }
        };
      },
    },
  },
  data() {
    return {
      categoriesBlockOne: {
        title:'',
        categories: []
      },
      categoriesBlockTwo: {
        title:'',
        categories: []
      },
      brandsBlock: {
        title:'',
        brands: []
      }
    };
  },
  created() {
    this.categoriesBlockOne = this.collectionData.categoriesBlockOne;
    this.categoriesBlockTwo = this.collectionData.categoriesBlockTwo;
    this.brandsBlock = this.collectionData.brandsBlock;
  },
}
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.twosixtwo {
  display: none;

  @media screen and (min-width: $desktop-mid) {
    display: block;
  }

  &_wrapper {
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 2fr));
    grid-gap: 20px;
  }

  &-name {
    @include text-level-28();
    font-weight: 600;
    margin: 0 0 17px;
    text-align: center;
  }

  &-common {
    &-item {
      @include shadow();
      border-radius: 6px;
      padding: 32px;
    }

    &-title {
      @include text-level-17();
      font-weight: 600;
      margin: 12px 0 0;
      text-align: center;
    }
  }

  &-item {
    img {
      width: 100%;
    }

    &:nth-child(2n+1) {
      .twosixtwo-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(120px, 1fr));
        grid-gap: 20px;
      }
    }

    &:nth-child(2) {
      .twosixtwo-grid {
        $width: calc((100% - 20px) / 3);
        display: grid;
        grid-template-columns: repeat(3, minmax($width, 1fr));
        grid-gap: 10px;
        padding: 0 0 52px;
      }

      a {
        background: $white;
        border: 1px solid $light-grey-ui;
        border-radius: 4px;
        display: block;
        padding: 16px 20px 14px 27px;
      }
    }
  }
}
</style>
