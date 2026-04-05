<template>
  <section class="authorization-modal-change">
    <button class="authorization-modal__arrow" @click="openModalCode(false)">
      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.4371 8.10938H3.72386L11.9317 0.984375C12.0629 0.869531 11.9832 0.65625 11.8098 0.65625H9.73558C9.64417 0.65625 9.55745 0.689062 9.48948 0.747656L0.632453 8.43281C0.551333 8.50313 0.486275 8.59006 0.441687 8.68772C0.397099 8.78537 0.374023 8.89147 0.374023 8.99883C0.374023 9.10618 0.397099 9.21228 0.441687 9.30994C0.486275 9.4076 0.551333 9.49453 0.632453 9.56484L9.54105 17.2969C9.5762 17.3273 9.61839 17.3438 9.66292 17.3438H11.8075C11.9809 17.3438 12.0606 17.1281 11.9293 17.0156L3.72386 9.89062H17.4371C17.5403 9.89062 17.6246 9.80625 17.6246 9.70312V8.29688C17.6246 8.19375 17.5403 8.10938 17.4371 8.10938Z"
          fill="black"/>
      </svg>
      <slot name="arrow"></slot>
    </button>
    <authorization-title>
      {{
        componentData.type === 'phone' ? $t('authorization.enter_correct_phone') : $t('authorization.enter_correct_mail')
      }}
    </authorization-title>
    <grt-tel-input
      v-if="componentData.type === 'phone'"
      v-model="form.phone"
      :v="$v.form.phone"
    ></grt-tel-input>
    <input-email
      v-else
      v-model="form.email"
      :required="true"
      :v="$v.form.email"
    />
    <button
      class="grt-btn grt-btn--filled grt-btn--block authorization-modal__button"
      type="button"
      @click="openModalCode(true)"
    >
      {{ $t('authorization.get_code') }}
    </button>
  </section>
</template>

<script>
import {email, helpers, minLength, required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import AuthorizationTitle from "~/components/authorization/authorization-title";
import GrtTelInput from "~/components/grt-tel-input";
import {ModalBus} from "~/event-bus/modal-bus";
import {validateOnLetters} from "~/assets/js/customValidation";

const modalCode = () => import('./authorization-modal-code')

export default {
  name: "AuthorizationModalChange",
  components: {AuthorizationTitle, GrtTelInput},
  props: {
    componentData: Object
  },
  validations: {
    form: {
      email: {required, email},
      minLength: minLength(6),
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      }
    }
  },
  data() {
    return {
      fullName: this.componentData.fullName,
      form: {
        email: null,
        phone: null,
      }
    }
  },
  methods: {
    ...mapActions({POST_VERIFICATION: 'auth/POST_VERIFICATION'}),
    async openModalCode(withError) {
      let componentData
      if (withError) {
        this.$v.form.$touch();

        if (this.$v.form.$pending || this.$v.form[this.componentData.type].$error) {
          return;
        }

        const data = this.componentData.type === 'phone' ? {phoneNumber: this.form.phone} : {email: this.form.email}
        const result = await this.POST_VERIFICATION({
          type: this.componentData.type === 'phone' ? 'flashcall' : 'email',
          data
        })
        componentData = {
          fullName: this.fullName,
          type: this.componentData.type,
          phoneNumber: this.form.phone,
          email: this.form.email,
          guid: result.verificationGuid,
          timeLimitSec: result.timeLimitSec,
          isOrder: this.componentData.isOrder,
        }
      } else {
        componentData = {
          fullName: this.fullName,
          type: this.componentData.type,
          phoneNumber: this.componentData.phoneNumber,
          email: this.componentData.email,
          guid: this.componentData.verificationGuid,
          timeLimitSec: this.componentData.timeLimitSec,
          isOrder: this.componentData.isOrder,
        }
      }
      this.$emit('close');
      ModalBus.$emit('open', {
        component: modalCode,
        componentData,
        canCloseOnBackdrop: false,
      });
    }
  }
}
</script>

<style lang="scss">
.authorization-modal-change {
  position: relative;

  padding: 44px 24px 0;

  .authorization-modal__arrow {
    position: absolute;
    left: -9px;
    top: 3px;

    cursor: pointer;
  }

  .authorization-modal__head-title {
    margin: 0 0 16px;

    text-align: center;
  }

  .grt-text-input {
    margin: 0 0 24px;
  }

  .grt-text-input__messages {
    position: absolute;
  }
}
</style>
