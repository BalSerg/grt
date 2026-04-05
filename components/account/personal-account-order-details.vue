<template>
  <section class="order-detail">
    <div class="order-header">
      <div
          :class=orderDetailStatus
          class="order-header__status"
      >
        {{
          $t('account.orders.' + order_detail.orderStatus)
        }}
      </div>
      <div class="order-header__data">
        <div class="order-header__first-line">
          <div class="order-header__data-name-date">
            {{ $t('account.order_detail.title') }} {{ orderid }} {{ $t('account.order_detail.from') }}
            {{ getOnlyDate(order_detail.createdAt) }}
          </div>
          <div class="order-header__data-but-amount">
            <PaymentButton
              v-if="order_detail.orderStatus === 'awaiting-payment'"
              :order-id="orderid"
              @3d-error="handle3dError"
            />
            <div class="order-header__data-amount">{{ order_detail.totalPrice }}
              {{ localizedCurrency(order_detail.currency) }}
            </div>
          </div>
        </div>
        <div class="order-header__second-line">
          <div>
            <a v-if="order_detail.receiptUrls && order_detail.receiptUrls.length" class="order-header__data-receipt"
               href="/">{{ order_detail.receiptUrls.length }}
              {{ $t('account.order_detail.electronic_receipt') }}</a>
            <span class="order-header__data-type-payment">{{
                $t('account.order_detail.payment_method')
              }}: <span>{{ $t('account.order_detail.card') }}</span></span>
          </div>
          <div class="order-header__data-clarify" @click="showModal">
            {{ $t('account.order_detail.to_clarify_the_information_on_the_order') }}
            <personal-account-modal
              v-if="showModalFlag"
            ></personal-account-modal>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(parcel, index) in order_detail.parcels"
      :key="index"
      class="order-parcel"
    >
      <div class="order-parcel__number-weight">
        <div class="order-parcel__number">{{ $t('account.order_detail.parcel.title') }} {{ index + 1 }}</div>
        <div v-if="parcel.weight" class="order-parcel__weight">
          <span>{{ $t('account.order_detail.parcel.weight') }}</span>
          {{ parcel.weight }} <!--Вес товара-->
          {{ parcel.unit_measurement }} <!--единица измерения веса-->
        </div>
      </div>
      <div v-for="(good, index) in parcel.items" :key="index" class="order-parcel__good">
        <div class="order-parcel__good-basedata">
          <div class="order-parcel__good-namephoto">
            <div v-if="good.src" class="order-parcel__good-photo">
              <LazyImg
                :src="good.src">
              </LazyImg>
            </div>
            <div class="order-parcel__good-name-subdata">
              <div class="order-parcel__good-name">{{ good.name }}</div>
              <!--Это доп характеристики. Пока их нет , НО БУДУТ-->
              <!--div class="order-parcel__good-subdata">
                <button class="order-detail__pseudocheckbox" @click="showBlock($event)"></button>
                <div class="order-parcel__good-color">
                  <span>{{$t('account.order_detail.good.color')}}:</span>{{good.color}}
                </div>
                <div class="order-parcel__good-size">
                  <span>{{$t('account.order_detail.good.size')}}:</span>{{good.size}}
                </div>
                <div class="order-parcel__good-weight">
                  <span>{{$t('account.order_detail.good.weight')}}:</span>{{good.weight}}
                </div>
              </div-->
            </div>
          </div>
