<template>
  <div class="grt-text-input">
    <div class="grt-text-input__control" :class="{'grt-text-input__control--error': v.$error}">
      <div class="grt-text-input__slot">
        <div class="grt-text-input__field">
          <textarea
            ref="commentInput"
            v-model="text"
            :name="name"
            class="grt-text-input__textarea"
            :placeholder="placeholder"
            :required="required"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: false
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: '',
    error_message: '',
    isLabelVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isError: false,
      isFocus: false,
    }
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
        this.isFocus = !!this.text;
      }
    },
  },
}
</script>

<style lang="scss">
.grt-text-input {
  &__textarea {
    resize: none;
  }

  .grt-text-input__control--error {
    .grt-text-input__textarea {
      border-color: $fuchsia;

      &::placeholder {
        color: $fuchsia;
      }
    }
  }
}
</style>
