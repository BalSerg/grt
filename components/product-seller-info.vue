<template>
  <div class="product-seller-info">
    <div class="product-seller-info__wrapper">
      <div class="product-seller-info__logo-wrapper product-seller-info__logo-wrapper--square">
        <nuxt-link
          v-if="supplierCountryLink"
          :to="supplierCountryLink"
        >
          <img
            v-if="product.supplierCountryId"
            class="product-seller-info__logo"
            :src="`/nimages/country-flags-svg/svg/${countryId}.svg`"
            :alt="product.supplierName"
            width="20"
            height="20"
          >
        </nuxt-link>
        <div v-else>
          <img
            v-if="product.supplierCountryId"
            class="product-seller-info__logo"
            :src="`/nimages/country-flags-svg/svg/${countryId}.svg`"
            :alt="product.supplierName"
            width="20"
            height="20"
          >
        </div>
      </div>
      <dl class="product-seller-info__text">
        <dt class="product-seller-info__title">{{ $t('seller_name') }}</dt>
        <dd class="product-seller-info__name">
          <nuxt-link :to="localePath(`/suppliers/${product.supplierSemanticId}`)">
            {{ product.supplierName }}
          </nuxt-link>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      brandLogo: {
        type: String,
        default: ''
      },
      brandName: {
        type: String,
        default: ''
      },
      supplierSubSite: {
        type: String,
        default: null
      },
      supplierLogo: {
        type: String,
        default: ''
      },
      supplierName: {
        type: String,
        default: ''
      },
      supplierCountryId: {
        type: String,
        default: ''
      },
      navigation: {
        type: Object,
        default: {
          title: '',
          categories: []
        }
      },
      labels: {
        type: Array,
        default: []
      }
    }
  },
  computed: {
    countryId() {
      return this.product.supplierCountryId.toLowerCase();
    },

    supplierCountryLink() {
      const COUNTRY_TYPE = 'country';

      return this.product.labels.find(x => x.typeSemanticId === COUNTRY_TYPE)?.link || '';
    }
  },
}
</script>

<style lang="scss">
.product-seller-info {
  padding: 10px 0;

  @media (min-width: $desktop-large) {
    display: flex;
  }
}

.product-seller-info__wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: $desktop-large) {
    margin-bottom: 0;
    flex-grow: 1;

    &:first-child {
      padding-right: 13px;
    }

    &:nth-child(2) {
      padding-left: 13px;

      border-left: 1px solid #e7e7e7;
    }
  }
}

.product-seller-info__logo-wrapper {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 30px;
  margin-right: 8px;

  border-radius: 1px;
  background-color: #ffffff;
  overflow: hidden;

  a {
    width: 100%;
  }
}

.product-seller-info__logo-wrapper--square {
  width: 30px;
  padding: 5px;
  background-color: $grey;

  .product-seller-info__logo {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }
}

.product-seller-info__logo {
  display: block;
  max-width: 60px;
  max-height: 100%;

  object-fit: contain;
}

.product-seller-info__text {
  max-width: 140px;
  margin: 0;

  overflow: hidden;
}

.product-seller-info__name {
  margin-left: 0;

  color: $text-black;
  text-overflow: ellipsis;
  white-space: nowrap;

  overflow: hidden;

  &:hover {
    color: $grt-blue;
  }

  a {
    color: inherit;
  }
}
</style>
