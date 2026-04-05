<template>
  <div class="grt-text-input">
    <div
      :class="{ 'grt-text-input__control--error': v.$error }"
      class="grt-text-input__control"
    >
      <div class="grt-text-input__slot">
        <div class="grt-text-input__field">
          <input
            :id="uniqueIDPrefixForEmail"
            v-model.lazy="email"
            :class="{'er-form': v.$error || isInvalidMail || isfieldNoDirty, 'val-form': !v.$invalid && email}"
            :disabled="disabled"
            class="grt-text-input__input"
            type="email"
            @blur="v.$touch()"
          />
          <label
            :class="{ 'grt-text-input__label--focus': email }"
            :for="uniqueIDPrefixForEmail"
            class="grt-text-input__label"
            >{{ $t('login.email') }}<span v-if="isRequired">*</span><slot name="label-suffix"></slot></label
          >
        </div>
      </div>
      <div class="grt-text-input__messages">
        <div class="grt-text-input__message">{{ !v.required ? $t('login.enter_email') : $t('authorization.enter_correct_mail') }}</div>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {getRandomIntFromZeroToTenThounsand} from '@/assets/js/util';

export default {
  props: {
    isInvalidMail: Boolean,
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isfieldNoDirty: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRequired(){
      if (this.$route.name.includes('checkout')){
        return true;
      }
      return this.required;
    },
    email: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      },
    },
    uniqueIDPrefixForEmail() {
      return `${getRandomIntFromZeroToTenThounsand()}-email`;
    }
  }
};
</script>

<style lang="scss">
.grt-text-input__field {
  position: relative;
}

.grt-text-input__input {
  box-sizing: border-box;
  flex: 1 1 auto;
  padding: 12px 14px;
  max-width: 100%;
  min-width: 0;
  width: 100%;

  font-family: $main-font-family;
  color: #7e7e7e;
  font-size: 13px;
  line-height: 18px;

  border-radius: 4px;
  border: 1px solid;
  border-color: #bebebe;
  background-color: #ffffff;

  outline: none;

  &:focus {
    border-color: $grt-blue;
  }

  @media (min-width: 768px) {
    padding: 14px;
  }
}

.grt-text-input__label {
  position: absolute;
  top: 12px;
  left: 15px;

  font-size: 13px;

  transform-origin: top left;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  pointer-events: none;

  @media (min-width: 768px) {
    top: 14px;
  }
}

.grt-text-input__input:focus ~ .grt-text-input__label,
.grt-text-input__label--focus {
  color: #bebebe;

  transform: translateY(-10px) scale(0.85);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;

  @media (min-width: 768px) {
    transform: translateY(-12px) scale(0.85);
  }
}

.grt-text-input__messages {
  min-height: 18px;
  display: flex;
}

.grt-text-input__message {
  display: none;
  margin-top: 3px;
  margin-left: 15px;

  font-size: 11px;
  line-height: 1.4;
  color: $coral;
}

.grt-text-input__control--error {
  .grt-text-input__message {
    display: block;
  }

  .grt-text-input__field {
    .grt-text-input__input {
      border-color: $coral;
    }

    .grt-text-input__label {
      color: $coral;
    }
  }
}

.er-form {
  border-color: $coral;
}

.val-form {
  border-color: $azure4;
}
</style>
