<template>
  <div class="rating-stars">
    <div
      class="rating-stars__value"
      :aria-label="$t('product_rating')"
    >{{ fixedCommonRating }}</div>
    <div class="rating-stars__body">
      <div
        class="rating-stars__active"
        :style="`width: ${ratingWidth};`"
      ></div>
      <div class="rating-stars__items">
        <fieldset class="rating-stars__items-wrapper">
          <legend class="visually-hidden">{{ $t('rate_the_product') }}</legend>
          <input
            type="radio"
            class="rating-stars__star-item"
            name="rating"
            :aria-label="$t('rating_options.awful')"
            value="1"
          >
          <input
            type="radio"
            class="rating-stars__star-item"
            name="rating"
            :aria-label="$t('rating_options.bad')"
            value="2"
          >
          <input
            type="radio"
            class="rating-stars__star-item"
            name="rating"
            :aria-label="$t('rating_options.fine')"
            value="3"
          >
          <input
            type="radio"
            class="rating-stars__star-item"
            name="rating"
            :aria-label="$t('rating_options.good')"
            value="4"
          >
          <input
            type="radio"
            class="rating-stars__star-item"
            name="rating"
            :aria-label="$t('rating_options.excellent')"
            value="5"
          >
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commonRating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ratingWidth() {
      return `${Number(this.commonRating).toFixed(1) / 0.05}%`;
    },
    fixedCommonRating() {
      return Number(this.commonRating).toFixed(1);
    }
  }
}
</script>

<style lang="scss">
.rating-stars {
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  font-size: 15px;
  line-height: 1;

  @media (min-width: $desktop-large) {
    font-size: 14px;
  }
}

.rating-stars__value {
  padding-left: 4px;

  color: $text-black;
  font-size: 13px;
  line-height: 1;

  pointer-events: none;
}

.rating-stars__body {
  position: relative;

  &::before {
    content: "★★★★★";
    display: block;
  }
}

.rating-stars__items {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  width: 100%;
  height: 100%;

  cursor: pointer;
}

.rating-stars__items-wrapper {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  border: none;
}

.rating-stars__star-item {
  flex: 0 0 20%;
  height: 100%;
  margin: 0;
  padding: 0;

  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
  border: none;
  outline: none;
  border-width: 0;
}

.rating-stars__active {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  &::before {
    content: "★★★★★";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    color: #f2c94c;
  }
}
</style>
