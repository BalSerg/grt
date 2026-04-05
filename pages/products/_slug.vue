<template>
  <main class="page-main">

    <ProductBreadcrumbs
      v-if="navInfo.categories.length > 0"
      :nav-info="navInfo"
    />

    <div class="product-page">

      <ProductGallery
        v-if="hasPhotos"
        :product-gallery="productGallery"
        class="product-page__gallery"
      />
      <ProductGallerySkeleton
        v-else
        class="product-page__gallery"
      />

      <div :class="{'product-page__options-temporarilyOutOfStock': isNotPublish}"
           class="product-page__options product-options">

        <div v-if="hasTags" class="product-options__tags">
          <ProductTag
            v-for="tag in product.tags"
            :key="tag.semanticId"
            :color="tag.color"
            :text="tag.name"
            class="product-options__tag-item"
          />
        </div>

        <ProductName
          :product-name="product.productName"
          class="product-page__name"
        />

        <div v-if="product.id" class="product-options__product-info">
          <div class="product-option">
            <p class="product-option__name">
              {{ $t('vendor_code') }}<span class="product-option__value"> {{ product.id }}</span>
            </p>
          </div>

          <RatingStars
            :common-rating="product.rating"
            class="product-option"
          />

          <div class="product-option">
            <p class="product-option__name product-option__name--underlined">
              {{ reviewCount }} {{ $t('reviews') }}
            </p>
          </div>
        </div>
        <ProductOptionsPrice
          v-if="!$fetchState.pending"
          :discontinued="isDiscontinued"
          :display="isNotPublish"
          :price="price"
          :temporarily-out-of-stock="isTemporarilyOutOfStock"
        />

        <div v-if="product.id" class="product-options__buy-wrapper combination_button">
          <product-buttons
            :in-catalog="false"
            :is-discontinued="isDiscontinued"
            :is-temporarily-out-of-stock="isTemporarilyOutOfStock"
            :max="maxCountLimit"
            :product="product"
          />
          <favorites-button :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(product.id)"
                            class="product-card__favorite-btn"
                            @toggle="toggleFavorite"
          />
        </div>
        <div class="product-warnings">
          <!-- <productWarning
            v-if="product.canSellThroughCart && $i18n.locale === 'ru'"
            :warning-data="canSellThroughCartMock"
          /> -->
          <product-warning
            v-if="product.minAmountForOrder && product.minAmountForOrder > product.price"
            :warning-data="{
                text: `${$tc('product.min_amount')} ${product.minAmountForOrder} ${normalizedCurrency}`,
                type: 'info',
                link: product.supplierSemanticId
              }"
          />
        </div>

        <ul v-if="product.conditionsForCompanies" class="product-purchase-terms">
          <li>
            <ProductPurchaseTermsItem
              v-if="product.conditionsForCompanies"
              :conditions-for-companies="product.conditionsForCompanies"
            />
          </li>
        </ul>

        <ProductSellerInfo
          v-if="product.supplierName"
          :product="product"
          class="product-options__seller-info"
        />

        <div v-if="isNotPublish" class="product-not-available">{{ $t('product-not-available') }}</div>

      </div>

      <div class="product-page__description">
        <ProductDescription
          v-if="sanitizedDescription"
          :sanitized-description="sanitizedDescription"
        />

        <ProductProperties
          v-if="hasProperties"
          :product="product"
        />
      </div>

      <Complain
        :product-id="product.id"
      />

    </div>

    <ProductXSale
      v-if="crossSaleProducts"
      :products="crossSaleProducts"
      :title="'Похожие товары'"
    />

  </main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {BasePath, Currency, PublishModes, GONE_CODE} from '@/assets/js/const'
import {GET_AVAILABILITY} from '@/assets/js/const.schema.org'
import {handleFetchError, sanitize} from '@/assets/js/util'

import ProductGallery from '@/components/product-gallery'
import ProductOptionsPrice from '@/components/product-options-price'
import ProductBreadcrumbs from '@/components/product-breadcrumbs'
import ProductSellerInfo from '@/components/product-seller-info'
import RatingStars from '@/components/rating-stars'
import ProductName from '@/components/product-name'
import ProductXSale from '@/components/product-x-sale'
import Complain from '@/components/common/complain'
import ProductButtons from "~/components/common/product-buttons";

/**
 * Place your lazy components here for better performance
 */
const ProductGallerySkeleton = () => import('@/components/product-gallery-skeleton');
const ProductTag = () => import('@/components/product-tag');
const ProductPurchaseTermsItem = () => import('@/components/product-purchase-terms-item');
const ProductDescription = () => import('@/components/product-description');
const ProductProperties = () => import('@/components/product-properties');

