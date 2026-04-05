<template>
  <section class="checkout-forms">
    <div id="userData" class="checkout-forms__heading">
      {{ $t('checkout.user_data') }}
    </div>
    <div class="checkout-row">
      <div class="checkout-col">
        <InputText
          v-model.lazy="forms.name"
          :class="{'target-invalid': !forms.name}"
          :error_message="$t('enter_name')"
          :is-invalid="isInvalidName"
          :isfield-no-dirty="isfieldNoDirty.name"
          :pseudo_placeholder="$t('full_name')"
          :required="true"
          :v="$v.forms.name"
          @input="debouncedSaveForm"
        />
      </div>

      <div class="checkout-col checkout-phone">
        <GrtTelInput
          v-model.lazy="forms.phone"
          :class="{'target-invalid': !forms.phone}"
          :country-code="countryCode"
          :is-invalid="isInvalidPhone"
          :isfield-no-dirty="isfieldNoDirty.phone"
          :v="$v.forms.phone"
          @on-input-phone="inputPhone"
          @vue-tel-input-blur="saveForm"
        />
      </div>

      <div class="checkout-col">
        <InputEmail
          v-model.lazy="forms.email"
          :class="{'target-invalid': !isEmailValidating}"
          :is-invalid-mail="!isEmailValidating"
          :isfield-no-dirty="isfieldNoDirty.email"
          :v="$v.forms.email"
          @input="debouncedSaveForm"
        />
      </div>
    </div>
  </section>
</template>

<script>
import {email, helpers, minLength, not, numeric, required} from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from "vuex";
import merge from "lodash.merge";
import debounce from "debounce";
import {COUNTRY_CODE} from "../../../assets/js/const.LocalStorage";
import localStorageService from "../../../utils/service.localStorage";
import {areEqualObjectProperties, isEmailType, mergeEmptyFields} from "@/assets/js/util";
import GrtTelInput from '@/components/grt-tel-input';
import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import {validateOnLetters} from "~/assets/js/customValidation";

const DEBOUNCE_TIME_IN_MS = 500;

export default {
  components: {
    InputText,
    GrtTelInput,
    InputEmail
  },
  computed: {
    ...mapGetters({
      CHECKOUT: 'checkout/CHECKOUT',
      user: 'userData/user'
    }),
    isEmailValidating() {
      return this.forms.phone || isEmailType(this.forms.email)
    },
    isInvalidPhone() {
      if (!this.forms.phone || this.forms.phone.length < 6 || validateOnLetters(this.forms.phone)) return true
      return false
    },
    isInvalidName() {
      return !this.forms.name
    },
  },
  data: () => ({
    forms: {
      name: null,
      email: null,
      phone: null,
    },
    isfieldNoDirty: {
      name: false,
      email: false,
      phone: false,                         // засада
    },
    countryCode: null,
  }),
  validations: {
    forms: {
      name: {required, noNumeric: not(numeric)},
      email: {required, email},
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
    }
  },
  created() {
    if (process.client) {
      if (localStorage[COUNTRY_CODE]) {
        this.countryCode = localStorage[COUNTRY_CODE];
      }
    }
    this.initFormFields();
  },
  methods: {
    ...mapActions({
      SAVE_CHECKOUT: 'checkout/SAVE_CHECKOUT'
    }),
    initFormFields() {
      this.forms = {...this.CHECKOUT.customer}
      const form = merge({}, this.forms);
      // Заполнение пустых полей из localStorage || store
      this.forms = mergeEmptyFields(this.forms, localStorageService.GET_USER_FROM_LOCALSTORAGE())
      if (this.user)
        this.forms = mergeEmptyFields(this.forms, this.user)
      // если хоть одно поле из store.user заполнилось то сохранить их для checkout
      if (!areEqualObjectProperties(form, this.forms)) {
        this.saveForm();
      }
    },
    async saveForm() {
      const checkout = merge({}, this.CHECKOUT, {
        customer: {...this.forms}
      })
      await this.SAVE_CHECKOUT(checkout)
    },
    debouncedSaveForm: debounce(function () {
      this.saveForm();
    }, DEBOUNCE_TIME_IN_MS),
    inputPhone(newPhoneObj) {
      this.forms.phone = newPhoneObj.formatted;
    },
  },
}
</script>

<style lang="scss">
.checkout {
  &-phone {
    min-height: 66px;
  }

  &-forms {
    background-color: $white;
    border-radius: 8px;
    border: 1px solid #e7e7e7;
    padding: 16px;

    &__heading {
      font-size: 18px;
      border-bottom: 1px solid #e7e7e7;
      margin: 0 -16px 32px;
      padding: 0 16px 16px;
      color: $text-black;
      font-weight: 600;
    }

    & .vue-tel-input {
      height: 48px;
    }
  }

  &-row {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 -8px;

    @media screen and (max-width: $desktop-mid) {
      flex-flow: column;
    }
  }

  &-col {
    flex-grow: 1;
    margin: 0 8px;
    max-width: 33.3333%;
    box-sizing: border-box;

    @media screen and (max-width: $desktop-mid) {
      max-width: unset;
    }
  }
}

</style>