<!--          <div class="order-parcel__good-icons">-->
<!--            <div-->
<!--              :class="{'icons-in-cart': productInCartIdList.icnludes(good.id)}"-->
<!--              class="order-parcel__good-icons-cart"-->
<!--              @click="addToCart(good.id, good.quantity)">-->
<!--              <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path-->
<!--                  d="M21.6303 16.4508H7.67327L8.37405 15.0234L20.0178 15.0023C20.4115 15.0023 20.749 14.7211 20.8194 14.332L22.4319 5.30625C22.474 5.06953 22.4108 4.82578 22.2561 4.64062C22.1796 4.5495 22.0843 4.4761 21.9766 4.42551C21.869 4.37492 21.7516 4.34835 21.6326 4.34766L6.82014 4.29844L6.69358 3.70312C6.61389 3.32344 6.2717 3.04688 5.88264 3.04688H2.26155C2.04212 3.04688 1.83168 3.13404 1.67653 3.2892C1.52137 3.44436 1.4342 3.65479 1.4342 3.87422C1.4342 4.09364 1.52137 4.30408 1.67653 4.45924C1.83168 4.6144 2.04212 4.70156 2.26155 4.70156H5.21233L5.76545 7.33125L7.12717 13.9242L5.37405 16.7859C5.28301 16.9088 5.22817 17.0547 5.21574 17.2071C5.20332 17.3596 5.2338 17.5124 5.30374 17.6484C5.44436 17.9273 5.72795 18.1031 6.04202 18.1031H7.51389C7.20011 18.5199 7.03062 19.0275 7.03108 19.5492C7.03108 20.8758 8.1092 21.9539 9.43577 21.9539C10.7623 21.9539 11.8405 20.8758 11.8405 19.5492C11.8405 19.0266 11.667 18.518 11.3576 18.1031H15.1334C14.8196 18.5199 14.6501 19.0275 14.6506 19.5492C14.6506 20.8758 15.7287 21.9539 17.0553 21.9539C18.3819 21.9539 19.46 20.8758 19.46 19.5492C19.46 19.0266 19.2865 18.518 18.9772 18.1031H21.6326C22.0873 18.1031 22.46 17.7328 22.46 17.2758C22.4586 17.0566 22.3706 16.8468 22.2152 16.6923C22.0598 16.5377 21.8495 16.4509 21.6303 16.4508ZM7.16467 5.92969L20.66 5.97422L19.3381 13.3758L8.73733 13.3945L7.16467 5.92969ZM9.43577 20.2898C9.02795 20.2898 8.69514 19.957 8.69514 19.5492C8.69514 19.1414 9.02795 18.8086 9.43577 18.8086C9.84358 18.8086 10.1764 19.1414 10.1764 19.5492C10.1764 19.7456 10.0984 19.934 9.95947 20.0729C9.82057 20.2118 9.63219 20.2898 9.43577 20.2898ZM17.0553 20.2898C16.6475 20.2898 16.3147 19.957 16.3147 19.5492C16.3147 19.1414 16.6475 18.8086 17.0553 18.8086C17.4631 18.8086 17.7959 19.1414 17.7959 19.5492C17.7959 19.7456 17.7179 19.934 17.579 20.0729C17.4401 20.2118 17.2517 20.2898 17.0553 20.2898Z"-->
<!--                  fill="#B8B8B8"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <FavoritesButton-->
<!--              :is-product-in-faivor="IS_PRODUCT_IN_FAVOR(good.id)"-->
<!--              @toggle="toggleFavorite(good.id)"-->
<!--            ></FavoritesButton>-->
<!--          </div>-->
        </div>
        <div class="order-parcel__good-price">
          <span>{{ $t('account.order_detail.good.price') }}</span>
          {{ good.price }} {{ localizedCurrency(order_detail.currency) }}
        </div>
      </div>
      <div class="order-parcel__add-data">
        <div class="order-parcel__recipient">
          <button class="order-detail__pseudocheckbox" @click="showBlock($event)"></button>
          <h3>{{ $t('account.order_detail.parcel.recipient') }}</h3>
          <div class="order-parcel__recipient-name">{{ parcel.customer.fullName }}</div>
          <span class="order-parcel__recipient-phone">{{ parcel.customer.phone }}</span>,
          <span class="order-parcel__recipient-email">{{ parcel.customer.email }}</span>
        </div>
        <div v-if="parcel.delivery" class="order-parcel__delivery">
          <button class="order-detail__pseudocheckbox" @click="showBlock($event)"></button>
          <h3>{{ $t('account.order_detail.parcel.delivery') }}</h3>
          <div class="order-parcel__delivery-address">
            {{ parcel.delivery.deliveryAddress }}
          </div>
          <div class="order-parcel__delivery-type">
            {{ parcel.delivery.deliveryName }}
          </div>
          <div class="order-parcel__delivery-price">
            {{ parcel.delivery.deliveryPrice }} {{ localizedCurrency(order_detail.currency) }}
          </div>
        </div>
        <div class="order-parcel__break"></div>
        <div v-if="parcel.comment" class="order-parcel__comment">
          <button class="order-detail__pseudocheckbox" @click="showBlock($event)"></button>
          <h3>{{ $t('account.order_detail.parcel.comment') }}</h3>
          <div>{{ parcel.comment }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import PaymentButton from "~/components/cloudpayments-payment-button";
import PersonalAccountModal from "~/components/account/personal-account-modal";
import LazyImg from "~/components/lazy-img";
import {Currency} from "~/assets/js/const";
import {handleFetchError} from "~/assets/js/util";
import FavoritesButton from "~/components/favorites-button";
import PATH from "~/assets/js/const.path";


export default {
  name: "PersonalAccountOrderDetails",
  components: {FavoritesButton, LazyImg, PersonalAccountModal, PaymentButton},

  props: {
    orderid: String,

    props: {
      product: {
        type: Object,
        required: true
      }
    },
  },

  data() {
    return {
      order_detail: {},
      showModalFlag: false,
      is3dSecureError: null,
      productInCartIdList: [],
    }
  },

  computed: {
    ...mapState('cart', ['displayedCartTab']),
    ...mapGetters({
      IS_PRODUCT_IN_FAVOR: 'userData/IS_PRODUCT_IN_FAVOR',
      GET_PRODUCT_COUNT: 'cart/GET_PRODUCT_COUNT',
    }),

    orderDetailStatus() {
      return this.order_detail.orderStatus
    }
  },

  async fetch() {
    try {
      const {result} = await this.$axios.$get(`napi/order-processing/orders/${this.orderid}`);
      this.order_detail = result;
    } catch (err) {
      this.$sentry.captureException(`Error response at get all orders: ${err}`);
      handleFetchError(this.$nuxt, err);
      console.error(err);
    }
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
    ...mapActions({
      HANDLING_of_FAVORITE_PRODUCT: 'userData/HANDLING_of_FAVORITE_PRODUCT',
      POST_PRODUCT_TO_CART: 'cart/POST_PRODUCT_TO_CART',
      REMOVE_PRODUCTs: 'cart/REMOVE_PRODUCTs',
    }),

    toggleFavorite(goodId) {
      this.HANDLING_of_FAVORITE_PRODUCT({
        operationType: this.IS_PRODUCT_IN_FAVOR(goodId) ? '$delete' : '$post',
        id: goodId
      })
    },

    addToCart(goodId, goodQuantity) {
      const countInCart = this.GET_PRODUCT_COUNT(goodId);
      const toastOptions = {
        router: this.$router,
        action: {
          text: this.$t('go_to_cart'),
          push: this.localePath({
            path: PATH.CART,
            query: {grab: this.displayedCartTab}
          })
        }
      }

      if (countInCart) {
        this.REMOVE_PRODUCTs({type: 'productId', volume: goodId})
        this.$toast.show(this.$t('cart.product_removed'), toastOptions)
      } else {
        this.POST_PRODUCT_TO_CART({id: goodId, count: goodQuantity})
        this.$toast.show(this.$t('cart.product_added'), toastOptions)
      }
      if (!this.productInCartIdList.includes(goodId)) {
        this.productInCartIdList.push(goodId);
      } else {
        const idx = this.productInCartIdList.findIndex(goodId)
        this.productInCartIdList.splice(idx, 1)
      }
    },

    getOnlyDate(longData) {

      // Получаем всю большую дату
      // Находим позицию буквы Т и из всех данных вырезаем от начала до буквы только дату
      return (longData?.slice(0, ((longData + ' ').indexOf('T'))))
    },

    localizedCurrency(currentCurrency) {
      return Currency[currentCurrency];
    },

    showModal() {
      if (this.showModalFlag) {
        this.showModalFlag = false;
      } else {
        this.showModalFlag = true;
      }
    },

    showBlock(e) {
      if (e.target.className === 'order-detail__pseudocheckbox') {
        e.target.classList.add('pseudocheckbox-reverse');
        e.target.parentNode.classList.add('block-view');

      } else {
        e.target.classList.remove('pseudocheckbox-reverse');
        e.target.parentNode.classList.remove('block-view');
      }
    },

    handle3dError() {
      this.is3dSecureError = '3dSecureError';
    },
  }
}

</script>

<style lang="scss">
.order-detail {
  margin: 16px 0;

  .order-header {
    padding: 16px;
    margin: 0 0 16px;
    box-sizing: border-box;

    border: 1px solid $mid-grey-ui;
    border-radius: 12px;

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

    &__first-line,
    &__second-line {
      display: flex;
      justify-content: space-between;
    }

    &__data {
      &-name-date,
      &-amount {
        margin: 0 0 8px;

        font-size: 28px;
        line-height: 39px;
        font-weight: 700;
        color: $text-black;
      }

      &-amount,
      button {
        display: inline-block;
      }

      button {
        padding: 5px 16px;
        margin: 0 24px 0 0;
        min-height: inherit;
        width: auto;

        font-size: 14px;
        line-height: 16px;
        color: $white;

        background: #1ad6ba;
        border-radius: 2px;

        transition: none;
        cursor: pointer;
      }

      &-receipt,
      &-type-payment,
      &-clarify {
        font-size: 14px;
        line-height: 19px;
        color: $grt-blue;
      }

      &-receipt {
        margin: 0 24px 0 0;
      }

      &-type-payment {
        color: $text-grey-2;

        > span {
          color: $text-black;
        }
      }

      &-clarify {
        position: relative;

        cursor: pointer;

        .personal-account-modal {
          position: absolute;
          top: 25px;
          right: 5px;

          padding: 12px;

          background: $white;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    }

    @media screen and (max-width: $pad) {
      &__first-line {
        .order-header__data-but-amount {
          display: flex;
          flex-flow: column-reverse;
          text-align: right;
        }

        button {
          display: block;
          margin: 0 0 13px;
        }
      }

      &__second-line {
        display: block;
        margin: -30px 0 0;

        > div {
          margin: -35px 0 0;
        }

        .order-header__data-type-payment {
          white-space: nowrap;
        }

        .order-header__data-clarify {
          margin: 8px 0 0;
        }
      }
    }

    @media screen and (max-width: 490px) {
      &__first-line {
        display: block;

        .order-header__data-but-amount {
          display: flex;
          justify-content: space-between;
          flex-flow: row-reverse;
        }

        button {
          display: inline-block;
        }
      }

      &__second-line {
        &,
        > div {
          margin: 0;
        }
      }
    }

    @media screen and (max-width: 370px) {
      .order-header__data-type-payment {
        margin: 8px 0 0;
        display: block;
      }
    }
  }

  .order-parcel {
    box-sizing: border-box;
    margin: 16px 0 0;

    border: 1px solid $mid-grey-ui;
    border-radius: 12px;

    color: $text-black;

    &__number-weight {
      display: flex;
      align-items: center;
      padding: 16px;

      border-bottom: 1px solid $mid-grey-ui;
    }

    &__number {
      margin: 0 24px 0 0;

      font-size: 18px;
      line-height: 25px;
      font-weight: 600;
      color: $text-black;
    }

    &__weight {
      font-size: 14px;
      line-height: 20px;

      span {
        color: $text-grey;
      }
    }

    &__good {
      padding: 16px;
      display: flex;

      &-basedata {
        display: flex;
        width: 100%;
      }

      &-namephoto {
        display: flex;
      }

      &-photo {
        width: 60px;
        height: 60px;
        margin: 0 16px 0 0;
        flex-shrink: 0;

        > img {
          width: 100%;
          height: auto;

          border-radius: 4px;
        }
      }

      &-name {
        margin: 0 0 8px;

        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
      }

      &-subdata {
        position: relative;
        display: flex;

        > div {
          margin: 0 12px 0 0;

          font-size: 14px;
          line-height: 20px;
          color: $text-black;

          > span {
            margin: 0 4px 0 0;

            color: $text-grey;
          }
        }
      }

      &-icons {
        margin: 2px 32px 0 auto;
        display: flex;
        align-items: baseline;

        &-cart,
        &-heart {
          cursor: pointer;
        }

        &-cart {
          margin: 0 24px 0 0;

          &:hover path,
          &.icons-in-cart path {
            fill: $grt-blue;
          }
        }

        &-heart {
          &:hover path {
            fill: $coral;
          }
        }
      }

      &-price {
        font-size: 24px;
        line-height: 34px;
        font-weight: 600;
        color: $text-black;

        white-space: nowrap;
      }
    }

    &__add-data {
      position: relative;

      padding: 16px;
      display: flex;
      flex-wrap: wrap;

      border-top: 1px solid $mid-grey-ui;
    }

    &__recipient,
    &__delivery,
    &__comment {
      padding: 12px;

      border-radius: 12px;
      background: $light-grey;

      > h3 {
        margin: 0 0 8px;

        font-size: 18px;
        line-height: 25px;
        font-weight: 600;
        color: $text-black;
      }

      > div,
      > span {
        font-size: 14px;
        line-height: 19px;
        color: $text-grey-2;
      }
    }

    &__recipient,
    &__delivery {
      margin: 0 0 16px;
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      width: calc(50% - 12px);
    }

    &__recipient {
      margin-right: 20px;
    }

    &__delivery {
      position: relative;

      > .order-parcel__delivery-price {
        position: absolute;
        top: 16px;
        right: 16px;

        font-size: 28px;
        font-weight: bold;
      }
    }

    &__break {
      flex-basis: 100%;
      height: 0;
    }

    &__comment {
      width: 100%;
    }
  }

  &__pseudocheckbox {
    display: none;
  }
}

@media screen and (max-width: $desktop-large) {
  .order-detail .order-parcel__add-data {
    display: block;
  }

  .order-detail .order-parcel__break {
    display: none;
  }

  .order-detail .order-parcel__recipient,
  .order-detail .order-parcel__delivery {
    display: block;
    margin: 0 0 16px;
    width: auto;
  }

  .order-detail .order-parcel__good-basedata {
    display: block;
  }

  /*
  Пока нет картинок этот отступ не нужен. Как появятся картинки это надо раскоментить
  .order-detail .order-parcel__good-icons {
    margin-left: 76px;
  }*/
}

@media screen and (max-width: $desktop-mid) {
  .order-detail .order-parcel__good {
    position: relative;

    display: block;
  }

  .order-detail .order-parcel__good-price {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
}

@media screen and (max-width: $pad) {
  .order-detail {
    &__pseudocheckbox {
      position: absolute;
      right: 2px;
      top: 2px;

      display: block;

      width: 10px;
      height: 10px;

      border: 1px solid $text-black;
      border-width: 0 0 1px 1px;

      transform: scale(1, 1) rotate(-45deg);
      transition: transform ease-out 250ms;
      cursor: pointer;

      &.pseudocheckbox-reverse {
        transform: scale(1, -1) rotate(-45deg);
        transition: transform ease-in 250ms;
      }
    }

    .order-parcel__add-data {
      border: 0;
    }

    .order-parcel__delivery > .order-parcel__delivery-price {
      font-size: 14px;
    }

    .order-parcel__good {
      border-bottom: 1px solid #e7e7e7;

      &-name-subdata {
        width: 100%;
      }

      &-subdata {
        display: block;
        height: 20px;

        overflow: hidden;
        transition: height ease-out 250ms;

        &.block-view {
          height: 100%;

          transition: height ease-in 250ms;
        }

        > div {
          margin: 0 0 4px;
        }

        &_check {
          display: block;
        }
      }

      &-icons {
        margin-left: 0;
      }
    }

    .order-parcel__recipient,
    .order-parcel__delivery,
    .order-parcel__comment {
      position: relative;

      height: 48px;
      box-sizing: border-box;

      overflow: hidden;
      transition: height ease-out 250ms;

      &.block-view {
        height: 100%;

        transition: height ease-in 250ms;
      }

      .order-detail__pseudocheckbox {
        right: 12px;
        top: 15px;
      }
    }
  }
}
</style>