export default {
  name: 'ProductsItem',
  components: {
    Complain,
    ProductGallery,
    ProductOptionsPrice,
    ProductButtons,
    ProductBreadcrumbs,
    ProductSellerInfo,
    ProductDescription,
    ProductProperties,
    RatingStars,
    ProductTag,
    ProductPurchaseTermsItem,
    ProductName,
    ProductGallerySkeleton,
    ProductXSale,
    productWarning: () => import('@/components/common/product/product-warning'),
  },
  middleware: [
    'checkSlug',
    'getMetaInfo'
  ],
  props: {
    publishMode: {
      type: String,
      default() {
        return PublishModes.AVAILABLE;
      }
    },
    display: {
      type: Boolean,
      default: false,
    },
    discontinued: {
      type: Boolean,
      default: false,
    },
    temporarilyOutOfStock: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    product: {
      id: null,
      price: 0,
      priceWithDiscount: 0,
      retailPriceCurrency: '',
      publishMode: '',
      media: [],
      currency: '',
    },
    canSellThroughCartMock: {
      type: 'express',
      text: 'Экспресс-доставка действует по Москве и Московской области при заказе от 1500 ₽'
    },
    available: 0,
    minPermittedAmount: 1,      // it is dummy yet
    sanitizedDescription: '',
    navInfo: {
      title: '',
      categories: []
    },
    crossSaleProducts: [],
  }),
  async fetch() {
    await this.$axios.$get(`/napi/catalog-search/products/${this.$route.params.slug}`)
      .then(({result}) => {
        this.navInfo = Object.assign({}, {categories: []}, result.navigation);

        if (result.productDescription) {
          this.sanitizedDescription = sanitize(result.productDescription);
          delete result.productDescription;
        }

        this.product = result;
        this.available = result.available
        this.crossSaleProducts = this.product.crossSaleProducts

        this.product.labels
          .forEach(x => {
            let link = `${this.basePath}${this.productCategorySemanticId}/?filters=${x.id}`;

            if (!this.productCategorySemanticId) {
              link = `${this.baseProductsPath}?filters=${x.id}`;
            }
            x.link = link;
          })

        if (process.server && this.isNotPublish) {
          this.$nuxt.context.res.statusCode = GONE_CODE
        }
        return result
      })
      .catch(err => handleFetchError(this.$nuxt, err))
  },
  head() {
    const meta = this.metaData.get(encodeURIComponent(this.$route.fullPath));

    if (!meta)
      return
    return {...this.layoutMetaTags, ...meta};
  },
  computed: {
    ...mapGetters({
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR',
      metaData: 'meta/metaData',
      user: 'userData/user',
      cart: 'userData/cart',
      layoutMetaTags: 'meta/layoutMetaTags'
    }),
    normalizedCurrency() {
      return Currency[this.product.currency];
    },
    price() {
      return {
        retailPrice: this.product.price,
        priceWithDiscount: this.product.priceWithDiscount,
        currency: this.product.currency,
        originalCurrency: this.product.originalCurrency
      }
    },
    reviewCount() {
      return this.product.reviewCount || 0;
    },
    hasTags() {
      return this.product.tags && this.product.tags.length > 0;
    },
    hasPhotos() {
      return this.product.media && this.product.media.length > 0;
    },
    hasProperties() {
      return this.product.modificationProperties && this.product.modificationProperties.length > 0;
    },
    productCategorySemanticId() {
      const navCategories = this.product.navigation?.categories || [];

      return navCategories.length > 0 ? navCategories[navCategories.length - 1].semanticId : '';
    },
    basePath() {
      return this.localePath(`${BasePath.CATALOG}`);
    },
    baseProductsPath() {
      return this.localePath(`${BasePath.CATALOG}${BasePath.PRODUCTS}`);
    },
    isUserHasNoFavorites() {
      return !this.user || !this.user.likes || this.user.likes.size === 0;
    },
    productGallery() {
      return {
        productName: this.product.productName,
        labels: this.product.labels,
        media: this.product.media,
      }
    },
    isTemporarilyOutOfStock() {
      return String(this.product.publishMode) === PublishModes.TEMPORARILY_OUT_OF_STOCK
    },
    isDiscontinued() {
      const publishMode = String(this.product.publishMode);
      return publishMode === PublishModes.DISCONTINUED || publishMode === PublishModes.NOT_PUBLISHED;
    },
    isNotPublish() {
      return this.isTemporarilyOutOfStock || this.isDiscontinued
    },
    maxCountLimit() {
      return this.available || Number.MAX_SAFE_INTEGER
    },
  },
  methods: {
    ...mapActions({
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT'
    }),
    toggleFavorite(isSelected) {
      this.HANDLING_of_FAVORITE_PRODUCT({operationType: isSelected ? '$delete' : '$post', id: this.product.id})
    },
  },
  jsonld() {
    const name = this.product.productName
    const description = this.sanitizedDescription
    const url = `${process.env.API_URL}${this.$route.path}`
    const image = this.product.media.filter((m) => m.type === 'photo')[0]?.link
    const availability = GET_AVAILABILITY(this.product.publishMode)
    const price = this.product.price
    const priceCurrency = this.product.currency
    if (!name || !availability || !price) {
      return null
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description,
      url,
      image,
      offers: {
        '@type': 'Offer',
        availability,
        price,
        priceCurrency,
      },
    }
  },
}
</script>

<style lang="scss">
.product-page__options-temporarilyOutOfStock {
  .product-options__buy-wrapper {
    opacity: 0.7;
  }
}

