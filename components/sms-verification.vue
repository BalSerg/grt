<template>
  <div class="sms-verification">

    <div class="sms-verification__title">
      {{ $t('confirm_form.enter_the_code_from_sms') }}
    </div>

    <div class="sms-verification__pin">
      <input v-for="(item, index) in pinCode"
             :id="'pincode-input-' + index" :key="index" type="text"
             inputmode="numeric"
             pattern="[0-9]*"
             :value="pinCode[index]"
             :class="{'validation-pincode-error': !!isPinCodeValidate & pinCode[index] === ''}"
             @keydown.delete="deleteInput"
             @input="handleInput">
    </div>

    <div class="sms-verification__notice">
      {{ $t('confirm_form.you_have_been_sent_an_sms') }} {{ verificationData['phoneNumber'] }}.
      <span @click="changeNumber">
          {{ $t('confirm_form.to_change_number') }}
      </span>
    </div>

    <div class="sms-verification__btn" @click="sendCode">
      {{ $t('confirm_form.send') }}
    </div>

    <div v-if="validationSuccess === false" class="sms-verification__error">
      {{validationExpired === true ? $t('confirm_form.expired_validation') : $t('confirm_form.wrong_code')}}
    </div>

    <div class="sms-verification__resend" @click="reRequestCode">
      {{ resendTitle }}
    </div>

  </div>
</template>

<script>

import {SmsVerificationBus} from "@/event-bus/sms-verification-bus";
import RequestUserVerification from '@/mixins/request-user-verification-mx';


export default {
  name: "SmsVerification",
  mixins: [RequestUserVerification],
  props: {
    componentData: Object
  },
  data() {
    return {
      pinCode: ['', '', '', ''],
      validationSuccess: null,
      validationExpired: null,
      isPinCodeValidate: null,
      guid: this.componentData.guid,
      timeLimitSec: this.componentData.timeLimitSec,
      verificationData: this.componentData.verificationData,
    }
  },
  computed: {
    resendTitle() {
      if (this.timeLimitSec === 0) {
        return this.$t('confirm_form.resend_code')
      }
      return this.$t('confirm_form.resend_code_via') + ': ' + this.limitTimeInMinutes
    },
    limitTimeInMinutes() {
      const minutes = Math.floor(this.timeLimitSec / 60)
      const remainingSeconds = this.timeLimitSec - (minutes * 60)

      return minutes + ':' + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
    },
    pinCodeComputed() {
      return this.pinCode.reduce((pin, i) => {return pin + i})
    }
  },
  mounted() {
    this.initInput()
    this.limitCount()
  },
  methods: {
    limitCount() {
      return setTimeout(() => {
        this.timeLimitSec -= 1
        if (this.timeLimitSec !== 0) {
          this.limitCount()
        }
      }, 1000)
    },
    handleInput(event) {
      const id = parseInt(event.target.id[event.target.id.length - 1])
      const isValid = this.checkInput(event.target.value)

      if (isValid) {
        this.$set(this.pinCode, id, event.target.value)
        if (this.pinCodeComputed.length === this.pinCode.length) {
          this.sendCode()
        } else {
          this.pushEmptyInput()
        }
      } else {
        this.$set(this.pinCode, id, '')
      }
    },
    initInput() {
      const inputId = this.getInputId(0)
      document.getElementById(inputId).focus()
    },
    resetInput() {
      this.pinCode.forEach((_, i) => {
        this.$set(this.pinCode, i, '')
      })
      this.initInput()
    },
    deleteInput(event) {
      const id = parseInt(event.target.id[event.target.id.length - 1])
      if (id === 0) {
        return
      }

      this.$set(this.pinCode, id, '')
      this.pushPreviousInput(id)
    },
    checkInput(input) {
      return !!input.match('^\\d{1}$')
    },
    pushPreviousInput(id) {
      const nextInput = this.getInputId(id - 1)
      document.getElementById(nextInput).focus()
    },
    pushEmptyInput() {
      const emptyInputId = this.pinCode.findIndex(x => x === '')
      if (emptyInputId !== -1) {
        const nextId = this.getInputId(emptyInputId)
        document.getElementById(nextId).focus()
      }
    },
    async sendCode() {
      if (this.pinCodeComputed.length !== 4) {
        this.isPinCodeValidate = true
        return
      }
      this.isPinCodeValidate = null

      const { result } = await this.$axios.$post('/napi/auth2/verification/validation', { guid: this.guid, pinCode: this.pinCodeComputed})
      if (!result.successfulValidation) {
        this.validationSuccess = result.successfulValidation
        this.validationExpired = result.expiredValidation
        this.resetInput()
      } else {
        this.$emit('close')
        SmsVerificationBus.$emit('validationSuccess')
      }
    },
    changeNumber() {
      this.$emit('close')
      SmsVerificationBus.$emit('changeNumber')
    },
    async reRequestCode() {
      if (this.timeLimitSec === 0) {
        const {guid, timeLimitSec} = await this.requestUserVerification(this.verificationData)
        this.guid = guid
        this.timeLimitSec = timeLimitSec
        this.limitCount()
      }
    },
    getInputId(index) {
      return 'pincode-input-' + index
    }
  }
}
</script>

<style scoped lang="scss">

.sms-verification {
  position: relative;
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

  &__pin {
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

  &__error {
    margin-top: 32px;
    color: $coral;
  }
}

.validation-pincode-error {
  border-color: $coral !important;
}
</style>
