<template>
  <main class="news-item">
    <div v-if="newsData.title" class="news-item__container-main">
      <FakeBreadcrumbs
        v-if="newsData.title"
        :fake-path="shortenFakePath(newsData.title)"
        :fake-parent="$options.crumbs"
      />
      <NewsBanner :banner-id="bannerId" />
      <h1 class="news-item__title">{{ newsData.title }}</h1>
      <p class="news-item__calendar">
        {{ newsData.dateOfNews }}
      </p>
      <div class="news-item__image">
        <img
          :src="getProperImage(newsData.newsImageLink)"
          :alt="newsData.title"
        />
      </div>
      <NewsTags v-if="tags.length" :tags-arr="tags" />
      <div class="news-item__content" v-html="newsData.bodyHtml"></div>
      <p v-if="newsData.newsInfoLink" class="news-item__content">
        Больше информации можно найти на сайте: {{ newsData.newsInfoLink }}
      </p>
      <SocialButtons />
    </div>
    <NewsSidebarList />
  </main>
</template>

<script>
import NewsTags from '@/components/news/news-tags.vue'
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs'
import SocialButtons from '@/components/social-buttons'
import NewsSidebarList from '@/components/news/news-sidebar-list.vue'
import NewsBanner from '@/components/news/news-banner.vue'
import { handleFetchError, getLocalizedDate, sanitize } from '@/assets/js/util'
import GetProperImageMX from '@/mixins/get-proper-image-mx'

export default {
  components: {
    FakeBreadcrumbs,
    SocialButtons,
    NewsSidebarList,
    NewsTags,
    NewsBanner,
  },
  mixins: [GetProperImageMX],

  data() {
    return {
      newsData: {},
      tags: [],
      // TODO - добавить логику получения bannerId
      bannerId: '8',
    }
  },

  crumbs: {
    url: '/news/',
    title: 'fakebreadcrumbs.news',
  },

  async fetch() {
    const path = '/napi/static-pages/news/by-semantic-id'
    try {
      const { data } = await this.$axios.get(path, {
        params: {
          semanticId: this.$route.params.slug,
        },
      })
      this.setNewsData(data.result)
    } catch (err) {
      return handleFetchError(this.$nuxt, err)
    }
  },

  head() {
    const descriptionText = this.tags.map((tag) => tag.name).join(' | ')
    const title = `${this.newsData.title} | Global Rus Trade`
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

  methods: {
    setNewsData(fetchData) {
      fetchData.tags.length && (this.tags = fetchData.tags)
      this.newsData = {
        ...fetchData,
        bodyHtml: sanitize(fetchData.bodyHtml),
        dateOfNews: getLocalizedDate(fetchData.dateOfNews, this.$i18n.locale),
      }
    },

    shortenFakePath(title) {
      return title.length > 50 ? title.substr(0, 50) + '...' : title
    },

    getProperImage(img) {
      if (img && !img.match(/[^/]+(jpg|png|jpeg)$/))
        return '/nimages/no_picture.png'
      return this.$mx_getProperImage(img, 'news')
    },
  },
}
</script>

<style scoped lang="scss">
.news-item {
  width: calc(100% - 32px);
  max-width: 704px;
  padding: 0 0 40px;
  margin: auto;
  display: flex;
  flex-direction: column;

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 1.4;
    color: $text-black;
    margin: 12px 0;
  }

  &__calendar {
    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.6;
    color: $text-grey-2;
  }

  &__image {
    margin: 16px 0 19px;
    position: relative;

    &::before {
      position: relative;
      content: "";
      padding-top: calc(100% * (177 / 288));
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

  &__tag-box {
    display: flex;
  }

  &__tag {
    margin: 0 8px 0 0;
    padding: 3px 7px;
    background: #219653;
    border-radius: 3px;
    color: $white;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
  }

  &__content {
    margin: 16px 0;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    color: $text-black;
  }

  &__container-main {
    flex-grow: 2;
    margin: 0 0 24px;
  }
}

@media screen and (min-width: $pad) {
  .news-item {
    width: calc(100% - 64px);
    max-width: 1380px;
    padding: 0 0 125px;

    &__title {
      margin: 16px 0 12px 0;
      font-size: 28px;
    }

    &__image {
      &::before {
        padding-top: calc(100% * (177 / 288));
      }
    }

    &__container-main {
      margin: 0 0 32px;
    }
  }
}

@media screen and (min-width: $desktop-mid) {
  .news-item {
    padding: 0 0 40px;
    flex-direction: row;

    &__title {
      font-size: 28px;
    }

    &__image {
      &::before {
        padding-top: calc(100% * (487 / 608));
      }
    }

    &__content {
      margin: 16px 0 24px;
    }

    &__container-main {
      margin: 0 24px 0 0;
    }
  }
}

@media screen and (min-width: $desktop-large) {
  .news-item {
    width: calc(100% - 60px);
    max-width: $desktop-large;

    &__image {
      &::before {
        padding-top: calc(100% * (485 / 1029));
      }
    }
  }
}
</style>
