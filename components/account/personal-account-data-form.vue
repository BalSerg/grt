<template>
  <div class="personal-account__form">
    <InputText
      v-model.lazy="form.firstname"
      :error_message="$t('enter_name')"
      :pseudo_placeholder="$t('name')"
      :required="true"
      :v="$v.form.firstname"
    />
    <InputText v-model.lazy="form.lastname"
               :error_message="$t('enter_surname')"
               :pseudo_placeholder="$t('surname')"
               :required="true"
               :v="$v.form.lastname"
    />
    <InputEmail
      disabled="disabled"
      v-model.lazy="form.email"
      :error_message="$t('login.enter_email').toString()"
      :pseudo_placeholder="$t('full_name')"
      :required="true"
      :v="$v.form.email"
    />
    <div class="personal-account__form-checkbox">
      <input id="pers-acc" v-model="form.subscribed" type="checkbox"/>
      <label for="pers-acc">
        {{ $t('account.subscribe') }}
      </label>
    </div>

    <GrtTelInput
      v-model.lazy="form.phone"
      disabled="disabled"
      :v="$v.form.phone"
      :country-code="countryCode"
      @on-input-phone="inputPhone"
    />

    <!-- Пока скрыто. Как будет список стран, ЭТО РАСКОММЕНТИТЬ
    <InputSelect
      :options="countries"
      :selected="form.selectedCountry"
      @onSelect="selectCountry"
    />
    -->

    <InputSelect
      :options="Object.values(genders)"
      :selected="genders[form.selectedGender]"
      @onSelect="selectGender"
    />
<!--    <InputText-->
<!--      v-model.lazy="form.birthday"-->
<!--      :error_message="$t('enter_birthday')"-->
<!--      :pseudo_placeholder="$t('birthday')"-->
<!--      :v="$v.form.birthday"-->
<!--    />-->

    <button class="grt-btn grt-btn--filled grt-btn--block" type="submit" @click="saveForm(form)">
      {{ $t('account.save') }}
    </button>
  </div>
</template>

<script>
import {email, not, numeric, required} from 'vuelidate/lib/validators';
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'
import InputText from '@/components/common/input-text';
import InputEmail from '@/components/common/input-email';
import InputSelect from '@/components/common/input-select';
import GrtTelInput from "~/components/grt-tel-input";

export default {
  components: {
    GrtTelInput,
    InputText,
    InputEmail,
    InputSelect
  },
  data() {
    return {
      genders: {
        0: this.$t('account.gender.male'),
        1: this.$t('account.gender.female')
      },
      countryCode: null,
      form: {
        firstname: '',
        lastname: '',
        email: '',
        subscribed: false,
        selectedGender: null,
        selectedCountry: '',
        phone: '',
        birthday: ''
      },
    }
  },
  methods: {
    saveForm(form) {
      const data = {firstName: form.firstname, lastName: form.lastname, subscriptionEnabled: form.subscribed, gender: form.selectedGender}
      const { result } = this.$axios.$patch('/napi/user-info/users/account', data);
      this.setupForm(result)
    },
    setupForm(result) {
      this.form.firstname = result.firstName;
      this.form.lastname = result.lastName;
      this.form.email = result.email;
      this.form.phone = result.phoneNumber;
      this.form.selectedGender = result.gender;
      this.form.subscribed = result.subscriptionEnabled;
    },
    selectCountry(opt) {
      this.form.selectedCountry = opt;
    },
    selectGender(opt) {
      const gender = Object.keys(this.genders).find(key => this.genders[key] === opt);
      this.form.selectedGender = parseInt(gender);
    },
    inputPhone(newPhoneObj) {
      this.phoneObj = newPhoneObj;
    },
  },
  validations: {
    form: {
      firstname: {required, noNumeric: not(numeric)},
      lastname: {required, noNumeric: not(numeric)},
      email: {email},
      phone: {required},
      birthday: {}
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async fetch() {
    if (process.client) {
      if (localStorage[COUNTRY_CODE]) {
        this.countryCode = localStorage[COUNTRY_CODE];
      }
    }

    const {result} = await this.$axios.$get('/napi/user-info/users');
    this.setupForm(result)
  }
}
</script>

<style lang="scss">
.personal-account {
  &__form {
    background-color: white;
    border-radius: 12px;
    border: 1px solid $mid-grey-ui;
    padding: 16px;

    &-checkbox {
      margin: 0 0 12px;

      input[type="checkbox"] {
        display: none;

        &:checked + label {
          &::before {
            background: $grt-blue;
          }

          &::after {
            position: absolute;
            left: 4px;
            top: 4px;

            width: 8px;
            height: 4px;

            border-left: 2px solid $white;
            border-bottom: 2px solid $white;

            transform: rotate(-45deg);

            content: "";
          }
        }
      }

      label {
        position: relative;

        padding: 0 0 0 28px;
        display: inline-block;

        font-size: 14px;
        line-height: 16px;
        color: $text-black;

        cursor: pointer;

        &::before {
          position: absolute;
          left: 0;
          top: 0;

          width: 16px;
          height: 16px;

          border: 1px solid $grt-blue;
          border-radius: 2px;

          content: "";
        }
      }
    }

    .grt-btn {
      width: auto;
      padding: 5px 16px;

      border-radius: 2px;
    }
  }
}

.grt-btn--filled {
  background: $grt-blue2;
  border-color: $grt-blue2;

  &:hover {
    border-color: $grt-blue2;
    color: $grt-blue2;
  }
}

.grt-text-input__messages {
  display: block !important; //перебиваю инлайн стили, чтоб не было прыжков при ошибке с телефоном.
}

.grt-text-input__input,
.vti__dropdown {
  border-color: $mid-grey-ui;
}
</style>
