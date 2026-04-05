<template>
  <div class="polet-slider">
    <transition-group name="polet-fade" tag="div" class="polet-slider__container">
      <div
          v-for="(slide, id) in slides"
          v-show="activeSlide === id"
          :key="`slideId-${id}`"
          class="polet-slider__slide"
      >
        <img class="polet-slider__picture" :src="slides[activeSlide]" :alt="$t(`palekh.slides.alts[${id}]`)" />
      </div>
    </transition-group>
    <div class="polet-slider__nav">
      <button
        v-for="(slide, id) in slides"
        :key="id"
        :tabindex="id"
        :class="{'active': activeSlide === id}"
        @click="setSlide(id)"
      ></button>
    </div>

  </div>
</template>

<script>
let poletTimer;
const delay = 5000;
export default {
  data() {
    return {
      slides: [
        '/nimages/landings/polet/slides/slide-1.jpg',
        '/nimages/landings/polet/slides/slide-2.jpg',
        '/nimages/landings/polet/slides/slide-3.jpg'
      ],
      activeSlide: 0,
    }
  },
  computed: {
    slidesLimit() {
      return this.slides.length -1;
    }
  },
  mounted() {
    this.autoPlay(this.activeSlide + 1);
  },
  methods: {
    setSlide(num) {
      if(num > this.slidesLimit) num = 0;
      this.activeSlide = num;
      let next = num + 1;
      if(next > this.slidesLimit) next = 0;
      this.autoPlay(next);
    },

    autoPlay(next) {
      if(poletTimer) clearTimeout(poletTimer);
      poletTimer = setTimeout(() => {
        this.setSlide(next);
      }, delay);
    }
  }
}
</script>

<style lang="scss">
.polet-slider {
  max-width: 580px;
  margin: 0 auto;

  @media screen and (max-width: 480px) {
    padding-top: 40px;
  }

  &__container {
    overflow: hidden;
    border-radius: 12px;
    position: relative;

    &::before {
      padding-top: calc(100% / (580 / 400));
      content: "";
      display: block;
      position: static;
    }
  }

  &__slide {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__picture {
    display: block;
    width: 100%;
  }

  &__nav {
    padding: 40px 0;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 480px) {
      padding: 20px 0;
    }

    button {
      width: 90px;
      height: 4px;
      background-color: rgba(0, 0, 0, 0.2);
      margin: 0 10px;
      border-radius: 4px;
      cursor: pointer;
      position: relative;

      &.active {
        &::before {
          content: "";
          width: 0;
          height: 4px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.8);
          animation: loading 5s linear;
          position: absolute;
          left: 0;
          top: 0;
        }
      }

      @keyframes loading {
        from {
          width: 0;
        }

        to {
          width: 100%;
        }
      }
    }
  }
}

.polet-fade-enter-active,
.polet-fade-leave-active {
  transition: 500ms;
}

.polet-fade-enter,
.polet-fade-leave-to {
  opacity: 0;
}
</style>
