<template>
  <div class="package-recipient">
    <div class="package-recipient__title">
      {{ $t('checkout.recipient') }}
      <span v-if="visible" @click="visible = !visible">{{ $t('checkout.hide') }}</span>
    </div>
    <div v-if="!visible" class="package-recipient__filled" @click="visible = !visible">
      <div v-if="form.name" class="recipient-filled__name">{{ form.name }}</div>
      <div v-if="form.phone" class="recipient-filled__phone">{{ form.phone }}</div>
      <div class="recipient-filled__change">{{ $t('checkout.change_recipient') }}</div>
    </div>
    <div v-if="visible" class="package-recipient__form">
      <form action="">
        <div class="checkout-row">
          <div class="checkout-col">
            <InputText
              v-model="form.name"
              :class="{'target-invalid': !form.name}"
              :error_message="$t('enter_name')"
              :isInvalid="isInvalidName"
              :pseudo_placeholder="$t('name')"
              :required="true"
              :v="$v.form.name"
              @input="debouncedSaveRecipient"
            />
          </div>
          <div class="checkout-col checkout-tel">
            <GrtTelInput
              v-model="form.phone"
              :class="{'target-invalid': !form.phone}"
              :country-code="countryCode"
              :isInvalid="isInvalidPhone"
              :v="$v.form.phone"
              @on-input-phone="inputPhone"
              @vue-tel-input-blur="saveRecipient"
            />
          </div>
          <div class="checkout-col">
            <InputEmail
              v-model="form.email"
              :isInvalid="isInvalidMail"
              :v="$v.form.email"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import {email, helpers, minLength, not, numeric, required} from 'vuelidate/lib/validators';
import {mapActions, mapGetters, mapState} from "vuex";
import merge from 'lodash.merge'
import debounce from "debounce";
import InputText from '@/components/common/input-text';
import InputEmail from '@/components/common/input-email';
import GrtTelInput from '@/components/grt-tel-input';
import {validateOnLetters} from "~/assets/js/customValidation";
import {isEmailType} from "~/assets/js/util";

const DEBOUNCE_TIME_IN_MS = 500;

export default {
  components: {
    InputText,
    GrtTelInput,
    InputEmail
  },
  props: {
    parcel: Object,
    isChangeVisible: Boolean
  },
  data() {
    return {
      visible: false,
      countryCode: null,
      form: {
        email: null,
        name: null,
        phone: null
      },
    }
  },
  validations: {
    form: {
      email: {required, email},
      name: {required, noNumeric: not(numeric)},
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
      agreesWithTerms: {
        checked: value => value === true
      }
    }
  },
  computed: {
    isInvalidPhone() {
      if (!this.form.phone || this.form.phone.length < 6 || validateOnLetters(this.form.phone)) return true
      return false
    },
    isInvalidName() {
      return !this.form.name
    },
    isInvalidMail() {
      if (!this.form.email || !isEmailType(email)) return true
      return false
    },
    recipient() {
      return this.parcel.recipient;
    },
    ...mapGetters({
      CHECKOUT: 'checkout/CHECKOUT',
      user: 'userData/user'
    }),
    ...mapState('checkout', ['isRecipientValid']),
  },
  watch: {
    recipient() {
      this.initFormFields();
    },
    isChangeVisible(val) {
      if (val) {
        this.visible = true
        this.$emit('onChangeVisible')
      }
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
      SAVE_PARCEL: 'checkout/SAVE_PARCEL'
    }),
    async saveRecipient() {
      const recipient = merge({}, this.parcel.recipient, this.form)
      const parcel = merge({}, this.parcel, {recipient})
      await this.SAVE_PARCEL(parcel)
    },
    inputPhone(newPhoneObj) {
      this.form.phone = newPhoneObj.formatted;
    },
    debouncedSaveRecipient: debounce(function () {
      this.saveRecipient();
    }, DEBOUNCE_TIME_IN_MS),
    getUserDataFromRecipient() {  // что бы не получать лишние поля
      const userData = {
        name: this.recipient.name,
        phone: this.recipient.phone,
        email: this.recipient.email
      }
      return userData;
    },
    initFormFields() {
      this.form = {...this.getUserDataFromRecipient()}
    },
  },
}
</script>

<style lang="scss">
.checkout-tel {
  min-height: 62px;
}

.package-recipient {
  padding-top: 12px;

  &__filled {
    padding: 12px 0;
    min-height: 90px;
    font-size: 16px;
    box-sizing: border-box;
    color: $text-black;
    line-height: 160%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;

    & .recipient-filled {
      &__name {
        margin-right: 8px;
      }

      &__phone {
        font-weight: bold;
        font-size: 14px;
      }

      &__change {
        width: 100%;
        flex-grow: 1;
        flex-shrink: 0;
        cursor: pointer;
        color: $grt-blue;
        font-size: 14px;
        line-height: 140%;
      }
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: $text-black;
    display: flex;

    span {
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      color: $grt-blue;
      margin-left: 12px;
      font-weight: 400;
    }
  }

  &__form {
    padding: 12px 0;

    & .vue-tel-input {
      height: 48px;
    }

    &.disabled {
      opacity: 0.5;

      input,
      .vti__dropdown {
        background: $mid-grey-ui;
      }
    }
  }
}
</style>
