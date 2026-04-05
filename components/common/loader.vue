<template>
  <div class="jumping-loader">
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.jumping-loader {
  position: absolute;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.25);
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  .ball {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: $white;
    margin: 0 6px;
    animation: speed ease infinite 2s;

    &:nth-child(1) {
      background-color: $fuchsia;
    }

    &:nth-child(2) {
      background-color: $grt-blue;
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      background-color: $azure;
      animation-delay: 0.4s;
    }
  }
}

@keyframes speed {
  0% {
    transform: translate(0, 0);
  }

  5% {
    transform: translate(0, 1vh);
  }

  20% {
    height: 25px;
  }

  30% {
    height: 12px;
    transform: translate(0, -6vh);
    filter: brightness(1.25);
  }

  45% {
    transform: translate(0, 0);
  }
}
</style>