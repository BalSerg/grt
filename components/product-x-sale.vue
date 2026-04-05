<template>
  <section class="page-main__product-x-sale product-x-sale">

    <h3 class="product-x-sale__title">
      <slot>{{ $t('similar_products') }}</slot>
      <!-- TODO: Использовать, когда будет известно куда вести по этой ссылке -->
      <!-- <nuxt-link
        class="product-x-sale__title-link"
        to="#"
      >{{ $t('section.header.watch') }}</nuxt-link> -->
    </h3>

    <div class="product-x-sale__products">
      <ProductMiniCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :class="'product-x-sale__product'"
      />
    </div>

  </section>
</template>

<script>
import ProductMiniCard from '@/components/catalog/catalog-product';

export default {
  components: {
    ProductMiniCard,
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss">
.page-main__product-x-sale {
  margin-left: 15px;

  @media (min-width: $pad) {
    margin-left: 30px;
  }
}

.product-x-sale {
  padding: 18px 0;

  @media (min-width: $desktop-mid) {
    margin: 0 auto;
  }
}

.product-x-sale__title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin-right: 15px;
  padding-bottom: 24px;

  font-size: 15px;
  line-height: 1.3;
  color: $text-black;
  font-weight: 600;

  @media (min-width: $pad) {
    margin-right: 30px;

    font-size: 22px;
    line-height: 1.4;
  }

  @media (min-width: $desktop-mid) {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 30px;
  }
}

.product-x-sale__title-link {
  display: inline-flex;
  margin-left: auto;

  font-size: 13px;
  line-height: 1.6;

  @media (min-width: $pad) {
    position: relative;

    font-size: 15px;
    line-height: 24px;

    &::after {
      content: "";

      position: relative;

      width: 16px;
      height: 24px;
      margin-left: 10px;

      background-image: url("/nimages/icons/arrow-right-24px.svg");
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.product-x-sale__products {
  display: flex;
  column-gap: 15px;

  overflow-x: auto;

  @media (max-width: $pad - 1) {
    &::after {
      width: 30px;
    }
  }

  @media (max-width: $desktop-mid - 1) {
    &::after {
      content: "";

      position: relative;

      flex-shrink: 0;
      width: 15px;
      margin-left: -15px;

      background-color: transparent;
    }
  }

  @media (min-width: $desktop-mid) {
    box-sizing: border-box;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 12px;
    column-gap: 0;

    overflow: visible;
  }
}

.product-x-sale__product {
  width: 210px;
  flex-shrink: 0;

  @media (min-width: $desktop-mid) {
    width: 200px;

    &:nth-child(n+5) {
      display: none;
    }
  }

  @media (min-width: 1366px) {
    &:nth-child(n+5) {
      display: block;
    }

    &:last-child {
      display: none;
    }
  }

  @media (min-width: $desktop-large) {
    &:last-child {
      display: block;
    }
  }
}
</style>
