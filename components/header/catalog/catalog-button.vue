<template>
  <div class="catalog-button" @click="toggleCatalog">
    <div class="catalog-button__icon">
      <span class="catalog-button__element"></span>
    </div>
    <div class="catalog-button__title">{{ $t('header.catalog') }}</div>
  </div>
</template>

<script>
export  default {
  methods: {
    toggleCatalog() {
      this.$emit('toggle-catalog');
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  &-button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    background-color: #fc3f71;
    cursor: pointer;
    color: #ffffff;
    position: relative;
    z-index: 1090;
    border-radius: 32px;
    font-size: 17px;
    height: 48px;
    box-sizing: border-box;
    font-weight: bold;
    will-change: auto;

    &__element {
      display: block;
      width: 28px;
      height: 3px;
      background-color: #ffffff;
      border-radius: 2px;
    }

    &__title {
      line-height: 1;
    }

    &__icon {
      width: 30px;
      height: 30px;
      background-color: transparent;
      margin-right: 12px;
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      &::before,
      &::after {
        position: absolute;
        content: "";
        width: 28px;
        height: 3px;
        background-color: #ffffff;
        left: calc(50% - 14px);
        transition: 0.25s;
        border-radius: 2px;
      }

      &::before {
        top: 6.5px;
      }

      &::after {
        bottom: 6.5px;
      }
    }
  }

  &.active {
    .catalog-button {
      background-color: #f4f4f4;
      color: #fc3f71;

      &__icon {
        .catalog-button__element {
          display: none;
        }

        &::before {
          transform: rotate(45deg);
          top: calc(50% - 2px);
          background-color: #fc3f71;
        }

        &::after {
          transform: rotate(-45deg);
          top: calc(50% - 2px);
          bottom: unset;
          background-color: #fc3f71;
        }
      }
    }
  }
}
</style>
