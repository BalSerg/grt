<template>
  <div class="checkout-product__wrapper">
    <div class="checkout-product__item">
      <div class="checkout-product__thumb">
        <img :src="product.photo" :alt="product.productName"/>
      </div>
      <div class="checkout-product__details">
        <div class="checkout-product__quantity">
          {{ $t('checkout.goods_quantity') }}: <span>{{ product.count }}</span>
        </div>
        <div class="checkout-product__title">
          {{ product.productName }}
        </div>
        <div class="checkout-product__price">
          <span>{{$t('price_as_title')}}:&nbsp;</span> {{ product.price }} {{ product.currency }}
        </div>
      </div>
    </div>
    <div class="checkout-product__hover">
      <div class="checkout-product__thumb">
        <img :src="product.photo" :alt="product.productName" />
      </div>
      <div class="checkout-product__details">
        <div class="checkout-product__title">
          {{ product.productName }}
        </div>
        <div class="checkout-product__price">
          <span>{{$t('price_as_title')}}:&nbsp;</span> {{ product.price }} {{ product.currency }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: Object
  }
}
</script>

<style lang="scss">
.checkout-product {
  &__wrapper {
    position: relative;
    padding: 6px;

    @media screen and (max-width: $pad) {
      width: calc(50% - 12px);
    }

    @media screen and (max-width: $pad - 1) {
      width: calc(100% - 12px);
    }

    &:hover {
      & .checkout-product__hover {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__item {
    max-width: 120px;

    @media screen and (max-width: $pad) {
      display: flex;
      max-width: 100%;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
  }

  &__thumb {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
    flex-shrink: 0;

    @media screen and (max-width: $pad) {
      width: 58px;
      height: 58px;
      margin-right: 16px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }

  &__title {
    display: none;
    order: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    color: #100d0e;

    @media screen and (max-width: $desktop-mid - 1) {
      font-size: 12px;
      display: block;
    }

    @media screen and (max-width: $pad) {
      white-space: inherit;
      padding: 4px 0;
    }

    @media screen and (max-width: $pad - 1) {
      padding: 0;
      font-weight: bold;
      order: 0;
    }
  }

  &__quantity {
    order: 0;
    color: $text-grey;
    font-size: 14px;
    padding-top: 4px;

    span {
      color: $text-black;
    }

    @media screen and (max-width: $desktop-mid - 1) {
      font-size: 12px;
    }


    @media screen and (max-width: $pad - 1) {
      order: 1;
    }
  }

  &__price {
    order: 3;
    display: none;
    color: $text-black;

    @media screen and (max-width: $pad - 1) {
      padding: 4px 0;
    }

    span {
      color: $text-grey;
      display: none;

      @media screen and (max-width: $pad - 1) {
        display: inline-block;
      }
    }

    @media screen and (max-width: $desktop-mid - 1) {
      font-size: 12px;
      display: block;
    }
  }

  &__hover {
    position: absolute;
    padding: 8px;
    z-index: 8;
    box-sizing: border-box;
    max-width: 156px;
    transition: 0.2s;
    background-color: $white;
    bottom: calc(100% - 10px);
    left: calc(50% - 78px);
    visibility: hidden;
    transform: translateY(20px);
    opacity: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: $text-black;
    font-size: 12px;
    line-height: 17px;

    @media screen and (max-width: $desktop-mid - 1) {
      display: none;
    }

    &::after {
      position: absolute;
      top: 100%;
      left: calc(50% - 9px);
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 9px 0 9px;
      border-color: $white transparent transparent transparent;
    }

    & .checkout-product__thumb {
      width: 140px;
      height: 140px;
      margin-bottom: 8px;
    }

    & .checkout-product__title {
      display: block;
      padding-top: 8px;
      border-top: 1px solid $grey;
    }

    & .checkout-product__price {
      display: block;

      span {
        display: none;
      }
    }
  }
}
</style>
