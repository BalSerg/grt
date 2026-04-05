<template>
  <section :class="{ 'entry-point--blocked': isSending }" class="entry-point">
    <div v-if="!isSuccessSend" class="quick-order">
      <h2 class="entry-point__header">{{ $t('quick_order') }}</h2>

      <div class="quick-order__product-info">
        <div :class="isPhotoProduct ? 'quick-order__product-photo' : 'quick-order__no-photo'">
          <img
            v-if="isPhotoProduct"
            :alt="name_product"
            :src="photo"
          />
        </div>
        <h3 class="quick-order__product-name">
          <span>{{ name_product }}</span>
        </h3>
      </div>

      <div class="entry-point__input-wrapper entry-point__input-wrapper--indent">
        <InputCounter v-model="form.goodsCount"/>
      </div>

      <div
        v-if="message"
        class="entry-point__message entry-point__message--error"
      >
        {{ message }}
      </div>

      <form novalidate @submit.prevent="submit">
        <div class="entry-point__input-wrapper">
          <InputText
            v-model.lazy="form.name"
            :error_message="$t('enter_name')"
            :pseudo_placeholder="$t('name')"
            :required="true"
            :v="$v.form.name"
          />
        </div>
        <div class="entry-point__input-wrapper">
          <InputEmail
            v-model.lazy="form.email"
            :required="true"
            :v="$v.form.email"
          />
        </div>

        <GrtTelInput
          v-model.lazy="form.phone"
          :country-code="countryCode"
          :v="$v.form.phone"
          @on-input-phone="inputPhone"
        />

        <div
          v-if="shouldBeAgreementBlockVisible"
          class="quick-order__agreement"
        >
          <label
            :class="{ 'grt-checkbox--error': $v.form.agreesWithTerms.$error }"
            class="grt-checkbox"
          >
            <input
              v-model.lazy="form.agreesWithTerms"
              class="input"
              type="checkbox"
              @change="$v.form.agreesWithTerms.$touch()"
            />
            <svg
              class="icon"
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="bg"
                d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2Z"
                fill="none"
                stroke="#bebebe"
              />
              <path
                class="checkmark"
                d="M7.13965 10.8596C6.87965 11.1196 6.45965 11.1196 6.19965 10.8596L3.80632 8.46622C3.68148 8.34166 3.61133 8.17256 3.61133 7.99622C3.61133 7.81987 3.68148 7.65077 3.80632 7.52622C4.06632 7.26622 4.48632 7.26622 4.74632 7.52622L6.66632 9.44622L11.253 4.85955C11.513 4.59955 11.933 4.59955 12.193 4.85955C12.453 5.11955 12.453 5.53955 12.193 5.79955L7.13965 10.8596Z"
                fill="none"
              />
              <rect
                class="outline"
                height="15"
                rx="0.5"
                stroke="none"
                width="15"
                x="0.5"
                y="0.5"
              />
            </svg>
            <span class="label">
              <i18n path="footer.subscribe.agreement">
                <template #user_agreement>
                  <nuxt-link :to="localePath(`/docs/terms-of-use/`)">{{
                      $t('footer.subscribe.user_agreement')
                    }}</nuxt-link>
                </template>
                <template #policy>
                  <nuxt-link :to="localePath(`/docs/privacy-policy/`)">{{
                      $t('footer.subscribe.policy')
                    }}</nuxt-link>
                </template>
              </i18n>
            </span>
          </label>
        </div>

        <div class="entry-point__submit-wrapper">
          <button class="grt-btn grt-btn--filled grt-btn--block" type="submit">
            {{ $t('login.send') }}
          </button>
        </div>
      </form>
    </div>

    <div v-show="isSending" class="loader-wrapper">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    </div>

    <div v-if="isSuccessSend">
      <h2 class="entry-point__header">{{ $t('order_accepted') }}</h2>
      <p class="entry-point__message">{{ $t('we_will_call') }}</p>
    </div>
  </section>
</template>


<script>
import {email, helpers, minLength, required} from 'vuelidate/lib/validators';
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import {mapGetters} from 'vuex';
import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import InputCounter from '@/components/common/input-counter';
import GrtTelInput from '@/components/grt-tel-input';
import {MULTIPART_FORM_DATA_HEADER, PhoneCountryCode, RFQ_type} from '@/assets/js/const';
import {validateOnLetters} from "~/assets/js/customValidation";

const localStoreKeys = {
  NAME: 'quick_order_name',
  EMAIL: 'quick_order_email',
  PHONE: 'quick_order_phone'
};

const getLocalStoreValue = key => {
  if (!localStorage[key]) {
    return '';
  }

  if (localStorage[key] === 'undefined') {
    return '';
  }

  return localStorage[key];
};

