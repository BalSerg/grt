<template>
  <form novalidate @submit.prevent="submit">
    <div
      class="entry-point__password-hint entry-point__password-hint--column restore-password__password-hint"
    >
      <h3 class="entry-point__password-hint-message">
        {{ $t('login.password_requirement.new_password_message') }}
      </h3>
      <ul class="entry-point__password-hint-list">
        <li class="entry-point__password-hint-item">
          <input
            class="entry-point__password-hint-input"
            type="checkbox"
            :checked="$v.form.password.minLength && $v.form.password.required"
          />
          <label class="entry-point__password-hint-label">{{
            $tc('login.password_requirement.min_length', passwordMinLength)
          }}</label>
        </li>
        <li class="entry-point__password-hint-item">
          <input
            class="entry-point__password-hint-input"
            type="checkbox"
            :checked="$v.form.password.matchPassword && $v.form.password.required"
          />
          <label class="entry-point__password-hint-label">{{
            $t('login.password_requirement.letters')
          }}</label>
        </li>
        <li class="entry-point__password-hint-item">
          <input
            class="entry-point__password-hint-input"
            type="checkbox"
            :checked="$v.form.password.hasFigures && $v.form.password.required"
          />
          <label class="entry-point__password-hint-label">{{
            $t('login.password_requirement.figures')
          }}</label>
        </li>
      </ul>
    </div>

    <div class="entry-point__password restore-password__password">
      <InputPasswordNew
        v-model.lazy="form.password"
        :v="$v.form.password"
        :disabled="isDisabled"
      />
    </div>

    <button
      class="grt-btn grt-btn--filled"
      type="submit"
      :disabled="isDisabled"
    >
      {{ $t('login.save') }}
    </button>
  </form>
</template>

<script>
import { required, minLength, alphaNum } from 'vuelidate/lib/validators';
import InputPasswordNew from '@/components/common/input-password-new';
import { PasswordRequirements } from '@/assets/js/const';

export default {
  components: {
    InputPasswordNew
  },
  data() {
    return {
      form: {
        password: ''
      },
      message: '',
      passwordMinLength: PasswordRequirements.MIN_LENGTH,
      isDisabled: false
    };
  },

  validations: {
    form: {
      password: {
        required,
        minLength: minLength(PasswordRequirements.MIN_LENGTH),
        hasFigures(password) {
          return PasswordRequirements.HAS_FIGURES_REGEXP.test(password);
        },
        matchPassword(password) {
          const result = PasswordRequirements.REGEXP.test(password);
          return result;
        }
      }
    }
  },

  methods: {
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      this.isDisabled = true;
      const newPassword = Object.assign({}, this.$route.query, {
        password: this.form.password
      });

      this.$axios
        .post('napi/auth/restore/change', newPassword)
        .then(response => {
          this.$emit('onSuccessPasswordChange');
        })
        .finally(() => {
          this.isDisabled = false;
        });
    }
  }
};
</script>

<style lang="scss">
.entry-point__password-hint--column {
  flex-direction: column;

  .entry-point__password-hint-message {
    margin-bottom: 12px;
  }
}
</style>
