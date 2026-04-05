<template>
  <div class="static-page">
    <EventsNav />
    <main class="static-page__container">
      <FakeBreadcrumbs
        v-if="event.title"
        :fake-path="shortenFakePath(event)"
        :fake-parent="$options.crumbs"
      />
      <div class="event-page">
        <h1 class="event-page__title">
          {{ event.title }}
        </h1>
        <div class="event-page__calendar">
          {{ getLocalizedDate(event.startDate, event.endDate) }}
        </div>
        <div v-if="event.media" class="event-page__album">
          <img :src="getProperImage(event.media[0])" :alt="event.title" />
        </div>
        <div
          v-if="event.bodyHtml"
          class="event-page__content"
          v-html="event.bodyHtml"
        ></div>
        <div v-if="event.externalLink" class="event-page__external">
          <a :href="event.externalLink">
            {{
              event.externalLinkName
                ? event.externalLinkName
                : event.externalLink
            }}
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import GetProperImageMX from '@/mixins/get-proper-image-mx'
import { handleFetchError, sanitize } from '@/assets/js/util'
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs'
import EventsNav from '@/components/events/events-nav'

export default {
  name: 'EventsSlug',
  components: {
    FakeBreadcrumbs,
    EventsNav,
  },
  mixins: [GetProperImageMX],
  data() {
    return {
      navStatus: false,
      event: {},
    }
  },
  crumbs: {
    url: '/events/',
    title: 'fakebreadcrumbs.events',
  },
  async fetch() {
    try {
      const path = `/napi/static-pages/events/${this.$route.params.slug}`
      const { data } = await this.$axios.get(path)
      if (data.result.bodyHtml) {
        data.result.bodyHtml = sanitize(data.result.bodyHtml)
      }
      this.event = data.result
    } catch (err) {
      console.log(err)
      return handleFetchError(this.$nuxt, err)
    }
  },
  head() {
    const descriptionText = this.$t('meta.events_description')
    const title = `${this.event?.title} | Global Rus Trade`
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
    shortenFakePath(event) {
      return event.title.length > 50
        ? event.title.substr(0, 50) + '...'
        : event.title
    },
    toggleNav() {
      this.navStatus = !this.navStatus
    },
    getLocalizedDate(start, end) {
      if (!end)
        return Date(start).toLocaleString(this.$i18n.locale, {
          month: 'long',
          day: 'numeric',
        })
      const StartDate = new Date(start).toLocaleString(this.$i18n.locale, {
        month: 'long',
        day: 'numeric',
      })
      const EndDate = new Date(end).toLocaleString(this.$i18n.locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      return `${this.$t('universal.date.range.from')} ${StartDate} ${this.$t(
        'universal.date.range.to'
      )} ${EndDate}`
    },
    getProperImage(img) {
      if (!img.match(/[^/]+(jpg|png|jpeg)$/))
        return 'https://img.globalrustrade.com/i/e/eSJXMt5sEF/original.jpg'
      return this.$mx_getProperImage(img, "events-item")
    },
  },
}
</script>

<style lang="scss">
.static-page {
  padding: 80px 15px 30px 15px;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: flex-start;

  @media screen and (min-width: $pad) {
    padding: 24px;
  }

  @media screen and (min-width: $desktop-mid) {
    flex-direction: row;
    padding: 24px 0;
    align-items: flex-start;
  }

  &__container {
    position: relative;
    padding: 0 15px;
  }

  &__content {
    p {
      line-height: 1.5;
      color: $text-black;
      margin-bottom: 1rem;
    }
  }
}

.event-page {
  &__title {
    font-size: 28px;
    font-weight: 600;
    color: $text-black;
    display: block;
    line-height: 40px;
  }

  &__calendar {
    font-size: 18px;
    font-weight: 400;
    color: #090305;
    line-height: 30px;
    margin: 16px 0;
  }

  &__album {
    padding-bottom: 24px;

    img {
      display: block;
      max-width: 100%;
    }
  }

  &__content {
    line-height: 170%;
  }
}
</style>
