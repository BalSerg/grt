<template>
  <div class="entry-point">
    <div class="quick-order">
      <h2 class="entry-point__title">{{ $t('proceed_сheckout') }}</h2>
      <InputText v-model.lazy="forms.name"
                 :v="$v.forms.name"
                 :required="true"
                 :pseudo_placeholder="$t('name')"
                 :error_message="$t('enter_name')"
                 class="er"
      />

      <GrtTelInputSimple v-model.lazy="forms.phone"
                         :v="$v.forms.phone"
                         :default-country="defaultCountry"
                         @countryChanged="retrievePhoneSet"
      />

      <InputEmail v-model.lazy="forms.email"
                  :v="$v.forms.email"
                  class="entry-point__input-wrapper"
      />

      <div class="entry-point__submit-wrapper" @click="send">
        <button class="grt-btn grt-btn--filled grt-btn--block">
          {{ $t('login.send') }}
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {email, helpers, not, numeric, required} from 'vuelidate/lib/validators'
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import {mergeEmptyFields} from "../../assets/js/util";
import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import InputCounter from '@/components/common/input-counter';
import GrtTelInputSimple from '@/components/grt-tel-input-simple'
import localStorageService from '@/utils/service.localStorage'
import ButtonClose from '@/components/common/button-close'
import {SmsVerificationBus} from "@/event-bus/sms-verification-bus";

export default {
  components: {
    InputEmail,
    InputText,
    InputCounter,
    GrtTelInputSimple,
    ButtonClose
  },
  data: () => ({
    forms: {
      name: '',
      email: '',
      countryAlpha2: '',         // 'RU'
      countryCallingCode: '',    // '7'
      phone: '',           // '+7 999 333 00 11' or '999333'
    },
    localCountry: ''
  }),
  validations: {
    forms: {
      name: {required, noNumeric: not(numeric)},
      email: {email},
      phone: {
        required,
        noWords: val => {
          const RE = /[a-z]|[а-я]/
          RE.lastIndex = 0
          return !helpers.req(val) || !RE.test(val)
        }
      },
    }
  },
  computed: {
    ...mapGetters({
      GET_TARGET_DATA: 'tech/GET_TARGET_DATA',
      user: 'userData/user'
    }),
    defaultCountry() {
      if (this.forms.countryAlpha2)
        return this.forms.countryAlpha2
      else
        return this.localCountry
    }
  },
  beforeDestroy() {
    this.saveNotEmptyFieldsToLocalStorage();
  },
  methods: {
    ...mapActions({
      INIT_SMS_VERIFICATION: 'auth/INIT_SMS_VERIFICATION'
    }),
    ...mapMutations({
      SET_MODAL_COMPONENT_NAME: 'tech/SET_MODAL_COMPONENT_NAME'
    }),
    saveNotEmptyFieldsToLocalStorage() {
      const filledFormFields = Object.fromEntries(Object.entries(this.forms).filter(field => field[1]))
      if (filledFormFields)
        localStorageService.SAVE_USER_INTO_LOCALSTORAGE(filledFormFields)
    },
    retrievePhoneSet(phoneSet) {            // { "name": "Albania", "iso2": "AL", "dialCode": "355" }
      this.forms.countryAlpha2 = phoneSet.iso2                 // 'RU'
      this.forms.countryCallingCode = phoneSet.dialCode        // '7'
    },
    send() {
      this.$v.$touch()
      if (!this.$v.forms.$dirty || this.$v.forms.$invalid)
        return

      localStorageService.SAVE_USER_INTO_LOCALSTORAGE(this.forms)
      SmsVerificationBus.$emit('saveUserQuickOrder')
      this.$emit('close')
    },
    close() {
      this.SET_MODAL_COMPONENT_NAME('')
    }
  },
  async created() {
    if (process.client) {
      this.forms = localStorageService.GET_USER_FROM_LOCALSTORAGE()
      this.localCountry = localStorage.getItem(COUNTRY_CODE) || 'RU'
    }
    this.forms = mergeEmptyFields(this.forms, this.user)
  }
}
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.quick-order {
  position: relative;
}

.quick-order__product-info {
  display: flex;
  margin: 0 0 24px;

  .quick-order__product-photo,
  .quick-order__no-photo {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 70px;
    margin: 0 24px 0 0;

    > img {
      display: block;
      max-height: 70px;
      max-width: 100%;
    }
  }

  .quick-order__no-photo {
    background: #f2f2f2;
  }

  .quick-order__product-name {
    box-sizing: border-box;
    height: 70px;
    overflow: hidden;

    font-size: 16px;
    line-height: 22px;

    color: $text-black;
    background: $white;


    /* stylelint-disable */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    /* stylelint-enable  */
  }
}

.entry-point__title {
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.4;

  @media (min-width: 768px) {
    margin-bottom: 24px;
    font-size: 23px;
    line-height: 1.5;
  }
}

.entry-point--blocked::before {
  content: "";
  position: absolute;
  top: -14px;
  right: -24px;
  bottom: -14px;
  left: -24px;
  z-index: 200;

  background-color: $white;
  opacity: 0.86;
}

.entry-point__agreement--error {
  .entry-point__agreement-label::before {
    border-color: $coral;
  }
}

.quick-order__agreement {
  margin-bottom: 0;
  padding: 8px 0;
}

.entry-point__submit-wrapper {
  padding: 8px 0 0;
}

.entry-point__input-wrapper--indent {
  margin-bottom: 24px;
}

.grt-checkbox {
  @include checkbox(
    16px,
    16px,
    $grt-blue,
    $white,
    $grt-blue,
    $white,
    $text-black
  );
}

.grt-checkbox--error {
  @include checkbox(16px, 16px, $coral, $white, $grt-blue, $white, $coral);
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.entry-point__input-wrapper {
  margin-top: 18px;
}
</style>
