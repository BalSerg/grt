<template>
  <div class="package-delivery__types-box">
    <div>
      <div v-show="deliveryMethods.length" class="package-delivery__header">
        <div class="package-delivery__heading">
          {{ $t('checkout.delivery_methods') }}
        </div>
      </div>
      <template v-if="isDesktop">
        <section class="package-delivery__wrapper">
          <div class="package-delivery__types">
            <template v-if="isLoading">
              <div
                v-for="item in 4"
                :key="item"
                class="package-delivery__type skeleton"
              >
                <div class="delivery-type__name">&nbsp;</div>
                <div class="delivery-type__description">&nbsp;</div>
                <div class="delivery-type__date">&nbsp;</div>
                <div class="delivery-type__price">&nbsp;</div>
              </div>
            </template>
            <template v-if="deliveryMethods.length">
              <div
                v-for="type in filledDeliveryTypes"
                :key="type.key"
                class="package-delivery__type"
                :class="{'active': type.id === selectedDeliveryType, 'selected': getTypeWithSelectedDeliveryMethod === type.id}"
                @click="showMethodsByType(type.id)"
              >
                <div class="delivery-type__name">
                  {{ $t(type.name) }}
                </div>
                <div class="delivery-type__description">
                  {{ $t(type.description) }}
                </div>
                <div v-show="parseInt(type.deliveryTimeSpan) > 0" class="delivery-type__date">
                  {{ '~ ' + $tc('checkout.days', type.deliveryTimeSpan) }}
                </div>
                <div v-show="parseInt(type.tariffRate) > 0" class="delivery-type__price">
                  {{ type.tariffRate }} {{ currency }}
                </div>
              </div>
            </template>
          </div>
          <checkout-delivery-methods
            v-if="deliveryMethods.length"
            :delivery-methods="deliveryMethodsByType"
            :selected-delivery-type="selectedDeliveryType"
            :currency="currency"
            :delivery-method="selectedDeliveryMethod"
            :parcel="parcel"
            @selectedMethod="selectMethod"
          />
        </section>
      </template>
      <template v-else>
        <section class="package-delivery__mobile">
          <template v-if="isLoading">
            <div
              v-for="item in 4"
              :key="item"
              class="package-delivery__type skeleton"
            >
              <div class="delivery-type__name">&nbsp;</div>
              <div class="delivery-type__description">&nbsp;</div>
              <div class="delivery-type__date">&nbsp;</div>
              <div class="delivery-type__price">&nbsp;</div>
            </div>
          </template>
          <template v-if="deliveryMethods.length">
            <div v-for="type in filledDeliveryTypes"
                 :key="type.key"
                 class="package-delivery__type mobile"
                 :class="{'selected active': getTypeWithSelectedDeliveryMethod === type.id}"
                 @emitMethod="onSelectMethodMobile(id)"
                 @click="openDeliveryMethods(type.id)">
              <div class="delivery-type__name">
                {{ $t(type.name) }}
              </div>
              <div class="delivery-type__description">
                {{ $t(type.description) }}
              </div>
              <div v-show="parseInt(type.deliveryTimeSpan) > 0" class="delivery-type__date">
                {{ '~ ' + $tc('checkout.days', type.deliveryTimeSpan) }}
              </div>
              <div v-show="parseInt(type.tariffRate) > 0" class="delivery-type__price">
                {{ type.tariffRate }} {{ currency }}
              </div>
            </div>
          </template>
        </section>
        <div class="delivery-method__error"
             :class="{'target-invalid' : selectedDeliveryType && !selectedDeliveryMethod}">
          {{ $t('checkout.delivery_method_error') }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ModalBus} from "../../../../event-bus/modal-bus";
import {handleFetchError} from "../../../../assets/js/util";
import {DeliveryMethodsBus} from "../../../../event-bus/delivery-methods-bus";
import {deliveryTypes, secondsToDays} from "./deliveryUtils";
import CheckoutDeliveryMethods from '@/modules/checkout/components/delivery/checkout-delivery-methods.vue';
import CheckoutModal from '@/modules/checkout/components/checkout-modal';
import GoogleMap from "@/components/google-map"

const PICK_POINT_METHOD = 4;
const ZOOM_LEVEL = 12;

