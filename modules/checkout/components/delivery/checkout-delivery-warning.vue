<template>
  <div class="delivery-warning">
    <div class="delivery-warning__icon"><span>?</span></div>
    <div class="delivery-warning__wrapper">
      <div class="delivery-warning__placeholder">
        <div class="delivery-warning__text">
          <p><slot></slot></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryWarning"
}
</script>

<style lang="scss">
.delivery-warning {
  display: inline-block;
  position: relative;
  cursor: default;

  &__icon {
    width: 20px;
    height: 20px;
    text-align: center;
    color: $grt-blue;
    border-radius: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border: 1px solid $grt-blue;
    box-sizing: border-box;
    margin-left: 8px;

    &:hover {
      & ~ .delivery-warning__wrapper {
        opacity: 1;
        visibility: visible;
        left: calc(100% + 18px);
        transition: 200ms;
      }
    }
  }

  &__wrapper {
    position: absolute;
    top: 50%;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-50%);
    left: 100%;
    min-width: 40px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: stretch;
    transition: 0s;

    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: white;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    &::after {
      content: "";
      width: 14px;
      height: 14px;
      transform: rotate(45deg);
      position: absolute;
      z-index: 2;
      background-color: white;
      left: -7px;
      top: calc(50% - 7px);
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
  }

  &__placeholder {
    background-color: white;
    z-index: 5;
    position: relative;
    border-radius: 4px;
  }

  &__text {
    padding: 10px 20px;
    white-space: nowrap;

    & > p {
      min-width: 180px;
      max-width: 310px;
      white-space: normal;
      margin: 0;
      font-family: sans-serif;
      line-height: 1.46;
    }
  }
}
</style>