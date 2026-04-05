<template>
  <div>
    <div v-if="deliveryMethods.length >= 1"
         class="package-delivery__methods"
         :class="{'methods-error target-invalid' : selectedDeliveryType && !deliveryMethod}">
      <div
        v-for="method in deliveryMethods"
        :key="method.key"
        class="delivery-method"
        :class="{'selected':deliveryMethod == method.deliveryMethodId}"
        @click="selectMethod(method.deliveryMethodId)"
      >
        <div class="delivery-method__control">
          <input :id="`method-${method.deliveryMethodId}`" v-model="deliveryMethod" disabled
                 type="radio"
                 :value="method.deliveryMethodId"/>
          <label :for="`method-${method.deliveryMethodId}`"></label>
        </div>
        <div class="delivery-method__logo">
          <img
            :src="method.deliveryMethodImageLink"
            :alt="method.deliveryMethodName"/>
        </div>
        <div class="delivery-method__title">
          {{ method.deliveryMethodName }}
          <DeliveryWarinig v-if="method.deliveryMethodId == 12">{{ $t('checkout.delivery_warning') }}</DeliveryWarinig>
        </div>
        <div v-show="method.deliveryMethodId != 12" class="delivery-method__date">
          ~ {{ $tc('checkout.days', secondsToDays(method.deliveryMaxSeconds)) }}
          <span>({{ getDeliveryDate(method.deliveryMaxSeconds) }})</span>
        </div>
        <div v-show="method.deliveryMethodId != 12" class="delivery-method__price">
          <span v-if="method.tariffRate === 0">
            {{ $t('free') }}
          </span>
          <span v-else>
            {{ method.tariffRate }} {{ currency }}
          </span>
        </div>
      </div>
    </div>
    <div class="delivery-method__error"
         :class="{'target-invalid' : selectedDeliveryType && !deliveryMethod}">
      {{ $t('checkout.delivery_method_error') }}
    </div>
  </div>
</template>

<script>
import DeliveryWarinig from './checkout-delivery-warning.vue';
import {secondsToDays} from "./deliveryUtils";


export default {
  components: {DeliveryWarinig},
  props: {
    deliveryMethods: Array,
    selectedDeliveryType: Number,
    currency: String,
    deliveryMethod: Number,
    parcel: Object
  },
  data() {
    return {}
  },
  methods: {
    async selectMethod(id) {
      this.$emit('selectedMethod', id);
    },
    getDeliveryDate(deliveryTimeSpan) {
      const date = new Date();
      date.setDate(date.getDate() + secondsToDays(deliveryTimeSpan));
      return date.toLocaleDateString(this.$i18n.locale, {month: 'long', day: 'numeric', weekday: 'long'});
    },
    secondsToDays(seconds) {
      return secondsToDays(seconds)
    },
  }
}
</script>


