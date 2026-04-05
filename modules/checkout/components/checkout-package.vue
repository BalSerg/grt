<template>
  <div :class="{'collapsed': collapsed}" class="checkout-package">
    <div class="checkout-package__header">
      <div class="checkout-package__title">{{ $t('checkout.parcel') }} {{ parcel.number }}</div>
      <div class="checkout-package__details">
        <!-- <dl class="checkout-package__weight">
          <dt>{{ $t('cart.weigh_total') }}</dt>
          <dd>{{ parcel.weightKg }} {{ $t('mass_unit.kg') }}</dd>
        </dl> -->
        <dl class="checkout-package__cost">
          <dt>{{ $t('cart.total') }}</dt>
          <dd>{{ parcel.total }} {{ currency }}</dd>
        </dl>
      </div>
      <div class="checkout-package__collapse">
        <button @click="collapsed = !collapsed">
          <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.024 1.987c0-.545.444-.987.99-.987.547 0 .99.442.99.987V6.17l.396-.396a.99.99 0 011.4 1.399l-2.1 2.098a.991.991 0 01-1.4 0L9.2 7.174a.988.988 0 111.4-1.399l.424.424V1.987zM3 11.965c0-.55.448-.997 1-.997h16c.552 0 1 .446 1 .997 0 .55-.448.996-1 .996H4c-.552 0-1-.446-1-.996zM12.014 23a.988.988 0 01-.99-.987v-4.212l-.424.424a.99.99 0 01-1.4-1.399l2.1-2.098a.99.99 0 011.4 0l2.1 2.098a.988.988 0 11-1.4 1.399l-.396-.396v4.184a.988.988 0 01-.99.987z"
              fill="#B8B8B8"/>
          </svg>
        </button>
      </div>
      <div class="checkout-package__remove">
        <button @click="removeParcel(parcel.number)">
          <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.438 4.313H8.25a.188.188 0 00.188-.188v.188h7.124v-.188c0 .103.085.188.188.188h-.188V6h1.688V4.125c0-.827-.673-1.5-1.5-1.5h-7.5c-.827 0-1.5.673-1.5 1.5V6h1.688V4.312zM20.25 6H3.75a.75.75 0 00-.75.75v.75c0 .103.084.188.188.188h1.415l.579 12.257c.038.8.698 1.43 1.498 1.43h10.64c.802 0 1.46-.628 1.498-1.43l.579-12.258h1.416A.188.188 0 0021 7.5v-.75a.75.75 0 00-.75-.75zm-3.11 13.688H6.86l-.567-12h11.414l-.567 12z"
              fill="#B8B8B8"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="checkout-package__goods">
      <CheckoutProduct v-for="product in parcel.products" :key="product.key" :product="product"/>
    </div>
    <div class="checkout-package__recipient">
      <CheckoutRecipient
        :isChangeVisible="isChangeVisible"
        :parcel="parcel"
        @onChangeVisible="$emit('onChangeVisible')"
      />
    </div>
    <div class="checkout-package__delivery">
      <CheckoutDelivery
        :currency="currency"
        :parcel="parcel"
      />
    </div>
    <div v-if="parcel.delivery.deliveryMethodId"
         class="checkout-package__comment">
      <textarea
        :id="`comment-${parcel.number}`"
        v-model="comment"
        :placeholder="$t('complain.comment')"
        name="comment"
        @blur="savePackage"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import merge from 'lodash.merge'
import CheckoutProduct from '@/modules/checkout/components/checkout-product';
import CheckoutRecipient from '@/modules/checkout/components/checkout-recipient';
import CheckoutDelivery from '@/modules/checkout/components/delivery/checkout-delivery';

