<template>
  <div>
    <div class="delivery-methods__mobile">
      <h2>{{ $t('checkout.delivery_methods') }}</h2>
      <div class="delivery-method__mobile--wrapper">
        <div v-for="method in methods"
             :key="method.key"
             class="delivery-method__mobile"
             :class="{'selected':selectedDeliveryMethod == method.deliveryMethodId}"
             @click="selectMethod(method.deliveryMethodId)">
          <div class="delivery-method__mobile--control">
            <input :id="`method-${method.deliveryMethodId}`" v-model="selectedDeliveryMethod" disabled
                   type="radio" :value="method.deliveryMethodId"/>
            <label :for="`method-${method.deliveryMethodId}`"></label>
          </div>
          <div class="delivery-method__mobile--details">
            <div class="delivery-method__mobile--logo">
              <img
                :src="method.deliveryMethodImageLink"
                :alt="method.deliveryMethodName"/>
            </div>

            <div v-if="method.deliveryMethodId != 12" class="delivery-method__mobile--date">
              ~ {{ $tc('checkout.days', method.deliveryMaxSeconds / 60 / 60 / 24) }}
              <span>({{ getDeliveryDate(method.deliveryMaxSeconds) }})</span>
            </div>
          </div>
          <div v-if="method.deliveryMethodId != 12" class="delivery-method__mobile--price">
            <div class="delivery-method__mobile--title">
              {{ method.deliveryMethodName }}
            </div>
            <div>{{ method.tariffRate }} {{ componentData.currency }}</div>
          </div>
        </div>
      </div>
      <div class="delivery-methods__mobile--action">
        <button class="btn btn-primary" @click="close">
          {{
            selectedDeliveryMethod == componentData.selectedDeliveryMethod ? $t('checkout.close') : $t('checkout.choose')
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {DeliveryMethodsBus} from "~/event-bus/delivery-methods-bus";

export default {
  name: 'DeliveryMethodsModal',
  props: {
    componentData: Object
  },
  data() {
    return {
      selectedDeliveryMethod: this.componentData?.selectedDeliveryMethod
    }
  },
  computed: {
    methods() {
      return this.componentData?.deliveryMethods
    }
  },
  created() {
    const delivery = this.componentData.deliveryMethods;
    if(delivery.length===1){
      this.selectMethod(delivery[0]?.deliveryMethodId)
    }
  },
  methods: {
    getDeliveryDate(deliveryTimeSpan) {
      const date = new Date();
      date.setDate(date.getDate() + this.secondsToDays(deliveryTimeSpan));
      return date.toLocaleDateString(this.$i18n.locale, {month: 'long', day: 'numeric', weekday: 'long'});
    },
    secondsToDays(seconds) {
      return seconds = seconds / 60 / 60 / 24;
    },
    close() {
      this.$emit('close');
    },
    selectMethod(id) {
      this.selectedDeliveryMethod = id;
      DeliveryMethodsBus.$emit('emitMethod', this.selectedDeliveryMethod, this.componentData.parcelNumber);
    }
  }
}
</script>

<style lang="scss">
.delivery-methods__mobile {
  height: 80vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;

  &--action {
    button {
      background-color: $grt-blue;
      width: 100%;
      color: white;
      text-align: center;
      padding: 15px;
      border-radius: 4px;
    }
  }
}

.delivery-method__mobile {
  display: flex;
  padding: 16px 0;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid $mid-grey-ui;

  @media screen and (max-width: $desktop-mid - 1) {
    width: 97%;
  }

  &.selected {
    border-color: $grt-blue;
  }

  &--control {
    width: 48px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    input[type="radio"] {
      display: none;

      & ~ label {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
        position: relative;
        box-sizing: border-box;

        &::before {
          width: 2px;
          height: 2px;
          background-color: transparent;
          transform: translate(-50%, -50%);
          transition: ease 200ms;
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
        }
      }

      &:checked {
        & ~ label {
          border-color: $grt-blue;
          background-color: $white;

          &::before {
            background-color: $grt-blue;
            width: 8px;
            height: 8px;
          }
        }
      }
    }
  }

  &--title {
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    margin-left: -207px;

    & + div {
      white-space: nowrap;
      text-align: right;
    }

    @media screen and (max-width: $pad) {
      margin-left: 0;
    }
  }

  &--logo {
    width: 96px;

    img {
      width: 80px;
      height: 18px;
    }
  }

  &--details {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;

    @media screen and (max-width: $pad) {
      width: calc(50% - 25px);
    }
  }

  &--price {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 14px;

    @media screen and (max-width: $pad) {
      width: calc(50% - 25px);
    }
  }

  &--date {
    padding: 28px 0 0 0;

    @media screen and (max-width: $pad) {
      padding: 0;
    }
  }

  &--wrapper {
    overflow-y: auto;
    position: relative;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    padding: 20px 0;
  }
}
</style>
