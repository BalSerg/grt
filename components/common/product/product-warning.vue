<template>
  <div class="product-warning" :class="warningData.type">
    <div class="product-warning__icon">
      <img :src="`${icons[warningData.type]}`" :alt="warningData.text" />
    </div>
    <div class="product-warning__text">
      {{warningData.text}}
      <p v-if="warningData.link">
        <nuxt-link :to="localePath(`/suppliers/${warningData.link}`)">{{$t('product.take_a_look')}}</nuxt-link>
        {{$t('product.whole_products')}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    warningData: {
      type: Object,
      default() {
        return {
          text: '',
          type: 'info',
          link: ''
        }
      }
    }
  },
  data() {
    return {
      icons: {
        express: '/nimages/product-warnings/express.svg',
        info: '/nimages/product-warnings/info.svg',
        late: '/nimages/product-warnings/late.svg'
      }
    }
  }
}
</script>

<style lang="scss">
.product-warning {
  padding: 12px 24px 12px 48px;
  border: 1px solid $mid-grey-ui;
  border-radius: 8px;
  position: relative;
  margin: 8px 0;

  &__icon {
    position: absolute;
    left: 14px;
    top: 14px;
  }

  &__text {
    min-height: 2.6em;
    font-size: 13px;
    line-height: 1.5;
    color: $text-black;
  }

  &.express {
    background-color: rgba(165, 166, 246, 0.1);
    border-color: #5d5fef;
  }
}
</style>