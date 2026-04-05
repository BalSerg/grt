<template>
  <div class="confirm">
    <button-close class="close-btn" @click.native="close"/>

    <div class="confirm__title">
      {{ $t('confirm_form.enter_the_code_from_sms') }}
    </div>

    <div class="confirm__forms">
      <div v-for="(item, ind) of $v.numerics.$each.$iter" :key="ind">
        <input :id="'input_' + ind" v-model.number="item.val.$model" type="text"
               inputmode="numeric"
               pattern="[0-9]*"
               max="1"
               :class="{'validation-error': (!item.val.integer && !item.val.exactNumberLength) || isDirty}"
               @keyup="jumpToNextInput"
               @click="nextAttempt"
        />
      </div>
    </div>

    <div class="confirm__notice">
      {{ $t('confirm_form.you_have_been_sent_an_sms') }} {{ phone }}.
      <span @click="toChangeNumber">
          {{ $t('confirm_form.to_change_number') }}
      </span>
    </div>

    <div v-if="result < 1" class="confirm__btn" @click="sendCode">
      {{ $t('confirm_form.send') }}
    </div>

    <div v-if="result !== 0" class="confirm__error">
      {{ result > 0 ? $t('confirm_form.expired_validation') : $t('confirm_form.wrong_code') }}
    </div>

    <div class="confirm__resend" @click="reRequestForTakeCode">
      {{ reRequestTitle }}
    </div>
  </div>
</template>

<script>
import {integer, required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {exactArrayLength, exactNumberLength} from './validators'
import localStorageService from '@/utils/service.localStorage'
import ButtonClose from '@/components/common/button-close'
import PushOrderStatusMx from '@/mixins/push-order-status-mx'

const userRegistrationForm = () => import('./userRegistrationForm')

export default {
  components: {
    ButtonClose
  },
  mixins: [PushOrderStatusMx],
  data: () => ({
    numerics: [
      {val: null},
      {val: null},
      {val: null},
      {val: null}
    ],
    phone: '+7 999 999 99 99',
    countTime: 0,
    isDirty: false,
    result: 0
  }),
  validations: {
    numerics: {
      required,
      exactArrayLength: exactArrayLength(4),
      $each: {
        val: {
          required,
          integer,
          exactNumberLength: exactNumberLength(1)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      GET_TIME_LIMIT_SEC: 'auth/GET_TIME_LIMIT_SEC',
      GET_TARGET_DATA: 'tech/GET_TARGET_DATA'
    }),
    reRequestTitle() {
      return (this.$t('confirm_form.resend_code_via') + ' ' + this.minSecConverter(this.countTime))
    }
  },
  methods: {
    ...mapActions({
      INIT_SMS_VERIFICATION: 'auth/INIT_SMS_VERIFICATION',
      POST_SMS_CODE: 'auth/POST_SMS_CODE'
    }),
    ...mapMutations({
      SET_MODAL_COMPONENT_NAME: 'tech/SET_MODAL_COMPONENT_NAME'
    }),
    nextAttempt(ev) {
      const currentIdIndex = +ev.target.attributes.id.value.split('_')[1]   // from input_0
      this.numerics[currentIdIndex].val = ''
      this.isDirty = false
    },
    jumpToNextInput(ev) {
      this.$v.$touch()
      const currentIdIndex = +ev.target.attributes.id.value.split('_')[1]   // from input_0

      if (currentIdIndex < (this.numerics.length - 1) && !this.$v.numerics.$each[currentIdIndex].$invalid) {
        const nextId = 'input_' + (currentIdIndex + 1)
        this.numerics[currentIdIndex + 1].val = ''
        document.getElementById(nextId).focus()
      }

      if ((currentIdIndex === (this.numerics.length - 1)) && !this.$v.numerics.$invalid)
        this.sendCode()
    },
    async sendCode() {
      this.$v.$touch()
      if (!this.$v.numerics.$dirty || this.$v.numerics.$invalid) {
        this.isDirty = true
        return
      }

      const pinCode = this.numerics.reduce((total, item) => total + item.val, '')
      await this.POST_SMS_CODE(pinCode)
        .then(({result, validationResponse}) => {
          if (result.orderId != null) {
            this.pushToOrderStatus(result)
            this.SET_MODAL_COMPONENT_NAME('')
            return
          }
          if (validationResponse === 'expired_validation')
            this.result = 1
          if (validationResponse === 'wrong_code')
            this.result = -1

          this.numerics.forEach(item => item.val = null)
          document.getElementById('input_0').focus()
        })
    },
    counterDown() {
      if (this.countTime > 0)
        return setTimeout(() => {
          --this.countTime
          this.counterDown()
        }, 1000)
    },
    reRequestForTakeCode() {
      if (this.countTime > 0)
        return

      this.numerics.forEach(item => item.val = null)
      this.INIT_SMS_VERIFICATION()
        .then(({orderId, result}) => {
          if (orderId == null) {
            this.runComponent()
          } else {
            this.$router.push(this.localePath(`${this.GET_TARGET_DATA.routerPushTo}/${orderId}/`))
            this.SET_MODAL_COMPONENT_NAME('')
          }
        })
    },
    toChangeNumber() {
      this.SET_MODAL_COMPONENT_NAME('userRegistrationForm')
    },
    minSecConverter: val => {
      const min = Math.floor(val / 60)
      return `${min} : ${val - min * 60}`
    },
    runComponent() {
      this.$nextTick(() => {
        this.phone = localStorageService.GET_USER_FROM_LOCALSTORAGE().phone
        this.result = 0
        this.countTime = this.GET_TIME_LIMIT_SEC
        document.getElementById('input_0').focus()
        this.counterDown()
      })
    },
    close() {
      this.SET_MODAL_COMPONENT_NAME('')
    }
  },
  mounted() {
    this.runComponent()
  },
}
</script>

<style scoped lang="scss">
.confirm {
  position: relative;
  width: 100%;
  max-width: 320px;
  min-height: 456px;
  height: fit-content;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  background: $white;


  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__title {
    margin-top: 48px;
    font-weight: 600;
    font-size: 23px;
    line-height: 150%;
    color: $text-black;
  }

  &__forms {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 240px;
    margin-top: 32px;

    input {
      width: 48px;
      height: 48px;
      border: 1px solid $grey-default;
      box-sizing: border-box;
      border-radius: 4px;

      text-align: center;
      font-size: 33px;
      font-weight: 300;
    }
  }

  &__notice {
    width: 272px;
    margin-top: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    color: $text-grey-2;

    text-align: center;

    span {
      color: $grt-blue;
      cursor: pointer;
    }
  }

  &__btn {
    width: 288px;
    height: 48px;
    margin-top: 32px;
    background: $grt-blue;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 130%;
    color: $white;
    cursor: pointer;
  }

  &__error {
    margin-top: 32px;
    color: $coral;
  }

  &__resend {
    width: 240px;
    margin-top: 32px;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;

    text-align: center;
    color: $text-grey-2;
    cursor: pointer;
  }

  &__login {
    width: 240px;
    height: 18px;
    margin-top: 32px;

    text-align: center;
    color: $grt-blue;
    cursor: pointer;
  }
}

.validation-error {
  border-color: $coral !important;
}
</style>
