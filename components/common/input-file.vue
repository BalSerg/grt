<template>
  <div class="file-input" :class="{'file-input-error': v && v.$error}">
    <div
      v-if="isHideSelectFileBlock"
      class="file-input__remove"
      :class="{'error-btn': isErrorBtn}"
      @click.stop="clearFileHandler">
    </div>
    <label
      ref="textLabel"
      class="file-input__label"
      for="inputfile"
    >
      <span
        v-if="isMismatchFormat"
        class="message-error-format"
      >
        {{ errorFileFormat }}
      </span>
      <span
        v-if="isOverSize"
        class="message-error-size"
      >
        {{ $t('form_supplier.error_size') }}
      </span>
      <div
        v-if="!isOverSize && !isMismatchFormat"
        class="name-loaded-file"
      >
        {{selectedFileName}}
      </div>
      <div
        v-if="!isHideSelectFileBlock"
        >
        <span class="color-text">{{ $t("form_supplier.attach_file") }}</span>
        <span>{{ $t("form_supplier.file_size") }}</span>
        <span v-if="required">*</span>
        <span class="file-input__message">{{$t('form_supplier.attach_file')}}</span>
      </div>
      <input
        id="inputfile"
        ref="inputfile"
        type="file"
        name="attachment"
        class="file-input__field"
        :required="required"
        @change="handleFileChange"
      >
    </label>
  </div>
</template>

<script>
const MAX_SIZE_FILE = 1024*1024*30;// value in bytes

export default {
  props: {
    v: {
      type: Object,
      required: false
    },
    value: {
      required: true,
      default: '',
    },
    required: {
      type: Boolean,
      default: false
    },
    allowedExtensions: Array,
    errorFileFormat: String,
  },
  data() {
    return {
      isHideSelectFileBlock: false,
      isOverSize: false,
      isMismatchFormat: false,
      isErrorBtn: false,
    };
  },
  computed: {
    selectedFileName() {
      if (this.file) {
        return this.file.name;
      }
      return '';
    },
    file: {
      get() {
        return this.value;
      },
      set(newFile) {
        this.$emit('input', newFile);
      }
    }
  },
  methods: {
    handleFileChange(e) {
      this.setDefaultValues();
      const selectedFile = e.target.files[0];
      if (!selectedFile) {

        // Если закрыто окно выбора файла, при ранее выбранном файле , то не показываем значение по умолчанию
        this.isHideSelectFileBlock = true;

        return;
      }
      this.isHideSelectFileBlock = true;
      this.validateFile(selectedFile);
    },

    // возврат к начальным значениям
    setDefaultValues() {
        this.isOverSize= false,
        this.isMismatchFormat= false,
        this.isHideSelectFileBlock= false,
        this.isErrorBtn= false
    },
    validateFile(selectedFile) {
      // Проверка
        const extension = selectedFile.name.split('.').pop();
        if (selectedFile.size > MAX_SIZE_FILE) {
          this.isOverSize = true;// Есть ошибка первышения размера
          this.isErrorBtn = true;
          return;
        }
        if (!(this.allowedExtensions.includes(extension))) {
          this.isMismatchFormat = true;// Есть ошибка несоответствия формата
          this.isErrorBtn = true;
          return;
        }
        this.file = selectedFile;
    },
    clearFileHandler() {
      this.setDefaultValues();
      this.file = null;
      this.$refs.inputfile.value=null;
    },
  },
}
</script>

<style lang="scss">
.file-input {
  position: relative;

  display: block;
  height: 36px;

  border: 0;
  background-color: $white;

  &__field {
    position: absolute;
    z-index: -1;

    height: 1px;
    width: 1px;
    padding: 0;

    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  &__label {
    display: inline-block;

    color: $text-grey;

    cursor: pointer;

    .default {
      cursor: pointer;
    }

    .color-text {
      color: $grt-blue;
    }

    > * {
      display: block;
    }

    .name-loaded-file {
      /* For Firefox */
      white-space: normal;
      word-break: break-all;
      /* For Chrome and IE */
      word-wrap: break-word;
    }

    .message-error-format,
    .message-error-size {
      color: $coral;
    }

    .file-input__message {
      display: none;
    }
  }

  &__remove {
    position: absolute;
    left: 0;
    top: 0;

    width: 20px;
    height: 20px;
    overflow: hidden;

    cursor: pointer;

    &::after,
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      height: 2px;
      width: 80%;
      margin: auto;

      background: $azure;
      content: "";
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }

    &.error-btn {
      &::after,
      &::before {
        background: $coral;
      }
    }

    & + .file-input__label {
      margin: 0 0 0 25px;
    }
  }

  &.file-input-error {
    .file-input__message {
      display: block;

      font-size: 12px;
      color: $fuchsia;
    }
  }
}

.grt-tel-input {
  .vti__dropdown-item {
    color: $text-grey;
  }

  .vti__country-code {
    position: static;

    height: auto;
    width: auto;

    clip-path: none;
  }
}
</style>
