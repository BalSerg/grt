<template>
  <div :class="{ card: true, card__visible: index > firstCardsListLength }">
    <div class="card__image">
      <nuxt-link :to="localePath(`/news/${newsData.semanticId}`)">
        <LazyImg
          :src="getProperImage(newsData.newsImageLink)"
          :alt="newsData.title"
        />
      </nuxt-link>
    </div>

    <div class="card__container-bottom">
      <p class="card__calendar">
        {{ date }}
      </p>

      <div>
        <nuxt-link :to="localePath(`/news/${newsData.semanticId}`)">
          <h2 class="card__title">
            {{ newsData.title }}
          </h2>
        </nuxt-link>
      </div>

      <NewsTags v-if="newsData.tags.length" :tags-arr="newsData.tags" />
    </div>
  </div>
</template>

<script>
import NewsTags from '@/components/news/news-tags.vue'
import LazyImg from '@/components/lazy-img'
import GetProperImageMX from '@/mixins/get-proper-image-mx'
import { getLocalizedDate } from '@/assets/js/util'

export default {
  components: { LazyImg, NewsTags },
  mixins: [GetProperImageMX],
  props: {
    newsData: Object,
    index: {
      type: Number,
      default: 0,
    },
    firstCardsListLength: {
      type: Number,
      default: 7,
    },
  },

  data() {
    return {
      date: getLocalizedDate(this.newsData.dateOfNews, this.$i18n.locale),
    }
  },

  methods: {
    getProperImage(img) {
      if (img && !img.match(/[^/]+(jpg|png|jpeg)$/)) {
        return '/nimages/no_picture.png'
      }
      return this.$mx_getProperImage(img, 'news')
    },
  },
}
</script>

<style scoped lang="scss">
@keyframes add-news {
  from {
    opacity: 0;
    transform: translateY(75px);
  }
  /* stylelint-disable */
  to {
    opacity: 1;
    transform: translateY(0px);
    /* stylelint-enable */
  }
}

.card {
  &__visible {
    animation: add-news 1s alternate linear;
  }

  &__image {
    position: relative;

    &::before {
      position: relative;
      content: "";
      padding-top: calc(100% * (166 / 288));
      display: block;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  &__container-bottom {
    margin-top: 8px;
  }

  &__calendar {
    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    color: #b8b8b8;
  }

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.4;
    color: #090305;
    margin: 4px 0 8px 0;
    max-height: 50px;
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* stylelint-enable */
    overflow: hidden;
  }

  &__tag-box {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__tag {
    margin: 0 8px 0 0;
    padding: 3px 7px;
    background: #219653;
    border-radius: 3px;
    color: $white;
    font-weight: 600;
    font-size: 12px;
    line-height: 1.3;
    letter-spacing: 0.5px;
  }
}

@media screen and (min-width: $pad) {
  .card {
    &__image {
      &::before {
        padding-top: calc(100% * (204 / 356));
      }
    }

    &__container-bottom {
      margin-top: 24px;
    }

    &__title {
      margin: 0 0 16px;
    }
  }
}

@media screen and (min-width: $desktop-mid) {
  .card {
    &__image {
      &::before {
        padding-top: calc(100% * (174 / 305));
      }
    }

    &:nth-child(7n + 1),
    &:nth-child(7n + 7) {
      position: relative;
      grid-column: span 2;

      .card__container-bottom {
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 18px;
      }

      .card__image {
        &::before {
          padding-top: calc(100% * (320 / 635));
        }
      }

      .card__calendar {
        font-size: 18px;
      }

      .card__title {
        font-size: 28px;
        color: $white;
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        /* stylelint-enable */
        overflow: hidden;
      }
    }
  }
}

@media screen and (min-width: $desktop-large) {
  .card {
    &__image {
      &::before {
        padding-top: calc(100% * (288 / 464));
      }
    }

    &__calendar {
      font-size: 18px;
    }

    &__title {
      font-size: 28px;
      max-height: 78px;
    }
  }
}
</style>
