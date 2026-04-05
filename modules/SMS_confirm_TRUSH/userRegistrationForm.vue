<template>
  <div class="entry-point">
    <div class="quick-order">
      <h2 class="entry-point__title">{{ $t('proceed_сheckout') }}</h2>
      <div class="entry-point__input-wrapper">
        <InputText v-model.lazy="forms.name"
                   :error_message="$t('enter_name')"
                   :pseudo_placeholder="$t('name')"
                   :required="true"
                   :v="$v.forms.name"
                   class="er"
        />
      </div>

      <div class="entry-point__input-wrapper">
        <InputEmail v-model.lazy="forms.email"
                    :required="true"
                    :v="$v.forms.email"
        />
      </div>

      <GrtTelInput v-model.lazy="forms.phone"
                   :country-code="forms.countryCallingCode"
                   :v="$v.forms.phone"
                   @on-input-phone="parseChosenCountryCodeSet"
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
import {mapActions, mapGetters} from 'vuex'
import {email, helpers, not, numeric, required} from 'vuelidate/lib/validators'
import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import InputCounter from '@/components/common/input-counter';
import GrtTelInput from '@/components/grt-tel-input';
import localStorageService from '@/utils/service.localStorage'
import {validateOnLetters} from "~/assets/js/customValidation";

export default {
  components: {
    InputEmail,
    InputText,
    InputCounter,
    GrtTelInput
  },
  props: {
    componentData: {
      type: Object
    }
  },
  data: () => ({
    forms: {
      name: '',
      email: '',
      countryAlpha2: '',         // 'RU'
      countryCallingCode: '',    // '7'
      phone: '',           // '+79993330011'  ?
    }
  }),
  validations: {
    forms: {
      name: {required, noNumeric: not(numeric)},
      email: {required, email},
      phone: {
        required,
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
  },
  methods: {
    ...mapActions({
      INIT_SMS_VERIFICATION: 'auth/INIT_SMS_VERIFICATION'
    }),
    parseChosenCountryCodeSet(phoneSet) {
      this.forms.countryAlpha2 = phoneSet.countryCode                 // 'RU'
      this.forms.countryCallingCode = phoneSet.countryCallingCode     // '7'
    },
    send() {
      this.$v.$touch()
      if (!this.$v.forms.$dirty || this.$v.forms.$invalid)
        return

      localStorageService.SAVE_USER_INTO_LOCALSTORAGE(this.forms)
      this.INIT_SMS_VERIFICATION(this.componentData)
        .then(({componentData, orderId}) => {
          if (componentData != null) {
            this.$router.push(this.localePath(`${componentData.positiveAction.routerPushTo}/${orderId}/`))
          }
        })
    },
  },
  async created() {
    if (process.client) {
      this.forms = localStorageService.GET_USER_FROM_LOCALSTORAGE()
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/_mixins";

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

  background-color: #ffffff;
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
</style>
