<template>
  <section class="product-description">
    <div class="product-description__wrapper">
      <h2 class="product-description__title">{{ $t('description') }}</h2>
      <div
        ref="productDescriptionWrapperRef"
        class="product-description__text-wrapper"
        :style="descriptionHeight"
      >
        <div
          ref="productDescriptionRef"
          class="product-description__text"
          v-html="sanitizedDescription"
        ></div>
      </div>
      <ShowMoreBtn
        v-if="isShowFullDescriptionBtn"
        @on-toggle-click="toggleFullDescription"
      >
        {{ toggleDescriptionLabel }}
      </ShowMoreBtn>
    </div>
  </section>
</template>

<script>
import ShowMoreBtn from '@/components/product-description-show-more-btn';

export default {
  components: {
    ShowMoreBtn
  },
  props: {
    sanitizedDescription: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFullDescription: false,
      isShowFullDescriptionBtn: true,
      initionalContainerHeight: 0,
    }
  },
  computed: {
    descriptionHeight() {
      return this.isFullDescription ? 'max-height: none;' : '';
    },
    toggleDescriptionLabel() {
      return this.isFullDescription ? this.$t('hide_full_description') : this.$t('show_full_description');
    },
  },
  mounted() {
    this.initDescription();
  },
  methods: {
    initDescription() {
      if (this.sanitizedDescription) {
        const descriptionHeight = this.$refs.productDescriptionRef.offsetHeight;
        const containerHeight = this.$refs.productDescriptionWrapperRef.offsetHeight;
        this.initionalContainerHeight = containerHeight;

        this.isShowFullDescriptionBtn = descriptionHeight > this.initionalContainerHeight;
        this.isFullDescription = !this.isShowFullDescriptionBtn;
      }
    },
    toggleFullDescription() {
      this.isFullDescription = !this.isFullDescription;
    },
  },
}
</script>

<style lang="scss">
.product-description {
  width: 100%;
  overflow: hidden;
}

.product-description__title {
  margin-bottom: 10px;

  font-size: 15px;
  line-height: 1.5;
  font-weight: 600;
  color: $text-black;
}

.product-description__text-wrapper {
  position: relative;

  max-height: 66px;

  overflow: hidden;

  @media (min-width: $pad) {
    max-height: 154px;
  }

  @media (min-width: $desktop-mid) {
    max-height: 132px;
  }

  @media (min-width: $desktop-large) {
    max-height: 88px;
  }
}

.product-description__text {
  position: relative;
  top: 0;

  font-size: 14px;
  line-height: 1.6;
  color: $text-black;
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