.product-page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 30px;

  @media screen and (min-width: $pad) {
    --col-gap: 20px;

    position: relative;

    display: grid;
    grid-template-columns: 1.8fr 1.2fr;
    column-gap: var(--col-gap);
    grid-template-areas:
      "gallery sidebar"
      "description sidebar";
    padding: 0 30px;
  }

  @media screen and (min-width: $desktop-mid) {
    --col-gap: 24px;

    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 30px;
  }
}


.product-page__options {
  grid-area: sidebar;

  box-sizing: border-box;
  margin: 0 15px;

  background-color: #ffffff;

  /* stylelint-disable */
  @media (min-width: $pad) {
    position: -webkit-sticky;
    position: sticky;
    top: 32px;

    align-self: flex-start;
    margin: 0;
  }
  /* stylelint-enable */
}

.product-page__gallery {
  grid-area: gallery;
}

.product-page__description {
  grid-area: description;

  display: grid;
  row-gap: 32px;
  box-sizing: border-box;
  margin: 0 15px;
  padding-bottom: 32px;

  @media (min-width: $pad) {
    margin: 0;
  }

  @media (min-width: $desktop-large) {
    row-gap: 40px;
  }
}

.product-options {
  font-size: 13px;
  line-height: 140%;
  color: $text-grey-2;
}

.product-options__tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: -5px;
  margin-left: -8px;
  padding: 5px 0;

  @media (min-width: $pad) {
    padding-top: 0;
    padding-bottom: 10px;
  }
}

.product-options__tag-item {
  margin-left: 8px;
  margin-top: 5px;
}

.product-page__name {
  padding: 5px 0;

  @media (min-width: $pad) {
    padding-top: 0;
  }
}

.product-option {
  display: inline-flex;
  padding: 5px 0;
}

.product-option__name {
  cursor: default;
}

.product-option__name--underlined {
  border-bottom: 1px dashed $text-grey-2;
}

.product-option__value {
  color: $text-black;
  cursor: text;
}

.product-options__buy-wrapper {
  display: flex;
  grid-template-columns: 3fr 1fr;
  column-gap: 15px;
  grid-template-areas:
    "counter counter"
    "buy favorites";
  padding-top: 5px;
  padding-bottom: 10px;

  @media (min-width: $desktop-mid) {
    column-gap: 24px;
    grid-template-areas:
      "counter ."
      "buy favorites";
  }

  .favorites-button {
    margin: 20px 0 0;
    height: 50px;
    width: 93px;

    background: $light-grey-ui;
    border-radius: 4px;

    transition: all 0.3s ease;

    @media (max-width: $desktop-mid) {
      width: 58px;
    }

    .favorites-button__body {
      fill: $light-grey-ui;
    }

    &:hover {
      background: $mid-grey-ui;

      transition: all 0.3s ease;

      .favorites-button__body {
        fill: $mid-grey-ui;
      }
    }
  }

  &.combination_button {
    .grt-number-input__button,
    .grt-number-input__wrapper {
      background: transparent;
    }

    .grt-number-input__wrapper {
      justify-content: space-between;
      width: 100%;

      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 3px;

      > span {
        display: flex;
      }
    }

    .grt-number-input__button--minus {
      border-right: 1px solid #dfdfdf;
    }

    .grt-number-input__button--plus {
      border-left: 1px solid #dfdfdf;
    }

    .grt-number-input__button {
      border-radius: 0;
      height: 48px;
      width: 40px;

      &.disabled {
        opacity: 1;

        svg {
          opacity: 0.35;
        }
      }
    }

    .grt-number-input {
      grid-area: buy;
      margin: 20px 0 0;
      padding: 0;

      &.ada {
        display: none;

        & + .product-options__buy-btn {
          display: flex !important;
        }
      }
    }

    .grt-number-input__input {
      background: transparent;
      border: 0;
    }

    .big_text_to_cart,
    .small_text_to_cart {
      color: $text-black;
    }

    @media screen and (max-width: 960px) {
      .big_text_to_cart {
        display: none;
      }
    }

    @media screen and (min-width: 961px) {
      .small_text_to_cart {
        display: none;
      }
    }
  }
}

.favorites-button {
  grid-area: favorites;
  height: auto;
  margin: 0;
}

.product-options__counter {
  grid-area: counter;
  margin-bottom: 15px;
}

.product-options__buy-btn {
  grid-area: buy;
}

.product-options__product-info {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  margin-left: -24px;

  .product-option {
    margin-left: 24px;

    &:first-child {
      width: 100%;
    }

    @media (min-width: $desktop-large) {
      &:first-child {
        width: auto;
      }
    }
  }
}

.product-purchase-terms {
  margin: 0;
  padding: 22px 0;

  list-style: none;
}

.product-not-available {
  margin: 20px 0 0;

  font-size: 14px;
  font-weight: bold;
  color: $text-black;
}

.complain {
  margin: 0 15px;

  @media (min-width: $pad) {
    margin: 0;
  }
}

.product {
  &-warnings {
    &:empty {
      display: none;
    }
  }
}

.product-card__favorite-btn {
  margin-left: auto;
}
</style>
