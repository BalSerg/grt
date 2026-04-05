<template>
  <div class="catalog-product">

    <ProductCardGallery
      class="catalog-product__gallery"
      :gallery-options="galleryOptions"
    />

    <h2 class="catalog-product__title" :data-title="product.productName">
      <nuxt-link :to="localePath(productLink)">
        {{ product.productName }}
      </nuxt-link>
    </h2>

    <dl class="catalog-product__vendor-code">
      <dt>{{ $t('vendor_code') }}</dt>
      <dd>{{ product.id }}</dd>
    </dl>

    <Price
      :retail-price="product.price"
      :price-with-discount="product.retailPriceWithDiscount"
      :currency="product.currency"
    />

    <div class="catalog-product__controls">
      <product-buttons
        :inCatalog="true"
        :isDiscontinued="isDiscontinued"
        :isTemporarilyOutOfStock="isTemporarilyOutOfStock"
        :max="product.available || Number.MAX_SAFE_INTEGER"
        :product="product"
      />
      <favorites-button :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(product.id)"
                        class="product-card__favorite-btn"
                        @toggle="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import { PublishModes } from '@/assets/js/const'
import {mapActions, mapGetters} from 'vuex'
import ProductCardGallery from '@/components/common/product/product-card-gallery';
import FavoritesButton from '@/components/favorites-button';
import Price from '@/components/product-card-price';
import productButtons from "~/components/common/product-buttons";

import {BasePath, Currency} from '@/assets/js/const';

export default {
  components: {
    ProductCardGallery,
    FavoritesButton,
    Price,
    productButtons,
  },
  props: {
    product: Object
  },
  computed: {
    ...mapGetters({
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR',
    }),
    isTemporarilyOutOfStock() {
      return String(this.product.publishMode) === PublishModes.TEMPORARILY_OUT_OF_STOCK
    },
    isDiscontinued() {
      const publishMode = String(this.product.publishMode);
      return publishMode === PublishModes.DISCONTINUED || publishMode === PublishModes.NOT_PUBLISHED;
    },
    productLink() {
      return `${BasePath.PRODUCTS}/${this.product.semanticId}/`;
    },
    productCurrency() {
      return this.product.currency === 'RUB' ?
        Currency[this.product.currency] :
        this.product.currency;
    },
    localizedPrice() {
      return this.product.price.toLocaleString(this.$i18n.locale);
    },
    productPrice() {
      return this.product.price > 0
        ? this.product.price.toLocaleString()
        : this.$t('price_demand');
    },
    discountPercent() {
      return Math.floor(
        ((parseInt(this.product.price, 10) -
            parseInt(this.product.retailPriceWithDiscount, 10)) /
          parseInt(this.product.price, 10)) *
        100
      );
    },
    productFavorites() {
      return {
        isFavorite: this.product.isFavorite,
        id: this.product.id
      };
    },
    isAvailableThroughCart() {
      return this.product.canSellThroughCart;
    },
    galleryOptions() {
      return {
        gallery: this.product.photo,
        alt: this.product.productName,
        link: this.productLink,
        discount: this.discountPercent,
        supplier: {
          countryId: this.product.supplierCountryId,
          countryName: this.product.supplierCountryName
        },
        labels: this.product.labels
      }
    }
  },
  methods: {
    ...mapActions({
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT'
    }),
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.id})
    },
  },
};
</script>

<style lang="scss">
.catalog-product {
  --vendor-color: #717171;
  --title-color: #282828;

  border-radius: 6px;
  background-color: #ffffff;
  padding: 0;
  position: relative;
  transition: 0.3s;
  z-index: 0;

  @media (min-width: $desktop-mid) {
    padding: 18px;

    &:hover {
      --vendor-color: #282828;
      --title-color: #007aff;

      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 1;

      .product-card-labels .folk-icon {
        filter: none;
      }
    }
  }
}

.catalog-product__gallery {
  padding-bottom: 5px;
}

.catalog-product__title {
  position: relative;
  z-index: 20;

  height: 29px;
  padding: 3px 0;

  font-size: 12px;
  line-height: 1.4;
  /* stylelint-disable  */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* stylelint-enable  */

  overflow: hidden;

  a {
    color: var(--title-color);

    transition: all 0.3s ease;
  }

  &::before {
    content: attr(data-title);

    position: absolute;
    bottom: calc(100% + 44px);
    left: 0;
    right: 0;
    z-index: 10;

    display: block;
    padding: 10px;

    color: #ffffff;
    text-shadow: 0 0 2px #000000;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    opacity: 0;
    visibility: hidden;

    transition: all linear 200ms;
  }

  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (min-width: $pad) {
    height: 33px;

    font-size: 13px;
  }
}


.catalog-product__controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;

  .buy-button {
    margin: 0 10px 0 0;
  }

  @media (min-width: $pad) {
    padding-top: 12px;
  }
}

.catalog-product__favorite-btn {
  margin-left: 8px;

  @media (min-width: $pad) {
    margin-left: 24px;
  }
}

.catalog-product__vendor-code {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin: 0;
  padding: 5px 0;

  font-size: 12px;
  line-height: 1.4;
  color: var(--vendor-color);

  transition: color 0.3s ease;

  dt {
    margin-right: 8px;
  }

  dd {
    margin-left: 0;
  }

  @media (min-width: $pad) {
    padding: 5px 0 12px;

    font-size: 14px;
  }
}

.product-card__favorite-btn {
  margin-left: auto;
}
</style>
