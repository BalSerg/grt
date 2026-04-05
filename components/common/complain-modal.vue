<template>
  <section class="complain-modal">
    <div  v-if="!isSuccessSend">
      <h2 class="complain-modal_title">{{ $t('complain.title') }}:</h2>
      <form novalidate @submit.prevent="submit">
        <div class="complain-modal__wrapper-radio">
          <InputRadio
            v-for="reason in reasons"
            :key="reason.id"
            v-model.lazy="form.radio"
            :v="$v.form.radio"
            :name_radio = "name_radio"
            :required = "true"
            :value_radio = "reason.value"

          >
            {{ reason.text }}
          </InputRadio>
          <div class="complain-modal__error">{{$t('сhoose_one_option')}}</div>
        </div>
        <div class="complain-modal__comment">
          <InputComment
            v-model.lazy="form.comment"
            :v="$v.form.comment"
            :placeholder="$t('complain.comment')"
            :name=name
            :required="true"
          />
        </div>

        <div v-if="isUserReg" class="complain-modal__email">
          <InputEmail
            v-model.lazy="form.email"
            :v="$v.form.email"
          />
        </div>

        <div class="complain-modal__submit">
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
      <h2 class="entry-point__header">{{ $t('complain.thank_you') }}</h2>
      <p class="entry-point__message">{{ $t('complain.send') }}</p>
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
import {MULTIPART_FORM_DATA_HEADER} from "assets/js/const";
import {mapGetters} from "vuex";
import {COUNTRY_CODE} from "../../assets/js/const.LocalStorage";
import InputRadio from '~/components/common/input-radio';
import InputEmail from '@/components/common/input-email';
import InputComment from '~/components/common/input-comment';

const localStoreKeys = {
  EMAIL: 'quick_order_email',
};


const lngData = (() => (process.env.CALL_CENTER_LANG !== 'null') ? require(`../../locales/${process.env.CALL_CENTER_LANG}.json`) : {})()

export default {
  components: {
    InputComment,
    InputRadio,
    InputEmail
  },
  props: {
    componentData: {},
  },
  data() {
    return {
      EXTENSIONS: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'raw', 'webp'],
      name: 'comment',
      name_radio: 'complaint_reason',
      form: {
        comment: '',
        radio: '',
        email: ''
    },
      message: '',
      isSending: false,
      isSuccessSend: false,
      reasons: [
        {
          id: 1,
          text: this.$t('complain.reason1'),
          value: (process.env.CALL_CENTER_LANG !== 'null') ? lngData.complain.reason1 : this.$t('complain.reason1'),    // for Nuxt-i18n the second option in this.$t('complain.reason4', 'ru') d't work
        },
        {
          id: 2,
          text: this.$t('complain.reason2'),
          value: (process.env.CALL_CENTER_LANG !== 'null') ? lngData.complain.reason2 : this.$t('complain.reason2')
        },
        {
          id: 3,
          text: this.$t('complain.reason3'),
          value: (process.env.CALL_CENTER_LANG !== 'null') ? lngData.complain.reason3 : this.$t('complain.reason3')
        },
      ]
    };
  },
  validations: {
    form: {
      comment: { required },
      radio: { required },
      email: { required, email }
    },
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

    isUserReg() {
      if (!this.user) {
        return true
      }
      else {
        return false
      }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      this.isSending = true;
      const complaintData = this.packComplaintDetailsInFormData();

      const options = {
        method: 'POST',
        url: '/napi/crm-forms/forms/complaint-to-product',
        headers: MULTIPART_FORM_DATA_HEADER,
        data: complaintData
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

    packComplaintDetailsInFormData() {
      const complaintDetails = {
        complaint_reason: this.form.radio,
        comment: this.form.comment,
        product_id: this.componentData.productId2, // productId2 получает свое значение в complain.vue при вызове модалки
        email: this.form.email
      };

      const complaintFormData = new FormData();

      Object.keys(complaintDetails).forEach((key) => {
        complaintFormData.append(key, complaintDetails[key]);
      });

      return complaintFormData;
    },
    closeModal() {
      this.$emit('close');
    },

    loadUserInfoFromLocalStore() {
      if (process.client) {
        return;
      }

      const localEmail = localStorage[localStoreKeys.EMAIL];

      if (localEmail)
        this. form.email = localEmail
    },

    saveUserInfoToLocalStore() {
      if (process.client) {
        localStorage[localStoreKeys.EMAIL] = this.form.email;
      }
    },
    loadUserInfoFromAppStorage() {
      if (this.user) {
        this.form.email = this.user.email;
      }
    },
  },
}
</script>

<style  lang="scss">
.complain-modal {
  &__comment {
    margin: 20px 0 10px;

    textarea {
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
  }

  &__email {
    margin: 20px 0 10px;
  }

  &__wrapper-radio {
    position: relative;

    .grt-radio__control--error ~ .complain-modal__error {
      display: block;
    }
  }

  &__error {
    position: absolute;
    top: -18px;

    display: none;

    font-size: 12px;
    color: $fuchsia;
  }
}

.grt-btn-ok {
  width: 100%;
  box-sizing: border-box;
  margin: 20px 0 0;
}
</style>
