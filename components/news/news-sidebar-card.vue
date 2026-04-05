<template>
  <nuxt-link
    :to="localePath(`/news/${newsCard.semanticId}`)"
    class="sidebar__card"
  >
    <img
      class="sidebar__card-image"
      :src="getProperImage(newsCard.newsImageLink)"
      :alt="newsCard.title"
    />

    <h4 class="sidebar__card-title">{{ newsCard.title }}</h4>

    <p class="sidebar__card-calendar">
      {{ setReadableDate(newsCard.dateOfNews) }}
    </p>
  </nuxt-link>
</template>

<script>
import GetProperImageMX from '@/mixins/get-proper-image-mx'
import { getLocalizedDate } from '@/assets/js/util'

export default {
  mixins: [GetProperImageMX],
  props: { newsCard: Object },

  methods: {
    getProperImage(img) {
      if (img && !img.match(/[^/]+(jpg|png|jpeg)$/))
        return '/nimages/no_picture.png'
      return this.$mx_getProperImage(img, 'news-item')
    },

    setReadableDate(isoDate) {
      return getLocalizedDate(isoDate, this.$i18n.locale)
    },
  },
}
</script>

<style scoped lang="scss">
.sidebar__card {
  width: 100%;
  max-width: 327px;
  display: grid;
  grid-template-columns: 93px 1fr;
  gap: 12px 24px;

  &-image {
    grid-row: span 2;
    width: 93px;
    height: 93px;
    border-radius: 8px;
    object-fit: cover;
  }

  &-title {
    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: $text-black;
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* stylelint-enable */
    overflow: hidden;
  }

  &-calendar {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: $text-black;
    opacity: 0.5;
    align-self: end;
  }
}

@media screen and (min-width: $pad) {
  .sidebar__card {
    min-width: 327px;
  }
}
</style>
