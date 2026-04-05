<template>
  <section class="status-order">
    <div v-if="computedStatus === 'not-processed'" class="status-order__wrapper not-processed">
      <div class="status-order__wrapper-img">
        <img src="/nimages/icons/finger_up.png" alt=""/>
        <img src="/nimages/icons/handset.png" alt=""/>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.not_processed.title') }}</h2>
      <div class="status-order__wrapper-text">
        <template v-if="thanks">
          {{ $t('status_order.not_processed.thanks') }}
          <span>{{$t('status_order.not_processed.order')}} {{ orderId }}.</span>
          {{ $t('status_order.not_processed.text_true') }}
        </template>
        <template v-else>
          {{ $t('status_order.not_processed.text_false') }}
        </template>
      </div>
      <div class="status-order__wrapper-links">
        <nuxt-link :to="localePath('/catalog/products')">{{$t('status_order.not_processed.continue_shopping')}}</nuxt-link>
        <!-- Раскомментить, когда появится новый ЛК
        <nuxt-link :to="localePath('/catalog/products')">{{$t('status_order.not_processed.personal_account')}}</nuxt-link>
        -->
      </div>
    </div>

    <div v-if="computedStatus === 'awaiting-payment'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <img src="/nimages/emoji/emoji2.png" :alt="$t('status_order.awaiting_payment.title')"/>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.awaiting_payment.title') }}</h2>
      <div class="status-order__wrapper-text">
        <template v-if="thanks">
          {{ $t('status_order.awaiting_payment.thanks') }} <strong>{{ $t('status_order.awaiting_payment.order') }}{{ orderId }}.</strong>
          {{ $t('status_order.awaiting_payment.text') }}
          {{ $t('thanks_for_your_order.text') }}
        </template>
        <template v-else>
          {{ $t('status_order.awaiting_payment.text') }}
        </template>
      </div>
      <Payments :order-id="orderId" @3d-error="handle3dError"/>
    </div>

    <div v-if="computedStatus === 'preparing-for-shipment'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <img src="/nimages/emoji/emoji3.png" :alt="$t('status_order.preparing_for_shipment.title')"/>
      </div>
      <template v-if="thanks">
        <h2 class="status-order__wrapper-title">{{ $t('status_order.preparing_for_shipment.title') }}</h2>
        <div class="status-order__wrapper-text">
          {{ $t('thanks_for_your_order.title') }} {{ orderId }}.
          {{ $t('status_order.preparing_for_shipment.text') }}
        </div>
      </template>
      <template v-else>
        <h2 class="status-order__wrapper-title">{{ $t('status_order.preparing_for_shipment.title') }}</h2>
        <div class="status-order__wrapper-text">{{ $t('status_order.preparing_for_shipment.text') }}</div>
      </template>
    </div>

    <div v-if="computedStatus === 'shipped'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <div class="status-order__wrapper-img">
          <img src="/nimages/emoji/emoji4.png" :alt="$t('status_order.shipped.title')"/>
        </div>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.shipped.title') }}</h2>
      <div class="status-order__wrapper-text">{{ $t('status_order.shipped.text') }}</div>
      <button class="status-order__wrapper-button">№....</button>
    </div>

    <div v-if="computedStatus === 'completed'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <img src="/nimages/emoji/emoji6.png" :alt="$t('status_order.completed.title')"/>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.completed.title') }}</h2>
      <div class="status-order__wrapper-text">{{ $t('status_order.completed.text') }}</div>
      <!--div class="status-order__wrapper-button">
        <button>В отзывы на яндексе</button>
      </div-->
    </div>

    <div v-if="computedStatus === 'canceled'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <img src="/nimages/emoji/emoji5.png" :alt="$t('status_order.canceled.title')"/>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.canceled.title') }}</h2>
      <div class="status-order__wrapper-text">{{ $t('status_order.canceled.text') }}</div>
      <nuxt-link
        class="status-order__wrapper-button"
        :to="localePath(`${basePath}/${defaultSemanticId}/`)"
      >
        {{ $t('goto_catalog') }}
      </nuxt-link>
    </div>

    <div v-if="computedStatus === '3dSecureError'" class="status-order__wrapper">
      <div class="status-order__wrapper-img">
        <img src="/nimages/emoji/emoji7.png" :alt="$t('status_order.error.title')"/>
      </div>
      <h2 class="status-order__wrapper-title">{{ $t('status_order.error.title') }}</h2>
      <div class="status-order__wrapper-text">{{ $t('status_order.error.text') }}</div>
      <div class="status-order__wrapper-text">{{ $t('status_order.error.thanks') }}</div>
      <Payments :order-id="orderId" @3d-error="handle3dError"/>
    </div>
  </section>