export default {
  components: {
    InputEmail,
    InputText,
    InputCounter,
    GrtTelInput
  },
  props: {
    productId: Number,
    required: true,
    productCount: {
      type: Number,
      default: 1
    },
    photo: '',
    name_product: '',
  },
  validations: {
    form: {
      email: {required, email},
      name: {required},
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
      agreesWithTerms: {
        checked: value => value
      }
    }
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        goodsCount: this.productCount,
        agreesWithTerms: true
      },
      message: '',
      isSending: false,
      isSuccessSend: false,
      phoneObj: null,
      countryCode: null,
    };
  },
  created() {
    if (process.client) {
      if (localStorage[COUNTRY_CODE]) {
        this.countryCode = localStorage[COUNTRY_CODE];
      }
    }

    this.loadUserInfoFromLocalStore();

    if (!this.form.name) {
      this.loadUserInfoFromAppStorage();
    }
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
    shouldBeAgreementBlockVisible() {
      return !this.user;
    },
    isPhotoProduct() {
      if (this.photo && this.photo.startsWith('http')) {
        return true;
      }
      return false;
    }
  },
  methods: {
    inputPhone(newPhoneObj) {
      this.phoneObj = newPhoneObj;
    },
    loadUserInfoFromLocalStore() {
      if (!process.client) {
        return;
      }

      this.form.name = getLocalStoreValue(localStoreKeys.NAME);
      this.form.email = getLocalStoreValue(localStoreKeys.EMAIL);
      this.form.phone = getLocalStoreValue(localStoreKeys.PHONE);
    },
    saveUserInfoToLocalStore() {
      if (process.client) {
        localStorage[localStoreKeys.NAME] = this.form.name;
        localStorage[localStoreKeys.EMAIL] = this.form.email;
        localStorage[localStoreKeys.PHONE] = this.phoneObj.nationalNumber;
      }
    },
    loadUserInfoFromAppStorage() {
      if (this.user) {
        this.form.email = this.user.email;
        this.form.phone = this.user.phone;
        this.form.name = this.user.name;
      }
    },
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      this.saveUserInfoToLocalStore();

      this.sendLegacyOrder();
      this.sendOrder();
    },

    sendLegacyOrder() { // TODO выпилить когда-то
      this.isSending = true;
      const legacyOrderData = this.packLegacyOrderDetailsInFormData();

      const axios = this.$axios.create();
      axios.onError = () => {
      };

      axios
        .post('/cmprfq?=json', legacyOrderData, {
          headers: MULTIPART_FORM_DATA_HEADER
        })
        .then(response => {
          this.isSuccessSend = true;
        })
        .catch(err => {
          this.$toast.error(err.toString());
        })
        .finally(() => {
          this.isSending = false;
        });
    },

    packLegacyOrderDetailsInFormData() { // TODO выпилить когда-то
      const orderDetails = {
        agree: this.form.agreesWithTerms,
        product_id: this.productId,
        is_buy_custom: 0,
        feedback_type: RFQ_type.MAIN_PAGE_PRODUCT_CARD,
        product_count: this.form.goodsCount,
        phone: this.phoneObj.number.replace(/[^0-9]/g, ''),
        country_id: PhoneCountryCode[this.phoneObj.country.dialCode],
        email: this.form.email,
        name: this.form.name
      };
      const orderFormData = new FormData();

      Object.keys(orderDetails).forEach(key => {
        orderFormData.append(key, orderDetails[key]);
      });

      return orderFormData;
    },

    sendOrder() {
      this.isSending = true;
      const orderData = this.packOrderDetailsInFormData();

      const axios = this.$axios.create();
      axios.onError = () => {
      };

      axios
        .post('/napi/crm-forms/forms/rfq', orderData, {
          headers: MULTIPART_FORM_DATA_HEADER
        })
        .then(response => {
          this.isSuccessSend = true;
        })
        .catch(err => {
          this.$toast.error(err.toString());
        })
        .finally(() => {
          this.isSending = false;
        });
    },

    packOrderDetailsInFormData() {
      const orderDetails = {
        agree: this.form.agreesWithTerms,
        product_id: this.productId,
        is_buy_custom: 0,
        feedback_type: RFQ_type.MAIN_PAGE_PRODUCT_CARD,
        quantity: this.form.goodsCount,
        phone: this.phoneObj.number.replace(/[^0-9]/g, ''),
        country_id: this.phoneObj?.country?.iso2?.toLowerCase(),
        email: this.form.email,
        name: this.form.name
      };
      const orderFormData = new FormData();
      Object.keys(orderDetails).forEach(key => {
        orderFormData.append(key, orderDetails[key]);
      });

      return orderFormData;
    }
  }
};
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

// TODO: Вынести стили вместе с чекбоксом в отдельный компонент
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
