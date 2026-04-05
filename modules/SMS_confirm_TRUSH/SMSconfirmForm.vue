<template>
  <div class="confirm">
    <div v-show="result === 0" class="confirm__title">
      {{ $t('confirm_form.enter_the_code_from_sms') }}
    </div>

    <div v-show="!!result" class="confirm__notice">
      {{ result > 1 ? $t('confirm_form.expired_validation') : $t('confirm_form.wrong_code') }}
    </div>

    <div class="confirm__forms">
      <div v-for="(item, ind) of $v.numerics.$each.$iter" :key="ind">
        <input :id="'input_' + ind"
               v-model.number="item.val.$model"
               :class="{'validation-error': (!item.val.integer && !item.val.exactNumberLength) || isDirty}"
               max="1"
               type="text"
               @click="nextAttempt"
               @keyup="jumpToNextInput"
        />
      </div>
    </div>


    <div v-show="result === 0">
      <div class="confirm__notice">
        {{ $t('confirm_form.you_have_been_sent_an_sms') }} {{ phone }}. <span
        @click="toChangeNumber">{{ $t('confirm_form.to_change_number') }}</span>
      </div>
      <div class="confirm__btn" @click="sendCode">
        {{ $t('confirm_form.send') }}
      </div>
    </div>
    <div class="confirm__resend" @click="reRequestForTakeCode">
      {{
        countTime > 0 ?
          ($t('confirm_form.resend_code_via') + ' ' + minSecConverter(countTime)) :
          $t('confirm_form.resend_code')
      }}
    </div>
  </div>
</template>

<script>
import {integer, required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import {exactArrayLength, exactNumberLength} from './validators'
import localStorageService from '@/utils/service.localStorage'
import {ModalBus} from "@/event-bus/modal-bus"

const userRegistrationForm = () => import('./userRegistrationForm')

export default {
  props: {
    componentData: {
      type: Object
    }
  },
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
      GET_COMPONENT_DATA: 'auth/GET_COMPONENT_DATA'
    })
  },
  methods: {
    ...mapActions({
      INIT_SMS_VERIFICATION: 'auth/INIT_SMS_VERIFICATION',
      POST_SMS_CODE: 'auth/POST_SMS_CODE'
    }),
    nextAttempt() {
      this.isDirty = false
    },
    jumpToNextInput(ev) {
      this.$v.$touch()
      const currentIdIndex = +ev.target.attributes.id.value.split('_')[1]   // from input_0

      if (currentIdIndex < (this.numerics.length - 1) && !this.$v.numerics.$each[currentIdIndex].$invalid) {
        const nextId = 'input_' + (currentIdIndex + 1)
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
        .then(({componentData, orderId, result}) => {
          if (orderId != null)
            this.$router.push(this.localePath(`${componentData.positiveAction.routerPushTo}/${orderId}/`))
          if (result === 'expired_validation') {
            this.result = 1
            this.countTime = -5
          }
          if (result === 'wrong_code') {
            this.result = -1
            this.countTime = -5
          }
        })
    },
    counterDown() {
      if (this.countTime > 0)
        return setTimeout(() => {
          --this.countTime
          this.counterDown()
        }, 1000)
    },
    async reRequestForTakeCode() {
      if (this.countTime < 1 || !!this.result) {

        await this.INIT_SMS_VERIFICATION(this.GET_COMPONENT_DATA)
          .then(({componentData, orderId}) => {
            if (componentData != null) {
              this.$router.push(this.localePath(`${componentData.positiveAction.routerPushTo}/${orderId}/`))
            }
          })
      }
    },
    toChangeNumber() {
      ModalBus.$emit('open', {
        component: userRegistrationForm,
        componentData: this.componentData
      })
    },
    minSecConverter: val => {
      const min = Math.floor(val / 60)
      return `${min} : ${val - min * 60}`
    }
  },
  mounted() {
    const userData = localStorageService.GET_USER_FROM_LOCALSTORAGE()
    this.phone = userData.phone

    this.countTime = this.componentData.timeLimitSec
    document.getElementById('input_0').focus()
    this.counterDown()
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  width: 100%;
  max-width: 320px;
  min-height: 456px;
  height: fit-content;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  background: $white;

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
