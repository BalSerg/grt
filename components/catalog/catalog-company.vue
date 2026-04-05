<template>
  <div class="catalog-company__card">
    <div class="catalog-company__logo">
      <nuxt-link :to="localePath(`/suppliers/${product.semanticId}`)">
        <LazyImg
          :src="getProperLogo(product.photo[0])"
          :alt="product.name"
        />
      </nuxt-link>
      <div class="catalog-company__labels">
        <div class="catalog-company__label">
          <img
            :src="`/nimages/country-flags-svg/svg/${product.countryId}.svg`"
            :alt="product.countryName"
          />
        </div>
      </div>
    </div>
    <h2 class="catalog-company__title">
      <nuxt-link :to="localePath(`/suppliers/${product.semanticId}`)">
        {{ product.title }}
      </nuxt-link>
    </h2>
  </div>
</template>

<script>
import { DetectHost } from '@/assets/js/util';
import { CdnImageSize, DefaultImage } from '@/assets/js/const';
import GetProperImageMX from '@/mixins/get-proper-image-mx';

import LazyImg from '@/components/lazy-img';

export default {
  name: "CatalogCompany",
  components: {
    LazyImg
  },
  mixins: [GetProperImageMX],
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    getProperLogo(img) {
      return this.$mx_getProperImage(img, "minisc-main");
    },
  }
}
</script>

<style lang="scss">
.catalog-company {
  &__card {
    padding: 12px;
    padding-bottom: 20px;
    background-color: #ffffff;
    border-radius: 4px;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 12px rgba(14, 33, 25, 0);

    &:hover {
      z-index: 2;
      box-shadow: 0 5px 5px rgba(14, 33, 25, 0.2);

      & > .catalog-company__title {
        a {
          color: $grt-blue;
        }
      }
    }
  }

  &__logo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: stretch;
    position: relative;

    &::after {
      display: block;
      content: "";
      width: 100%;
      padding-top: 100%;
    }

    a {
      display: block;
      line-height: 1;
      width: 100%;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: contain;
      z-index: 1;
    }

    &.no-logo {
      img {
        filter: grayscale(1);
      }
    }
  }

  &__labels {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 11;
  }

  &__label {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 3px;
    margin-bottom: 8px;
    background-color: #ffffff;
    border-radius: 4px;
  }

  &__title {
    font-size: 13px;
    line-height: 1.4;
    padding: 3px 0;
    position: relative;
    z-index: 20;
    height: 32px;
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* stylelint-enable */
    overflow: hidden;

    a {
      color: $text-black;
      transition: 300ms;
    }
  }
}
</style>
