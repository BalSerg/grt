<template>
  <section class="personal-orders">
    <div v-if="orders.length > 0">
      <div class="personal-orders__wrapper" v-for="(order, index) in orders" :key="index" @click="showOrderDetails(order.id)">
        <div class="personal-orders__status" :class=order.status>{{ $t('account.orders.'+ order.status) }}</div>
        <div class="personal-orders__data">
          <div class="personal-orders__data-left">
            <div class="personal-orders__data-name-date">
              {{ $t('account.orders.order') }} {{order.id}} {{ $t('account.orders.from') }} {{ getOnlyDate(order.createdAt) }}
            </div>
            <div>
              <span v-if="order.parcels.length > 0" class="personal-orders__data-delivery">{{ order.parcels[0].deliveryName }}</span>
              <span v-if="order.parcels.length > 1" class="personal-orders__data-address">
              {{$t('account.orders.address')}}
            </span>
              <span v-if="order.parcels.length === 1" class="personal-orders__data-address">
              {{ order.parcels[0].address }}
            </span>
            </div>
          </div>
          <div class="personal-orders__data-right">
            <PaymentButton v-if="order.status==='awaiting-payment'" :load-on-open="false" :order-id="String(order.id)"/>
            <div class="personal-orders__data-amount">{{ order.totalPrice }} {{localizedCurrency(order.currency)}}</div>
            <div class="personal-orders__data_count">{{ $tc('goods', order.itemsCount) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-orders__no-order" v-else>
      {{$t('account.orders.no-order')}}
    </div>
  </section>
</template>

<script>
import PaymentButton from "~/components/cloudpayments-payment-button";
import { Currency } from '@/assets/js/const';
import { handleFetchError } from '@/assets/js/util';

export default {
  name: "PersonalAccountOrders",
  components: {PaymentButton},
  data() {
    return {
      orders: [],
      currency: Currency,
    }
  },

  async fetch() {
    await this.getAllOrders();
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

  methods: {
    localizedCurrency(currentCurrency) {
      return Currency[currentCurrency];
    },

    async getAllOrders() {
      try {
        const {result} = await this.$axios.$get('napi/order-processing/orders/');
        this.orders = result;
      } catch (err) {
        this.$sentry.captureException(`Error response at get all orders: ${err}`);
        handleFetchError(this.$nuxt, err);
        console.error(err);
      }
    },

    showOrderDetails(id) {
      this.$router.push(this.localePath(`/account/orders/${id}`));
    },

    getOnlyDate(longData) {

      // Получаем всю большую дату
      // Находим позицию буквы Т и из всех данных вырезаем от начала до буквы только дату
      return (longData.slice(0, ((longData + ' ').indexOf('T'))))
    }
  },
}

</script>

<style  lang="scss">
.personal-orders {
  margin: 16px 0 0;

  &__no-order {
    font-size: 14px;
    line-height: 19px;
    color: $text-grey-2;
  }


  &__wrapper {
    padding: 16px;
    margin: 0 0 16px;
    box-sizing: border-box;

    border: 1px solid $mid-grey-ui;
    background: $white;
    border-radius: 12px;

    cursor: pointer;
  }

  &__status {
    display: inline-block;
    padding: 2px 8px;
    margin: 0 0 8px;

    font-size: 10px;
    font-weight: 600;
    line-height: 14px;
    color: $white;

    border-radius: 30px;

    &.awaiting-payment {
      background: #f2994a;
    }

    &.completed {
      background: #27ae60;
    }

    &.cancelled {
      background: $coral;
    }

    &.not-processed {
      background: $grt-blue;
    }
  }

  &__data {
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
      display: block;

      &-left {
        margin: 0 0 12px;
      }
    }

    &-name-date,
    &-amount {
      margin: 0 0 8px;

      font-size: 18px;
      line-height: 25px;
      font-weight: 700;
      color: $text-black;
    }

    &-amount {
      @media screen and (max-width: $pad) {
        margin: 0;
      }
    }

    &-delivery,
    &-address,
    &-count {
      font-size: 14px;
      line-height: 19px;
      color: $text-grey-2;
    }

    &-delivery {
      margin: 0 24px 0 0;
    }

    &-right {
      position: relative;

      margin: 0 0 0 10px;

      white-space: nowrap;
      text-align: right;

      button {
        position: absolute;
        right: calc(100% + 24px); //24px it's a margin
        top: 0;

        display: inline-block;
        padding: 5px 16px;
        min-height: inherit;
        width: auto;

        font-size: 14px;
        line-height: 16px;
        color: $white;

        background: #1ad6ba;
        border-radius: 2px;

        transition: none;
        cursor: pointer;

        @media screen and (max-width: 800px) {
          position: static;

          margin: 0 0 4px;
        }
      }

      @media screen and (max-width: 500px) {
        text-align: left;
        margin: 8px 0 0;

        button {
          float: right;
        }
      }
    }
  }
}
</style>