export default {
  components: {
    CheckoutDeliveryMethods,
    CheckoutModal
  },
  props: {
    currency: String,
    deliveryMethod: Number,
    isLoading: Boolean,
    deliveryMethods: Array,
    parcel: Object
  },
  data() {
    return {
      deliveryMethodsByType: [],
      selectedDeliveryType: null,
      filledDeliveryTypes: [],
      selectedDeliveryMethod: 0
    }
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop',
    }),
    getTypeWithSelectedDeliveryMethod() {
      return this.getSelectedDeliveryMethodInfo?.deliveryMethodType;
    },
    getSelectedDeliveryMethodInfo() {
      if (this.selectedDeliveryMethod)
        return this.deliveryMethods.find(x => x.deliveryMethodId == this.selectedDeliveryMethod)
    },
    getFirstOrSelectedDeliveryTypeId() {
      let deliveryTypeId = this.getTypeWithSelectedDeliveryMethod
      if (!deliveryTypeId) {
        deliveryTypeId = this.filledDeliveryTypes[0].id;
      }
      return deliveryTypeId;
    }
  },
  watch: {
    deliveryMethods: {
      handler() {
        this.validateSelectedMethod();
        this.filterEmptyTypes();
        this.setSelectedOrMinDeliveryRatesToDeliveryTypes();
        this.autoSelectDeliveryType();
      },
      deep: true
    },
    deliveryMethod() {
      this.validateSelectedMethod()
      this.setSelectedOrMinDeliveryRatesToDeliveryTypes();
      this.showMethodsByType(this.getTypeWithSelectedDeliveryMethod)
    }
  },
  created() {
    DeliveryMethodsBus.$on('emitMethod', this.onSelectMethodMobile);
  },
  beforeDestroy() {
    DeliveryMethodsBus.$off('emitMethod');
  },
  methods: {
    onSelectMethodMobile(id, parcelNumber) {
      if (this.parcel.number === parcelNumber)
        this.selectMethod(id);
    },
    autoSelectDeliveryType() {
      if (this.filledDeliveryTypes.length === 0) return;
      this.showMethodsByType(this.getFirstOrSelectedDeliveryTypeId);
    },
    showMethodsByType(id) {
      if (id === PICK_POINT_METHOD) {
        this.deliveryMethodsByType = []
        this.openMapModal()
      } else {
        this.deliveryMethodsByType = this.getDeliveryMethodsByType(id);
      }
      this.selectedDeliveryType = id;
    },
    async openMapModal() {
      const addressPosition = {lat: this.parcel.recipient.latitude, lng: this.parcel.recipient.longitude}
      const {result} = await this.$axios.$get(
        `/napi/logistics/delivery-operators/methods/${PICK_POINT_METHOD}/pickuppoints?latitude=${addressPosition.lat}&longitude=${addressPosition.lng}&zoomLevel=${ZOOM_LEVEL}`
      ).catch(err => handleFetchError(err))

      ModalBus.$emit('open', {
        component: GoogleMap,
        componentData: {addressPosition, pickPoints: result},
        isFullWidth: true
      })
    },
    selectMethod(id) {
      this.$emit('fillRateCalcId', id);
      this.setSelectedOrMinDeliveryRatesToDeliveryTypes();
    },
    setSelectedOrMinDeliveryRatesToDeliveryTypes() {
      this.filledDeliveryTypes = this.filledDeliveryTypes.map(x => {
        return {
          id: x.id,
          name: x.name,
          description: x.description,
          deliveryTimeSpan: secondsToDays(this.getMinOrSelectedField(x.id, 'deliveryMaxSeconds')),
          tariffRate: this.getMinOrSelectedField(x.id, 'tariffRate')
        }
      })
    },
    openDeliveryMethods(id) {
      this.deliveryMethodsByType = this.getDeliveryMethodsByType(id);
      this.selectedDeliveryType = id;
      ModalBus.$emit('open', {
        component: CheckoutModal,
        componentData: {
          deliveryMethods: this.deliveryMethodsByType,
          selectedDeliveryMethod: this.selectedDeliveryMethod,
          currency: this.currency,
          parcelNumber: this.parcel.number
        },
        isFullWidth: true
      });
    },
    getMinOrSelectedField(typeId, field) {
      if (!field) return;
      const methodsByType = this.getDeliveryMethodsByType(typeId);
      if (methodsByType.find(x => x.deliveryMethodId === this.selectedDeliveryMethod)) {
        if (this.getSelectedDeliveryMethodInfo)
          return this.getSelectedDeliveryMethodInfo[field];
      } else {
        const methodField = methodsByType.map(x => x[field]);
        return Math.min(...methodField)
      }
    },
    getDeliveryMethodsByType(typeId) {
      return this.deliveryMethods.filter(x => x.deliveryMethodType === typeId);
    },
    filterEmptyTypes() {
      const methodTypeIds = this.deliveryMethods.map(x => x.deliveryMethodType);
      this.filledDeliveryTypes = deliveryTypes.filter(x => methodTypeIds.includes(x.id))
    },
    validateSelectedMethod() {
      const methodIds = this.deliveryMethods.map(x => x.deliveryMethodId);
      if (!methodIds.includes(this.deliveryMethod))
        this.selectedDeliveryMethod = 0;
      else {
        this.selectedDeliveryMethod = this.deliveryMethod;
        this.$emit('fillRateCalcId', this.selectedDeliveryMethod);
      }
    },
  }
}
</script>
