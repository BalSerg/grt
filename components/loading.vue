<template>
  <div v-show="GET_LOAD_TRIGGER > 0" class="loader-wrapper">
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      GET_LOAD_TRIGGER: 'tech/GET_LOAD_TRIGGER'
    })
  }
}
</script>

<style lang="scss">
@import "assets/scss/_mixins";

.loader-wrapper {
  position: fixed;
  z-index: 5000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
}

.loader {
  @include center-position(true, 290px, 290px);
  border-radius: 20px;
  display: flex;
}

.inner {
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.one {
  background: $fuchsia;
  transform: translate(107px, 135px);
  animation: move-one 1.5s ease infinite;
}

.two {
  background: $grt-blue;
  transform: translate(119px, 135px);
  animation: move-two 1.5s ease infinite;
}

.three {
  background: $azure;
  transform: translate(131px, 119px);
  animation: move-three 1.7s ease-out infinite;
}

@keyframes move-one {
  0% {
    transform: translate(107px, 135px);
  }

  20% {
    transform: translate(107px, 172px);
  }

  40% {
    transform: translate(107px, 100px);
  }

  60% {
    transform: translate(107px, 116px);
  }

  80% {
    transform: translate(107px, 132px);
  }

  100% {
    transform: translate(107px, 135px);
  }
}

@keyframes move-two {
  0% {
    transform: translate(119px, 135px);
  }

  20% {
    transform: translate(119px, 135px);
  }

  40% {
    transform: translate(119px, 130px);
  }

  60% {
    transform: translate(119px, 155px);
  }

  80% {
    transform: translate(119px, 92px);
  }

  100% {
    transform: translate(119px, 135px);
  }
}

@keyframes move-three {
  0% {
    transform: translate(131px, 119px);
  }

  20% {
    transform: translate(131px, 162px);
  }

  40% {
    transform: translate(131px, 85px);
  }

  60% {
    transform: translate(131px, 102px);
  }

  80% {
    transform: translate(131px, 158px);
  }

  100% {
    transform: translate(131px, 119px);
  }
}

/*.loader-wrapper {
  position: fixed;
  z-index: 5000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);

  .loader {
    position: absolute;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    perspective: 600px;
  }

  .inner {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .inner.one {
    left: 0%;
    top: 0%;
    animation: rotate-one 1s linear infinite;
    border-bottom: 12.5px solid #fc3f71;
  }

  .inner.two {
    right: 0%;
    top: 0%;
    animation: rotate-two 1s linear infinite;
    border-right: 12.5px solid #007aff;
  }

  .inner.three {
    right: 0%;
    bottom: 0%;
    animation: rotate-three 1s linear infinite;
    border-top: 12.5px solid #1ad6ba;
  }

  @keyframes rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
}*/
</style>
