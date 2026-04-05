<template>
  <client-only>
    <section class="home-benefits">
      <div class="home-benefits_title">
        <h2 class="section-title">
          <span class="section-title__header">{{$t('benefits_title')}}</span>
        </h2>
      </div>
      <div class="home-benefits_wrapper">
        <div
          v-for="item in Object.entries($t('benefits'))"
          :key="item[0]"
          class="home-benefits_item"
        >
          <div class="home-benefits_icon">
            <LazyImg
              :src="`/nimages/home/benefits/${item[0]}.svg`"
              :alt="item[1]"
            />
          </div>
          <div class="home-benefits_title">
            {{item[1]}}
          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script>
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    LazyImg
  }
}
</script>

<style lang="scss">
.home-benefits {
  padding: 50px 0;

  &_wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 -20px;

    @media screen and (max-width: 1024px) {
      overflow-x: auto;
      margin: 0;
    }

    .home-benefits_title {
      padding: 10px 20px;
    }
  }

  &_item {
    max-width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0 5px;
    text-align: center;

    &:hover {
      .home-benefits_icon {
        transform: translateY(-15px);
      }
    }

    @media screen and (max-width: $desktop-mid) {
      min-width: 270px;
      width: 270px;
    }
  }

  &_icon {
    width: 96px;
    height: 96px;
    transition: 0.3s linear;

    svg {
      display: block;
    }
  }

  &_title {
    color: $text-black;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 0;
    line-height: 1.5;
  }
}
</style>
