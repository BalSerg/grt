<template>
  <div class="custom-select-input">
    <div class="select-input">
      <div
        class="select-input__placeholder"
        :class="{'expanded': isExpanded}"
        @click="isExpanded = !isExpanded"
      >
        {{defaultOption}}
      </div>
      <div v-show="isExpanded" class="select-input__options">
        <input v-model="query" type="text" :placeholder="$t('account.search')">
        <div class="select-input__wrapper">
          <div
            v-for="(option, idx) in filteredOptions"
            :key="idx"
            class="select-input__option"
            @click="selectOption(option)"
          >
            {{option}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selected: String
  },
  data() {
    return {
      isExpanded: false,
      query: ''
    }
  },
  computed: {
    defaultOption() {
      return this.selected ? this.selected : this.options[0];
    },
    filteredOptions() {
      const filteredArray = this.options.filter(x => {
        if(!this.query) return x;
        return x.toLowerCase().includes(this.query.toLowerCase());
      });
      return filteredArray;
    }
  },
  methods: {
    selectOption(opt){
      this.$emit('onSelect', opt);
      this.query = '';
      this.isExpanded = false;
    }
  }
}
</script>

<style lang="scss">
.custom-select-input {
  padding-bottom: 18px;

  & .select-input {
    position: relative;
    display: flex;
    height: 44px;
    border-radius: 4px;
    border: 1px solid $mid-grey-ui;

    &__placeholder {
      cursor: pointer;
      padding: 12px 24px 14px 12px;
      flex-grow: 1;

      &::after {
        position: absolute;
        content: "";
        width: 24px;
        height: 24px;
        top: calc(50% - 12px);
        right: 12px;
        background-repeat: no-repeat;
        transition: 200ms;
        background-position: 50% 50%;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.719 0H15.96a.377.377 0 0 0-.302.155L9 9.333 2.341.155A.376.376 0 0 0 2.04 0H.281A.188.188 0 0 0 .13.298L8.393 11.69c.3.412.914.412 1.212 0L17.869.298a.187.187 0 0 0-.15-.298Z' fill='%23C4C4C4'/%3e%3c/svg%3e");
      }

      &.expanded {
        &::after {
          transform: scale(-1);
        }
      }
    }

    &__wrapper {
      max-height: 200px;
      overflow-y: auto;
      padding: 6px 0;
      box-sizing: border-box;
    }

    &__options {
      position: absolute;
      top: calc(100% + 1px);
      left: 0;
      right: 0;
      background-color: white;
      z-index: 2;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      input[type="text"] {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #eeeeee;
        height: 40px;
        font-size: 14px;
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 6px 12px;
        outline: none;
      }
    }

    &__option {
      cursor: pointer;
      background-color: white;
      transition: all linear 200ms;
      padding: 6px 12px;

      &:hover {
        background-color: #eeeeee;
      }
    }
  }
}
</style>
