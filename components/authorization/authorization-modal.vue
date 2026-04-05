<template>
  <section class="authorization-modal">
    <div class="authorization-modal__head">
      <authorization-title>{{ $t('authorization.title') }}</authorization-title>
      <img v-if="componentData.type==='phone'" src="/nimages/icons/common/phone.png"/>
      <img v-else src="/nimages/icons/common/mail.png"/>
    </div>
    <GrtTelInput
      v-if="componentData.type==='phone'"
      v-model="form.phone"
      :v="$v.form.phone"
      class="authorization-modal__phone"
    />
    <input-email
      v-else
      v-model="form.email"
      :required="true"
      :v="$v.form.email"
      class="authorization-modal__mail"
    />
    <button
      class="grt-btn grt-btn--filled grt-btn--block authorization-modal__button"
      type="button"
      @click="openModalCode"
    >
      {{ $t('authorization.send') }}
    </button>
    <authorization-text-choice></authorization-text-choice>
    <div class="authorization-modal__icons">
      <authorization-icons>
        <a href="javascript:void(0)">
          <img
            v-if="componentData.type === 'phone'"
            src="/nimages/icons/common/mail.png"
            @click="openModal"/>
          <img v-else src="/nimages/icons/common/phone.png" @click="openModal">
        </a>
      </authorization-icons>
    </div>
    <div class="authorization-modal__text">
      {{ $t('authorization.will_send_code') }}
    </div>
  </section>
</template>

<script>
import {mapActions} from "vuex";
import {email, helpers, minLength, required} from "vuelidate/lib/validators";
import {ModalBus} from "~/event-bus/modal-bus";
import {validateOnLetters} from "~/assets/js/customValidation";

const modalCode = () => import("./authorization-modal-code");
const modalAuth = () => import('./authorization-modal');

export default {
  name: "AuthorizationModal",
  props: {
    componentData: Object,
  },
  validations: {
    form: {
      email: {required, email},
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
    }
  },
  data() {
    return {
      fullName: this.componentData.fullName,
      form: {
        phone: this.componentData.phone,
        email: this.componentData.email
      },
    }
  },
  methods: {
    ...mapActions({POST_VERIFICATION: 'auth/POST_VERIFICATION'}),
    openModal() {
      ModalBus.$emit('open', {
        component: modalAuth,
        componentData: {
          fullName: this.fullName,
          type: this.componentData.type === 'phone' ? 'email' : 'phone',
          phone: this.form.phone,
          email: this.form.email,
          isOrder: this.componentData.isOrder,
        },
        canCloseOnBackdrop: false,
      });
    },
    async openModalCode() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form[this.componentData.type].$error) {
        return;
      }

      const params = this.componentData.type === 'phone' ? {phoneNumber: this.form.phone} : {email: this.form.email}
      const result = await this.POST_VERIFICATION({
        type: this.componentData.type === 'phone' ? 'flashcall' : 'email',
        data: params
      })
      ModalBus.$emit('open', {
        component: modalCode,
        componentData: {
          fullName: this.fullName,
          phoneNumber: this.form.phone,
          email: this.form.email,
          guid: result.verificationGuid,
          timeLimitSec: result.timeLimitSec,
          type: this.componentData.type,
          isOrder: this.componentData.isOrder,
        },
        canCloseOnBackdrop: false,
      });
    }
  }
}
</script>

<style lang="scss">
.authorization-modal {
  padding: 44px 24px 0;

  text-align: center;

  &__head {
    display: flex;
    margin: 0 auto 16px;
    align-items: center;
    justify-content: center;

    &-title {
      margin: 0 12px 0 0;
    }
  }

  &__phone {
    margin: 0 0 24px;

    .vue-tel-input {
      height: 48px;
    }

    .grt-text-input__messages {
      position: absolute;
    }
  }

  &__button {
    margin: 0 0 16px;

    border-radius: 4px;
  }

  &__text-choice {
    margin: 0 0 24px;

    font-size: 13px;
    line-height: 19px;
  }

  &__text {
    font-size: 12px;
    line-height: 17px;
  }

  .authorization-icons {
    margin: 0 0 24px;
  }
}
</style>
