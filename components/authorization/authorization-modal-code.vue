<template>
  <section class="authorization-modal-code">
    <button class="authorization-modal-code__arrow" @click="openModal(type)">
      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.4371 8.10938H3.72386L11.9317 0.984375C12.0629 0.869531 11.9832 0.65625 11.8098 0.65625H9.73558C9.64417 0.65625 9.55745 0.689062 9.48948 0.747656L0.632453 8.43281C0.551333 8.50313 0.486275 8.59006 0.441687 8.68772C0.397099 8.78537 0.374023 8.89147 0.374023 8.99883C0.374023 9.10618 0.397099 9.21228 0.441687 9.30994C0.486275 9.4076 0.551333 9.49453 0.632453 9.56484L9.54105 17.2969C9.5762 17.3273 9.61839 17.3438 9.66292 17.3438H11.8075C11.9809 17.3438 12.0606 17.1281 11.9293 17.0156L3.72386 9.89062H17.4371C17.5403 9.89062 17.6246 9.80625 17.6246 9.70312V8.29688C17.6246 8.19375 17.5403 8.10938 17.4371 8.10938Z"
          fill="black"/>
      </svg>
    </button>
    <authorization-title class="authorization-modal-code__title">
      {{ $t('authorization.enter_code') }}
    </authorization-title>
    <div class="authorization-modal-code__confirm">
      {{ type === 'phone' ? $t('authorization.confirm') : $t('authorization.send_code') }}
    </div>
    <div class="authorization-modal-code__number">
      <span>
        {{ type === 'phone' ? phoneNumber : email }}
      </span>
      <button type="button" @click="onChange">
        {{ type === 'phone' ? $t('authorization.change_number') : $t('authorization.change_mail') }}
      </button>
    </div>
    <div v-if="type === 'phone'" class="authorization-modal-code__suggest">
      {{ $t('authorization.suggest') }}
    </div>
    <div class="authorization-modal-code__pin">
      <input v-for="(item, index) in pinCode"
             :id="'pincode-input-' + index"
             :key="index"
             :class="{
               'code-error': isError,
               'validation-pincode-error': !!isPinCodeValidate & pinCode[index] === ''
             }"
             :value="pinCode[index]"
             inputmode="numeric"
             pattern="[0-9]*"
             type="text"
             @input="handleInput"
             @keydown.delete="deleteInput">
    </div>
    <div
      v-if="isError"
      class="authorization-modal-code__error"
    >
      {{ $t('authorization.error_code') }}
    </div>
    <div class="authorization-modal-code__timer">
      {{ type === 'phone' ? $t('authorization.call_not_received') : $t('authorization.code_not_received') }}
      <span>{{ limitTimeInMinutes }}</span>
      {{ $t('authorization.another_way_connection') }}
    </div>
    <authorization-icons>
      <a href="javascript:void(0)">
        <img
          v-if="componentData.type === 'phone'"
          src="/nimages/icons/common/mail.png"
          @click="openModal('email')"/>
        <img v-else src="/nimages/icons/common/phone.png" @click="openModal('phone')">
      </a>
    </authorization-icons>
  </section>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {ModalBus} from "~/event-bus/modal-bus";
import AuthorizationIcons from "~/components/authorization/authorization-icons";
import AuthorizationTitle from "~/components/authorization/authorization-title";
import checkoutSummaryButton from "~/modules/cart/components/checkout-summary-button";
import {AuthorizationModalBus} from "~/event-bus/authorization-modal-bus";
import localStorageService from "~/utils/service.localStorage";
import {COUNTRY_CODE} from "~/assets/js/const.LocalStorage";

const modalAuth = () => import('./authorization-modal');
const modalChange = () => import("./authorization-modal-change")

