<template>
  <section class="collection">
    <SectionHeader :link="header" />
    <div class="collection__wrapper">
      <transition-group
        name="collection__container"
        class="collection__container"
        tag="div"
      >
        <div
          v-for="item in data"
          v-show="index == item.id"
          :key="item.id"
          class="collection__item"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
        >
          <div
            v-for="(dot, index) in item.items"
            :key="index"
            class="collection__item-dots"
            :style="{ top: dot.top + '%', left: dot.left + '%' }"
          >
            <span></span>
          </div>
          <div class="collection__info">
            <div class="collection__info-title">
              {{ item.title }}
            </div>
            <div class="collection__info-description">
              {{ item.description }}
            </div>
            <div class="collection__info-link">
              <nuxt-link :to="localePath(item.link.href)">{{ item.link.title }}</nuxt-link>
            </div>
          </div>
        </div>
      </transition-group>
      <button class="slider-control__left" @click="prevSlide">
        <svg
          width="13"
          height="24"
          viewBox="0 0 13 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.22914 12.0056L12.6585 1.57622C13.019 1.21561 13.019 0.630981 12.6585 0.270374C12.2978 -0.0901246 11.7133 -0.0901246 11.3526 0.270374L0.270374 11.3526C-0.0901246 11.7133 -0.0901246 12.2979 0.270374 12.6585L11.3526 23.7408C11.7195 24.0951 12.3042 24.0849 12.6585 23.718C13.0041 23.3601 13.0041 22.7928 12.6585 22.4349L2.22914 12.0056Z"
            fill="#131313"
          />
        </svg>
      </button>
      <button class="slider-control__right" @click="nextSlide">
        <svg
          width="13"
          height="24"
          viewBox="0 0 13 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7709 12.0056L0.341509 1.57622C-0.0190439 1.21561 -0.0190439 0.630981 0.341509 0.270374C0.702169 -0.0901246 1.28675 -0.0901246 1.64736 0.270374L12.7296 11.3526C13.0901 11.7133 13.0901 12.2979 12.7296 12.6585L1.64736 23.7408C1.28047 24.0951 0.695839 24.0849 0.341509 23.718C-0.00410843 23.3601 -0.00410843 22.7928 0.341509 22.4349L10.7709 12.0056Z"
            fill="#131313"
          />
        </svg>
      </button>
      <transition-group
        class="collection__controls"
        name="collection__controls"
        tag="div"
      >
        <div
          v-for="item in data"
          :key="item.id"
          class="collection__controls-item"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
          :class="{ active: item.id === index }"
          @click="index = item.id"
        ></div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/common/section-header';
export default {
  components: {
    SectionHeader
  },
  props: { data: Array },
  data() {
    return {
      index: 1,
      header: {
        title: 'Коллекции',
        url: '/collections'
      }
    };
  },
  methods: {
    prevSlide() {
      if (parseInt(this.index) > 1) {
        this.index--;
      } else {
        this.index = this.data.length;
      }
    },
    nextSlide() {
      if (parseInt(this.index) <= this.data.length - 1) {
        this.index++;
      } else {
        this.index = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.section-title {
  margin-bottom: 24px;
}

.collection {
  padding: 0 0 10px 0;
  margin-top: 45px;
  margin-bottom: 45px;

  &__controls {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    &-item {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      margin: 9px;
      cursor: pointer;
      box-sizing: border-box;
      border: 2px solid #ffffff;
      background-size: cover;

      &-enter-active,
      &-leave-active {
        transition: all 0.5s;
      }

      &-enter,
      &-leave-to {
        scale: 0.2;
      }

      &.active {
        width: 94px;
        height: 94px;
        border-color: #fc3f71;
      }
    }
  }

  &__wrapper {
    position: relative;
  }

  .slider-control__left,
  .slider-control__right {
    position: absolute;
    top: 50%;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    width: 30px;
    height: 60px;
    cursor: pointer;
    transform: translateY(-50%);
    outline: none;

    &:active {
      margin-top: 1px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.26);
    }
  }

  .slider-control__left {
    left: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .slider-control__right {
    right: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &__container {
    position: relative;
    padding-top: calc(560 / 1440 * 100%);

    &-enter-active,
    &-leave-active {
      transition: all 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  &__item {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #666666;
    box-sizing: border-box;
    background-size: cover;

    &-dots {
      position: absolute;
      width: 32px;
      height: 32px;
      box-sizing: border-box;
      border: 2px solid #fc3f71;
      border-radius: 50%;
      padding: 2px;
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      transition: background-color linear 200ms;

      &:hover {
        background-color: #fc3f71;

        span {
          transform: rotate(180deg);
        }
      }

      span {
        background-color: #fc3f71;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transition: all linear 200ms;

        &::before,
        &::after {
          width: 2px;
          height: 10px;
          border-radius: 2px;
          background-color: #ffffff;
          position: absolute;
          top: calc(50% - 5px);
          left: calc(50% - 1px);
          content: "";
        }

        &::after {
          transform: rotate(90deg);
        }
      }
    }
  }
}

.collection__info {
  position: absolute;
  width: 286px;
  background-color: rgba(255, 255, 255, 0.7);
  top: 35px;
  left: 60px;
  padding: 20px 35px 35px;
  border-radius: 3px;
  color: #282828;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  &-title {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  &-description {
    margin-bottom: 25px;
    font-size: 13px;
    line-height: 1.4;
  }

  &-link {
    a {
      display: block;
      background-color: $grt-blue;
      color: #ffffff;
      cursor: pointer;
      text-decoration: none;
      font-size: 15px;
      text-align: center;
      padding: 13.5px 0;
      border-radius: 24px;
      font-weight: 600;
    }
  }
}
</style>