export default {
  components: {
    CheckoutProduct,
    CheckoutRecipient,
    CheckoutDelivery
  },
  props: {
    isChangeVisible: Boolean,
    parcel: {
      type: Object,
      required: true
    },
    currency: String
  },
  data() {
    return {
      collapsed: false,
      comment: null,
    }
  },
  mounted() {
    this.comment = this.parcel.comment;
  },
  methods: {
    ...mapActions({
      SAVE_PARCEL: 'checkout/SAVE_PARCEL',
      REMOVE_PARCEL: 'checkout/REMOVE_PARCEL'
    }),
    async savePackage() {
      const parcel = merge({}, this.parcel, {comment: this.comment})
      await this.SAVE_PARCEL(parcel)
    },
    removeParcel(id) {
      this.REMOVE_PARCEL(id);
    }
  },
}
</script>

<style lang="scss">
.checkout {
  &-package {
    background-color: $white;
    border-radius: 8px;
    padding: 12px 16px 16px;
    border: 1px solid $mid-grey-ui;
    margin-bottom: 16px;

    &.collapsed {
      overflow: hidden;

      .checkout-package__goods,
      .checkout-package__recipient,
      .checkout-package__delivery,
      .checkout-package__comment {
        display: none;
      }

      .checkout-package__header {
        border-bottom: none;
        padding-bottom: 0;
      }

      .checkout-package__collapse {
        button {
          svg {
            path {
              fill: $grt-blue;
            }
          }
        }
      }
    }

    &__header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-bottom: 1px solid $mid-grey-ui;
      align-items: baseline;
      margin: 0 -16px;
      padding: 0 16px 10px;

      @media screen and (max-width: $pad - 1) {
        flex-wrap: wrap;
        position: relative;
      }
    }

    &__remove {
      transform: translateY(4px);
      margin-left: 20px;

      @media screen and (max-width: $pad - 1) {
        position: absolute;
        right: 13px;
        top: -4px;
      }

      button {
        cursor: pointer;

        &:hover {
          svg {
            transition: 200ms;

            path {
              fill: #282828;
            }
          }
        }
      }
    }

    &__comment {
      padding-top: 16px;

      textarea {
        resize: vertical;
        box-sizing: border-box;
        font-size: 14px;
        color: $text-black;
        padding: 12px;
        min-height: 90px;
        width: 100%;
        border: 1px solid $grey-default;
        border-radius: 4px;
        font-family: $main-font-family;
      }
    }

    &__collapse {
      transform: translateY(3px);
      margin-left: 20px;
      cursor: pointer;

      @media screen and (max-width: $pad - 1) {
        position: absolute;
        right: 50px;
        top: -3px;
      }

      button {
        cursor: pointer;

        &:hover {
          svg {
            transition: 200ms;

            path {
              fill: #282828;
            }
          }
        }
      }
    }

    &__title {
      color: $text-black;
      font-size: 18px;
      font-weight: 600;

      @media screen and (max-width: $pad - 1) {
        flex-grow: 1;
        padding-right: 50%;
        margin-bottom: 16px;
      }
    }

    &__details {
      flex-grow: 1;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 24px;
      font-size: 14px;
      color: #717171;

      @media screen and (max-width: $pad - 1) {
        padding-left: 0;
        flex-grow: 1;
        width: 100%;
        justify-content: space-between;
      }

      dl {
        display: flex;
        margin: 0 16px 0 0;
        padding: 0;

        @media screen and (max-width: $pad - 1) {
          margin: 0;
          width: 50%;
        }

        dt {
          &::after {
            content: ":";
            margin-right: 0.3em;
          }
        }

        dd {
          margin: 0;
          padding: 0;
          color: #090305;
        }
      }
    }

    .grow {
      max-width: calc(66.6666% - 8px);
      width: calc(66.6666% - 8px);
    }

    &__goods {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 16px 0 12px;
      margin: 0 -8px;

      @media screen and (max-width: $desktop-mid - 1) {
        flex-wrap: nowrap;
        overflow-x: auto;
      }

      @media screen and (max-width: $pad) {
        flex-wrap: wrap;
        overflow-x: unset;
      }
    }
  }
}
</style>
