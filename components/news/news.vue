<template>
  <main class="news-page">
    <FakeBreadcrumbs :fake-path="$t('fakebreadcrumbs.news')" />
    <h1 class="news-page__title">
      {{ $t('section.header.news') }}
    </h1>
    <div ref="newsListContainer" class="news-page__list">
      <NewsCard
        v-for="(news, index) in newsListToRender"
        :key="news.id"
        :news-data="news"
        :index="index + 1"
        :first-cards-list-length="$options.listLengthToFetch"
      />
    </div>
  </main>
</template>

<script>
import { handleFetchError } from '@/assets/js/util'
import NewsCard from '@/components/news/news-card'
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs'

export default {
  components: { FakeBreadcrumbs, NewsCard },

  data() {
    return {
      newsListToRender: [],
      currentListToFetch: 0,
      maxListNumberToFetch: 0,
    }
  },
  listLengthToFetch: 7,

  async fetch() {
    const path = '/napi/static-pages/news/brief'
    try {
      if (!this.maxListNumberToFetch) {
        const { data } = await this.$axios.get(`${path}/count`)
        this.maxListNumberToFetch = Math.ceil(
          data.result / this.$options.listLengthToFetch
        )
      }
      this.currentListToFetch++
      const { data } = await this.$axios.get(path, {
        params: {
          page: this.currentListToFetch,
          'page-size': this.$options.listLengthToFetch,
        },
      })
      this.newsListToRender = [...this.newsListToRender, ...data.result]
    } catch (err) {
      return handleFetchError(this.$nuxt, err)
    }
  },

  head() {
    const descriptionText = this.$t('meta.news_description')
    const title = this.$t('section.header.news') + ' | Global Rus Trade'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: descriptionText,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: descriptionText,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          property: 'twitter:title',
          content: title,
        },
      ],
    }
  },

  mounted() {
    window.addEventListener('scroll', this.addCardsToRender)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.addCardsToRender)
  },

  methods: {
    async addCardsToRender() {
      this.maxListNumberToFetch - this.currentListToFetch <= 0 &&
        window.removeEventListener('scroll', this.addCardsToRender)
      const screenHeight = window.innerHeight
      const boxCoords = this.$refs.newsListContainer.getBoundingClientRect()
      screenHeight - boxCoords.bottom > 250 && (await this.$fetch())
    },
  },
}
</script>

<style scoped lang="scss">
.news-page {
  width: calc(100% - 32px);
  max-width: 356px;
  padding: 0 0 26px;
  margin: auto;

  &__title {
    margin: 0 0 24px;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 1.4;
    color: $text-black;
  }

  &__list {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media screen and (min-width: $pad) {
  .news-page {
    padding: 0 0 48px;
    max-width: 736px;

    &__title {
      font-size: 28px;
    }

    &__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (min-width: $desktop-mid) {
  .news-page {
    width: calc(100% - 60px);
    max-width: $desktop-large;

    &__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (min-width: $desktop-large) {
  .news-page {
    &__list {
      gap: 40px 24px;
    }
  }
}
</style>
