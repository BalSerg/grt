<template>
  <div class="package-delivery__form">
    <div
      class="package-delivery__address"
      :class="{'target-invalid' : !query || !isAddressValid}"
    >
      <vue-autosuggest
        ref="autocomplete"
        v-model="query"
        :suggestions="suggestions"
        :input-props="{
            id: 'autosuggest__input',
            placeholder: $t('checkout.address_placeholder'),
            class: 'package-delivery__input',
            name: 'location-query'
          }"
        :get-suggestion-value="getSuggestionValue"
        @keydown.enter="selectAddressByEnter"
        @selected="onSelected"
        @opened="isExpanded = true"
        @closed="isExpanded = false"
        @input="debouncedGetSuggestions"
        @blur="debouncedSaveDelivery"
      >
        <template slot-scope="{suggestion}">
          <div class="search-bar__suggest-txt-wrapper">
            <p class="search-bar__suggest-text">{{ suggestion.item }}</p>
          </div>
        </template>
      </vue-autosuggest>
      <label
        class="grt-text-input__label grt-text-input__label--focus"
        :for="'autosuggest__input'"
      >{{ $t('address_label') }}<span>*</span></label
      >
      <div class="delivery-address__error" :class="{'pointed' : query && (!isAddressValid || !suggestions.length)}">
        {{ $t('checkout.address_error') }}
      </div>
    </div>
    <div class="package-delivery__index">
      <InputText
        v-model="index"
        :v="$v.index"
        :required="true"
        :error_message="$t('checkout.postal_code_error')"
        :pseudo_placeholder="$t('checkout.index')"
        :class="{'target-invalid' : !index}"
        @input="debouncedSaveDelivery"
      />
    </div>
  </div>
</template>

<script>
import {VueAutosuggest} from 'vue-autosuggest';
import {required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import debounce from "debounce";
import {handleFetchError} from "../../../../assets/js/util";
import InputText from '@/components/common/input-text';


const MIN_QUERY_LENGTH = 4;
const DEBOUNCE_TIME_IN_MS = 500;
export default {
  components: {
    VueAutosuggest,
    InputText,
  },
  props: {
    parcel: Object,
  },
  computed: {
    ...mapGetters({
      isDesktop: 'tech/isDesktop',
    }),
    query: {
      get() {
        return this.parcel.recipient.address;
      },
      set(newValue) {
        this.deliveryAddress = newValue;
      }
    },
    postalCode() {
      return this.parcel.recipient.postalCode;
    },
  },
  data() {
    return {
      isAddressValid: false,
      suggestions: [],
      deliveryAddress: '',
      index: null,
    }
  },
  validations: {
    index: {required}
  },
  watch: {
    async query() {
      if (!this.query) {
        this.$emit('clearDeliveryMethods')
        return;
      }
      this.deliveryAddress = this.query;
      await this.validateAddress();
    },
    postalCode() {
      this.index = this.postalCode;
    },
  },
  async mounted() {
    await this.initBaseModel();
  },
  methods: {
    selectAddressByEnter(e) {
      e.target.blur();
    },
    getSuggestionValue(suggestion) {
      return suggestion.item;
    },
    onSelected(suggestion) {
      this.deliveryAddress = suggestion
        ? suggestion.item
        : this.$refs.autocomplete.internalValue;
    },
    async initBaseModel() {
      this.deliveryAddress = this.query;
      this.index = this.postalCode;
      await this.getSuggestions();
      await this.validateAddress();
      if (this.deliveryAddress && !this.parcel.recipient.address) {
        this.debouncedSaveDelivery()
      }
    },
    async validateAddress() {
      if (!this.deliveryAddress) return;
      this.isAddressValid = false;
      if (this.suggestions.length) {
        this.isAddressValid = true;
      } else {
        this.$emit('clearDeliveryMethods')
        return;
      }
      await this.getDeliveryRates();
    },
    getDeliveryRates() {
      if (!this.isAddressValid || !this.deliveryAddress) return;
      this.$emit('loadDeliveryRates', this.deliveryAddress)
    },
    async getSuggestions() {
      this.suggestions = [];
      if (!this.deliveryAddress) return;
      await this.$axios.$get(`/napi/geo/places/suggests?input=${this.deliveryAddress}`)
        .then(({result}) => {
          if (!result.length) {
            return;
          }
          this.suggestions = [{
            data: result.map(item => item.fullText)
          }];
        })
        .catch(err => handleFetchError(err));
    },
    debouncedSaveDelivery: debounce(function () {
      this.$emit('save-recipient', {deliveryAddress: this.deliveryAddress, index: this.index})
    }, DEBOUNCE_TIME_IN_MS),
    debouncedGetSuggestions: debounce(async function () {
      if (this.deliveryAddress.length < MIN_QUERY_LENGTH) return;
      await this.getSuggestions();
    }, DEBOUNCE_TIME_IN_MS)
  }
}
</script>
