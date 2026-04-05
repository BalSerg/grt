<template>
  <div v-if="isVisible" class="hint-component">
    <div class="hint-component__wrapper">
      <button class="hint-component__close" :aria-label="$t(`header.order`)" @click="close">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="button-close__icon" d="M6.66 6l5.2-5.2a.47.47 0 10-.66-.66L6 5.34.8.14A.47.47 0 10.14.8L5.34 6l-5.2 5.2a.47.47 0 10.66.66L6 6.66l5.2 5.2a.47.47 0 00.66 0 .47.47 0 000-.66L6.66 6z" fill="#7E7E7E"/>
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isVisible: Boolean
    };
  },
  mounted() {
    if (localStorage.isVisible) {

      // В переменной is Visible сохраняем то, что приходит из LocalStorage. Оттуда приходит строка, что автоматом дает true.
      // Знаком ! получаю инверсию и имею false и прb повторном заходе юзер напоминалки не видит.
      this.isVisible = !(localStorage.isVisible);
    }
  },
  methods: {
    close() {
      this.isVisible = false;
      localStorage.isVisible = this.isVisible;
    }
  },
}
</script>

<style lang="scss">
  .hint-component {
    position: relative;

    margin: 0 0 0 20px;
    box-sizing: border-box;

    height: 40px;

    &__close {
      position: absolute;
      top: 8px;
      right: 12px;
      background-color: transparent;
      cursor: pointer;

      &:hover,
      &:focus {
        .button-close__icon {
          fill: $grt-blue;
          transition: fill 0.3s ease-in 0;
        }
      }

      &,
      .button-close {
        width: 14px;
        height: 14px;
      }
    }

    &__wrapper {
      position: absolute;
      top: -7px;
      left: 0;
      z-index: 1;

      width: 250px;

      padding: 8px;

      background-color: $white;
      border-radius: 4px;
      border: 1px solid $grey;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

      &::before {
        position: absolute;
        top: calc((100% - 14px) / 2);
        left: -7px;
        z-index: 1;

        width: 14px;
        height: 14px;

        background-color: $white;
        box-shadow: -3px -3px 9px -1px rgba(0, 0, 0, 0.15);

        transform: rotate(-45deg);
        content: "";
      }
    }
  }

  @media (max-width: 580px) {
    .hint-component {
      margin: 0 0 60px 0;

      &__wrapper {
        top: 50px;
        left: inherit;
        right: -100%;

        &::before {
          top: -7px;
          left: 85%;

          box-shadow: -3px -3px 9px -1px rgba(0, 0, 0, 0.15);

          transform: rotate(45deg);
        }
      }
    }
  }
</style>
