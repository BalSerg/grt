<template>
  <section class="cooperation entry-point" :class="{ 'entry-point--blocked': isSending }">
    <div  v-if="!isSuccessSend">
      <h2 class="cooperation__header">{{ $t('form_supplier.title') }}</h2>
      <div
        v-if="message"
        class="entry-point__message entry-point__message--error"
      >
        {{ message }}
      </div>

      <form novalidate @submit.prevent="submit">
        <div class="cooperation__input-wrapper">
          <InputText
            v-model.lazy="form.name"
            :v="$v.form.name"
            :required="true"
            :pseudo_placeholder="$t('name')"
            :error_message="$t('enter_name')"
          />
        </div>

        <div class="grt-tel-code">{{ $t('phone_code') }}</div>
        <div
          class="grt-tel-input grt-text-input"
          :class="{ 'grt-tel-input--error': $v.form.phone.$error }"
        >
          <GrtTelInput
            v-model.lazy="form.phone"
            :v="$v.form.phone"
            :country-code="countryCode"
            @on-input-phone="inputPhone"
          />
        </div>

        <div class="cooperation__input-wrapper">
          <InputEmail
            v-model.lazy="form.email"
            :v="$v.form.email"
            :required="true"
          />
        </div>

        <div class="cooperation__input-wrapper">
          <InputText
            v-model.lazy="form.company"
            :v="$v.form.company"
            :required="true"
            :pseudo_placeholder="$t('form_supplier.company')"
            :error_message="$t('form_supplier.enter_company')"
          />
        </div>

        <div class="cooperation__input-wrapper">
          <InputText
            v-model.lazy="form.company_site"
            :v="$v.form.company_site"
            :required="false"
            :pseudo_placeholder="$t('form_supplier.site')"
          />
        </div>

        <div class="cooperation__input-wrapper">
          <InputComment
            v-model.lazy="form.comment"
            :v="$v.form.comment"
            :required="false"
            :placeholder="$t('form_supplier.comment')"
            :name=name
          />
        </div>

        <div class="cooperation__text">
          {{ $t('form_supplier.offer') }}
        </div>

        <div class="input-file">
          <InputFile
            v-model.lazy="form.file"
            :v="$v.form.file"
            :allowed-extensions = EXTENSIONS
            :error-file-format = "$t('form_supplier.error_format') + EXTENSIONS.join(', ')"
          />
        </div>

        <div class="quick-order__agreement">
          <label
            class="grt-checkbox"
            :class="{ 'grt-checkbox--error': $v.form.agreesWithTerms.$error }"
          >
            <input
              v-model.lazy="form.agreesWithTerms"
              class="input"
              type="checkbox"
              @change="$v.form.agreesWithTerms.$touch()"
            />
            <svg
              class="icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="bg"
                d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2Z"
                stroke="#bebebe"
                fill="none"
              />
              <path
                class="checkmark"
                d="M7.13965 10.8596C6.87965 11.1196 6.45965 11.1196 6.19965 10.8596L3.80632 8.46622C3.68148 8.34166 3.61133 8.17256 3.61133 7.99622C3.61133 7.81987 3.68148 7.65077 3.80632 7.52622C4.06632 7.26622 4.48632 7.26622 4.74632 7.52622L6.66632 9.44622L11.253 4.85955C11.513 4.59955 11.933 4.59955 12.193 4.85955C12.453 5.11955 12.453 5.53955 12.193 5.79955L7.13965 10.8596Z"
                fill="none"
              />
              <rect
                class="outline"
                x="0.5"
                y="0.5"
                width="15"
                height="15"
                rx="0.5"
                stroke="none"
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
      <h2 class="entry-point__header">{{ $t('form_supplier.thank_you') }}</h2>
      <p class="entry-point__message">{{ $t('form_supplier.we_will_call') }}</p>
      <button
        type="button"
        class="grt-btn grt-btn-ok"
        @click = "closeModal"
      >
        {{ $t('ok') }}
      </button>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import {mapGetters} from "vuex";