export default {
  name: "AuthorizationModalCode",
  components: {AuthorizationIcons, AuthorizationTitle},
  props: {
    componentData: Object
  },
  data() {
    return {
      fullName: this.componentData.fullName,
      timeLimitSec: this.componentData.timeLimitSec,
      guid: this.componentData.guid,
      phoneNumber: this.componentData.phoneNumber,
      email: this.componentData.email,
      pinCode: ['', '', '', ''],
      isPinCodeValidate: null,
      type: this.componentData.type,
      isError: false,
    }
  },
  computed: {
    ...mapState('cart', ['displayedCartTab']),
    limitTimeInMinutes() {
      const minutes = Math.floor(this.timeLimitSec / 60)
      const remainingSeconds = this.timeLimitSec - (minutes * 60)
      return minutes + ':' + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
    },
  },
  mounted() {
    this.initInput()
    this.limitCount()
  },
  methods: {
    ...mapActions({
      GET_CODE: 'auth/GET_CODE',
      UPDATE_USER_PERSONAL_DATA: 'auth/UPDATE_USER_PERSONAL_DATA'
    }),
    ...mapMutations({
      CHANGE_STATUS_ORDER: 'cart/CHANGE_STATUS_ORDER'
    }),
    limitCount() {
      return setTimeout(() => {
        this.timeLimitSec -= 1
        if (this.timeLimitSec !== 0) {
          this.limitCount()
        }
      }, 1000)
    },
    openModal(type) {
      ModalBus.$emit('open', {
        component: modalAuth,
        componentData: {
          fullName: this.fullName,
          email: this.email || null,
          phoneNumber: this.phoneNumber || null,
          type,
          isOrder: this.componentData.isOrder,
        },
        canCloseOnBackdrop: false,
      });
    },
    onChange() {
      this.$emit('close');
      ModalBus.$emit('open', {
        component: modalChange,
        componentData: {
          fullName: this.fullName,
          type: this.type,
          phoneNumber: this.phoneNumber,
          email: this.email,
          guid: this.guid,
          timeLimitSec: this.timeLimitSec,
          isOrder: this.componentData.isOrder,
        },
        canCloseOnBackdrop: false,
      });
    },
    pinCodeComputed() {
      return this.pinCode.reduce((pin, i) => pin + i)
    },
    checkInput(input) {
      return !!input.match('^\\d{1}$')
    },
    getInputId(index) {
      return 'pincode-input-' + index
    },
    pushEmptyInput() {
      const emptyInputId = this.pinCode.findIndex(x => x === '')
      if (emptyInputId !== -1) {
        const nextId = this.getInputId(emptyInputId)
        document.getElementById(nextId).focus()
      }
    },
    deleteInput(event) {
      const id = parseInt(event.target.id[event.target.id.length - 1])
      if (id === 0) {
        return
      }

      this.$set(this.pinCode, id, '')
      this.pushPreviousInput(id)
    },
    pushPreviousInput(id) {
      const nextInput = this.getInputId(id - 1)
      document.getElementById(nextInput).focus()
    },
    resetInput() {
      this.pinCode.forEach((_, i) => {
        this.$set(this.pinCode, i, '')
      })
      this.initInput()
    },
    initInput() {
      const inputId = this.getInputId(0)
      document.getElementById(inputId).focus()
    },
    async handleInput(event) {
      this.isError = false
      const id = parseInt(event.target.id[event.target.id.length - 1])
      const isValid = this.checkInput(event.target.value)

      if (isValid) {
        this.$set(this.pinCode, id, event.target.value)
        if (this.pinCodeComputed().length === this.pinCode.length) {
          await this.sendCode()
        } else {
          this.pushEmptyInput()
        }
      } else {
        this.$set(this.pinCode, id, '')
      }
    },
    async sendCode() {
      if (this.pinCodeComputed().length !== 4) {
        this.isPinCodeValidate = true
        return
      }
      this.isPinCodeValidate = null

      const forms = {
        'email': this.email || null,
        'phone': this.phoneNumber || null,
      }

      try {
        await this.GET_CODE({
          type: this.type === 'phone' ? 'flashcall' : 'email',
          data: {
            guid: this.guid,
            pinCode: this.pinCodeComputed(),
            countryAlpha2: localStorage.getItem('quick_order_alpha2') || localStorage[COUNTRY_CODE],
          }
        })
        this.$emit('close')

        localStorageService.SAVE_USER_INTO_LOCALSTORAGE(forms)
        if (this.componentData.isOrder) {
          if (this.displayedCartTab === 'buy') {
            AuthorizationModalBus.$emit('sendOrder', {
              component: checkoutSummaryButton
            });
          } else {
            this.CHANGE_STATUS_ORDER(true)
          }
        } else {
          window.location.reload()
        }
      } catch {
        this.isError = true
        this.resetInput()
      }
      const splitFullName = this.fullName?.split(" ")
      await this.UPDATE_USER_PERSONAL_DATA({
        firstName: splitFullName ? splitFullName[0] : null,
        lastName: splitFullName ? splitFullName[1] : null,
        countryAlpha2: forms.countryAlpha2?.toString().toLowerCase()
      })
    },
  }
}
</script>

<style lang="scss">
.authorization-modal {
  &-code {
    position: relative;

    padding: 44px 24px 0;

    font-size: 12px;
    line-height: 17px;
    color: $text-grey-2;
    text-align: center;

    &__error {
      color: $coral;
      margin-bottom: 10px;
    }

    &__arrow {
      position: absolute;
      left: -9px;
      top: 3px;

      cursor: pointer;
    }

    &__title,
    &__number,
    &__suggest,
    &__pin {
      margin: 0 0 16px;
    }

    &__number {
      > span {
        color: $text-black;
      }

      > button {
        color: $grt-blue;
        border: 0;

        cursor: pointer;
      }
    }

    &__timer {
      margin: 0 0 24px;

      > span {
        color: $grt-blue;
      }
    }

    &__pin {
      display: flex;
      flex-flow: row;
      justify-content: center;

      .code-error {
        border-color: $coral;
      }

      > input {
        display: block;
        margin: 0 16px 0 0;
        width: 48px;
        height: 48px;

        border: 1px solid $grey-default;
        border-radius: 4px;

        font-size: 30px;
        text-align: center;


        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>
