<template>
  <section class="footer__subscribe subscribe">
    <form class="subscribe__form" @submit.prevent="onSubmit">
      <h3 class="subscribe__label">{{$t('footer.subscribe.message')}}</h3>
      <div class="subscribe__input-wrapper">
        <client-only>
          <InputEmail v-model="email" :v="$v.email" />
        </client-only>
      </div>
      <div class="subscribe__agreement-wrapper">
        <label
          class="grt-checkbox"
          :class="{ 'grt-checkbox--error': $v.agreesWithTerms.$error }"
        >
          <input
            v-model="agreesWithTerms"
            class="grt-checkbox__input"
            type="checkbox"
          />
          <svg
            class="grt-checkbox__icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="grt-checkbox__bg"
              d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2Z"
              stroke="#bebebe"
              fill="none"
            />
            <path
              class="grt-checkbox__checkmark"
              d="M7.13965 10.8596C6.87965 11.1196 6.45965 11.1196 6.19965 10.8596L3.80632 8.46622C3.68148 8.34166 3.61133 8.17256 3.61133 7.99622C3.61133 7.81987 3.68148 7.65077 3.80632 7.52622C4.06632 7.26622 4.48632 7.26622 4.74632 7.52622L6.66632 9.44622L11.253 4.85955C11.513 4.59955 11.933 4.59955 12.193 4.85955C12.453 5.11955 12.453 5.53955 12.193 5.79955L7.13965 10.8596Z"
              fill="none"
            />
            <rect
              class="grt-checkbox__outline"
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="0.5"
              stroke="none"
            />
          </svg>
          <i18n
            path="footer.subscribe.agreement"
            tag="span"
            class="grt-checkbox__label"
          >
            <template #user_agreement>
              <nuxt-link :to="localePath(`/docs/terms-of-use/`)">{{
                $t('footer.subscribe.user_agreement')
              }}</nuxt-link>
            </template>
            <template #policy>
              <nuxt-link :to="localePath(`/docs/privacy-policy/`)">{{
                $t('footer.subscribe.policy')
              }}</nuxt-link>
            </template>
          </i18n>
        </label>
      </div>
      <button class="subscribe__submit-btn grt-btn" type="submit">
        {{ $t("footer.subscribe.subscribe") }}
      </button>
    </form>
  </section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import InputEmail from "@/components/common/input-email";

const mustBeTrue = (val) => val === true;

export default {
  components: {
    InputEmail,
  },
  data() {
    return {
      email: "",
      message: "",
      agreesWithTerms: true,
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$pending || this.$v.$error) {
        return;
      }

      this.$axios
        .post("napi/user/subscribe/", {
          email: this.email,
        })
        .then((response) => {
          this.$toast.show(this.$t("you_are_subscribed"));
          this.email = "";
          this.$v.$reset();
        });
    },
  },

  validations: {
    email: { required, email },
    agreesWithTerms: { mustBeTrue },
  },
};
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.subscribe {
  padding-top: 20px;
  padding-bottom: 30px;

  border-bottom: 1px solid #e7e7e7;

  @media (min-width: 768px) {
    padding-top: 0;
    border-bottom: none;
  }

  @media (min-width: $desktop-mid) {
    padding-top: 35px;
  }

  .subscribe__form {
    display: flex;
    flex-direction: column;
    max-width: 291px;

    @media (min-width: $desktop-mid) {
      align-content: flex-end;
      margin-left: auto;
    }
  }

  .subscribe__input-wrapper {
    width: 100%;
    max-width: 290px;
  }

  .subscribe__input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 18px;

    font-family: $main-font-family;
    font-size: 11px;
    line-height: 1.4;
    color: #717171;

    border: 1px solid #e7e7e7;
    border-radius: 6px;
    background-color: #f9f9f9;

    outline: none;

    &:focus {
      border-color: $grt-blue;
    }
  }

  .subscribe__label {
    margin-bottom: 9px;

    font-weight: 600;
    font-size: 13px;
    line-height: 1.3;
    color: #131313;

    @media (min-width: 768px) {
      margin-bottom: 12px;

      font-size: 15px;
    }
  }

  .subscribe__agreement-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
  }

  .subscribe__agreement-label {
    font-size: 11px;
    line-height: 1.3;
    color: #717171;

    cursor: pointer;
  }
}

.tiny-checkbox {
  position: relative;
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  /* stylelint-disable */
  .tiny-checkbox__input {
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  /* stylelint-enable */
}

.tiny-checkbox__input {
  position: relative;
  z-index: 1;

  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0;
  margin-right: 6px;

  vertical-align: top;

  border: 2px solid #717171;
  border-radius: 3px;
  background-color: #f9f9f9;

  cursor: pointer;

  &:checked {
    border: 2px solid $grt-blue;
    background-color: transparent;
  }
}

.tiny-checkbox__marker {
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 0;

  width: 14px;
  height: 14px;

  background-color: $grt-blue;

  &::before {
    content: "";
    position: relative;
    top: 0;
    left: 4px;

    display: block;
    width: 5px;
    height: 9px;

    border: 2px solid #ffffff;
    border-top: 0;
    border-left: 0;

    transform: rotate(43deg);
  }
}

// TODO: Вынести стили вместе с чекбоксом в отдельный компонент
.grt-checkbox {
  position: relative;
  display: flex;
  align-items: flex-start;

  cursor: pointer;

  .grt-checkbox__label {
    margin-left: 5px;

    font-size: 11px;
    line-height: 1.4;
    color: $text-black;
  }

  .grt-checkbox__input {
    position: absolute;

    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    opacity: 0;

    cursor: pointer;
  }

  .grt-checkbox__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .grt-checkbox__input:checked + .grt-checkbox__icon {
    .grt-checkbox__bg {
      fill: $grt-blue;
    }

    .grt-checkbox__checkmark {
      fill: #ffffff;
    }
  }
}

.grt-checkbox--error {
  .grt-checkbox__input + .grt-checkbox__icon {
    .grt-checkbox__bg {
      stroke: $coral;
    }
  }

  .grt-checkbox__label,
  span,
  a {
    color: $coral;
  }
}
</style>