</template>

<script>
import {BasePath, DefaultSemanticId} from '@/assets/js/const';
import Payments from "@/components/payments";

export default {
  name: "Index",
  components: {Payments},
  data() {
    return {
      is3dSecureError: null,
      semanticId: '',
      basePath: BasePath.CATALOG,
      defaultSemanticId: DefaultSemanticId.PRODUCTS,
    }
  },
  async fetch() {
    const {result} = await this.$axios.$get(`napi/order-processing/orders/${this.orderId}/status`,
      {params: {sign: this.sign}})
    this.semanticId = result.semanticId
  },
  head() {
    return {
      script: [
        {
          src: 'https://widget.cloudpayments.ru/bundles/cloudpayments'
        }
      ],
    }
  },
  computed: {
    computedStatus() {
      return this.is3dSecureError || this.semanticId
    },
    thanks() {
      return !!this.$route.query.thanks;
    },
    sign() {
      return this.$route.query.sign;
    },
    orderId() {
      return this.$route.params.slug.toString();
    }
  },
  methods: {
    handle3dError() {
      this.is3dSecureError = '3dSecureError';
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.status-order {
  background: #f9f9f9;
  padding: 48px 0 0;

  &__wrapper {
    width: 728px;
    margin: 0 auto;
    padding: 40px;

    max-width: 90vw;
    box-sizing: border-box;

    background: $white;
    border-radius: 12px;

    text-align: center;

    &.not-processed {
      .status-order__wrapper-img {
        > img:first-of-type {
          margin: 0 24px 0 0;
        }
      }

      .status-order__wrapper-text {
        margin: 0 0 24px;

        span {
          font-weight: bold;
        }
      }

      .status-order__wrapper-links {
        text-align: center;

        a {
          display: inline-block;
          padding: 9px 36px;
          box-sizing: border-box;

          font-weight: 600;
          font-size: 13px;
          line-height: 18px;

          border-radius: 4px;

          opacity: 1;
          transition: opacity ease-out 250ms;

          &:first-child {
            color: $grt-blue;

            border: 1px solid $grt-blue;
          }

          &:last-of-type {
            margin: 0 0 0 24px;

            color: $white;

            background: $grt-blue;
          }

          &:hover {
            opacity: 0.9;
            transition: opacity ease-in 250ms;
          }
        }
      }
    }

    &-img {
      display: block;
      margin: 0 auto 40px;
      min-width: 110px;

      > img {
        width: auto;
        height: auto;
        display: inline-block;
      }
    }

    &-title {
      margin: 0 0 24px;

      color: $text-black;
      font-weight: 700;
      font-size: 28px;
    }

    &-text,
    &-thanks {
      margin: 0 0 24px;

      color: $text-grey-2;
      font-size: 16px;
    }

    &-button {
      @include base-button();
      width: auto;
      padding: 0 24px;
    }
  }
}

@media screen and (max-width: 565px) {
  .status-order__wrapper.not-processed {
    padding: 24px;

    .status-order__wrapper-img {
      > img:first-of-type {
        margin: 0 16px 0 0;
      }
    }

    .status-order__wrapper-links a {
      width: 240px;
      padding: 9px 0;

      text-align: center;

      &:first-of-type {
        margin: 0 0 16px;
      }

      &:last-of-type {
        margin: 0;
      }
    }
  }
}
</style>