import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import { MULTIPART_FORM_DATA_HEADER } from '@/assets/js/const';
import InputComment from '~/components/common/input-comment';
import InputFile from '~/components/common/input-file';
import GrtTelInput from '@/components/grt-tel-input';

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
    InputText,
    InputComment,
    InputFile,
    InputEmail,
    GrtTelInput
  },
  props: {
    productId: Number,
    required: true,
  },
  validations: {
    form: {
      email: { required, email },
      name: { required },
      phone: { required },
      company: { required },
      company_site: '',
      comment: '',
      agreesWithTerms: {
        checked: value => value,
      },
    },
  },
  data() {
    return {
      EXTENSIONS: ['pdf','doc','xlsx','xlsm','xlsb','csv'],
      uniqueIDPrefix: '',
      name: 'qst',
      form: {
        email: '',
        name: '',
        phone: '',
        company: '',
        company_site: '',
        comment: '',
        agreesWithTerms: true,
        file: null,
      },
      message: '',
      isSending: false,
      isSuccessSend: false,
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

      this.isSending = true;
      const orderData = this.packOrderDetailsInFormData();

      const options = {
        method: 'POST',
        url: '/napi/crm-forms/forms/request-to-become-supplier',
        headers: MULTIPART_FORM_DATA_HEADER,
        data: orderData
      };

      this.$axios.request(options).then(() => {
        this.isSuccessSend = true;
      })

      .catch((error) => {
        this.$toast.error(error.toString());
      })
      .finally(() => {
        this.isSending = false;
      });

    },
    packOrderDetailsInFormData() {
      const phoneCountry = this.phoneObj.country.iso2;

      const orderDetails = {
        agree: this.form.agreesWithTerms,
        phone: this.form.phone.replace(/[^0-9]/g, ''),// формируем введенный номер в формате +7 9161234567
        country_id: phoneCountry.toLowerCase(),
        email: this.form.email,
        name: this.form.name,
        company: this.form.company,
        company_site: this.form.company_site,
        comment: this.form.comment,
        attachment: this.form.file,
        product_id: this.productId,
      };

      const orderFormData = new FormData();

      Object.keys(orderDetails).forEach((key) => {
        orderFormData.append(key, orderDetails[key]);
      });

      return orderFormData;
    },
    closeModal() {
      this.$emit('on-close');
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.cooperation {
  &.entry-point {
    height: 100%;
    overflow: hidden;
    width: 104%;
    box-sizing: border-box;
  }

  form {
    overflow-y: auto;
    overflow-x: hidden;
    height: 77vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px 0 0;
    display: block;
  }

  &__header {
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

  &__input-wrapper {
    margin-bottom: 14px;
  }

  .entry-point--blocked::before {
    position: absolute;
    top: -14px;
    right: -24px;
    bottom: -14px;
    left: -24px;
    z-index: 200;

    background-color: $white;
    opacity: 0.86;

    content: "";
  }

  .grt-tel-input {
    position: relative;

    margin-bottom: 16px;

    .grt-text-input__label {
      left: 124px;
    }

    .vue-tel-input {
      height: 46px;

      border: none;

      &:focus-within {
        box-shadow: none;
        border-color: transparent;
      }
    }

    .vti__dropdown {
      background-color: $white;
      border: 1px solid $grey-default;
      border-radius: 3px;

      &:focus {
        border-color: $grt-blue;
        outline: 0;
      }
    }

    .vti__input {
      margin-left: 8px;
      padding-left: 14px;

      font-family: $main-font-family;

      border: 1px solid $grey-default;
      border-radius: 3px;

      &:focus {
        border-color: $grt-blue;
      }
    }

    .vti__dropdown-list {
      z-index: 100;

      width: 330px;
      overflow: hidden;
      overflow-y: scroll;

      border-radius: 3px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
      border: none;

      &::-webkit-scrollbar {
        width: 16px;

        background-color: $white;
        border-radius: 3px;
      }

      /* background of the scrollbar except button or resizer */
      &::-webkit-scrollbar-track {
        background-color: $white;
        border-radius: 3px;

        overflow: hidden;
      }

      &::-webkit-scrollbar-track:hover {
        background-color: $light-grey-ui;
      }

      /* scrollbar itself */
      &::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 5px solid $white;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #a0a0a5;
        border: 4px solid $light-grey-ui;
      }

      /* set button(top and bottom of the scrollbar) */
      &::-webkit-scrollbar-button {
        display: none;
      }
    }

    .vti__dropdown-item {
      padding: 11px 15px;
    }

    .vti__selection {
      width: 84px;
      justify-content: flex-start;

      font-size: 13px;

      color: $text-black;
    }

    .grt-tel-input__arrow-icon {
      margin-left: auto;
      width: 12px;
      height: 12px;

      background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.17 9.05a1 1 0 001.66 0l3.32-4.92a1 1 0 00-.83-1.56H2.68a1 1 0 00-.83 1.56l3.32 4.92z' fill='%23717171'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .grt-tel-input--error {
    .vti__input,
    .vti__input:focus {
      border-color: $coral;
    }

    .vti__input::placeholder {
      color: $coral;
    }

    .grt-text-input__message {
      display: block;
    }
  }

  .entry-point__agreement--error {
    .entry-point__agreement-label::before {
      border-color: $coral;
    }
  }

  .quick-order__agreement {
    margin-bottom: 16px;
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

  .grt-text-input__textarea {
    padding: 14px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;

    color: $text-grey;

    border-color: $grey-default;
    border-radius: 4px;
    outline: none;

    resize: none;

    &:focus {
      border-color: $grt-blue;
    }
  }

  .grt-text-input__label {
    color: $text-grey;
  }

  .grt-text-input__textarea:focus ~ .grt-text-input__label,
  .add_focus_effect {
    color: $grey-default;

    transform: translateY(-12px) scale(0.85);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;
  }

  .entry-point__text {
    color: $text-black;
    margin-bottom: 14px;
  }

  .grt-tel-code {
    margin: 0 0 10px;
    color: $text-grey;
  }

  .grt-btn-ok {
    width: 100%;
    box-sizing: border-box;
    max-width: initial;
    margin: 20px 0 0;
  }
}
</style>
