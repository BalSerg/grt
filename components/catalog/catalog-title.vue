<template>
  <div class="catalog-title">
    <h1 class="catalog-title__category-name js-catalog-title">
      {{decodedTitle}}
    </h1>
    <skeleton-one-line-text
      v-if="count === null"
      class="catalog-title__product-count"
    />
    <span v-else class="catalog-title__product-count">{{ count }}</span>
  </div>
</template>

<script>
import SkeletonOneLineText from '@/components/common/skeleton-one-line-text';

const stepCounts = 10;

export default {
  components: {
    SkeletonOneLineText
  },
  props: {
    title: String,
    count: Number
  },
  data(){
    return {
      countInterval: null,
      prevDisplayCount: 0,
      displayCount: 0
    }
  },
  computed: {
    decodedTitle() {
      return decodeURIComponent(this.title);
    }
  },
  watch: {
    count(){
      if(this.countInterval){
        clearInterval(this.countInterval);
      }
      if (this.count == this.displayCount) {
        return;
      }
      this.countInterval = window.setInterval(() => {
        if (this.displayCount != this.count) {
            const delta = this.count - this.prevDisplayCount;
            let step = delta / stepCounts;
            step = Math.sign(step) * Math.ceil(Math.abs(step));
            let newValue = this.displayCount + step;
            const finalStep = this.count - this.displayCount;
            if (Math.abs(finalStep) <= Math.abs(step)) {
              this.prevDisplayCount = this.count;
              newValue = this.count;
            }
            this.displayCount = newValue;
        }
      }, 50);
    }
  }
}
</script>

<style lang="scss">
.catalog-title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}

.catalog-title__category-name {
  display: inline-block;

  color: $text-black;
  font-size: 18px;
  font-weight: 600;
  vertical-align: baseline;

  @media (min-width: $desktop-mid) {
    font-size: 34px;
    font-weight: 700;
  }
}

.catalog-title__product-count {
  display: inline-block;
  margin-left: 16px;
  margin-bottom: 8px;
  margin-top: 0;

  font-size: 13px;
  font-weight: 700;
  color: $text-grey;
  vertical-align: baseline;
}
</style>
