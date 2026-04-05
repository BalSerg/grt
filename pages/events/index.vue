<template>
  <div class="static-page">
    <EventsNav />
    <main class="static-page__container wide">
      <FakeBreadcrumbs
        :fake-path="parent ? $route.params.year : $t('fakebreadcrumbs.events')"
        :fake-parent="parent"
      />
      <h1>{{$t('section.header.events')}}</h1>
      <EventsGenerator :link="path" />
    </main>
  </div>
</template>

<script>
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs';
import EventsNav from '@/components/events/events-nav';
import EventsGenerator from '@/components/events/events-generator';

const baseApiPath = '/napi/static-pages/events/'

export default {
  name: 'EventsPage',
  components: {
    FakeBreadcrumbs,
    EventsNav,
    EventsGenerator,
  },
  data() {
    return {
      title: this.$t('section.header.events') + ' | Global Rus Trade',
    }
  },
  head() {
    const descriptionText = this.$t('meta.events_description');
    const title = this.title;
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
    };
  },
  computed: {
    path() {
      if(!!this.$route.params.month && !!this.$route.params.year){
        return `${baseApiPath}year/${this.$route.params.year}/month/${this.$route.params.month}`;
      }
      if(this.$route.params.year) {
        return `${baseApiPath}year/${this.$route.params.year}`;
      }
      return baseApiPath;
    },
    parent() {
      if(this.$route.params.year) {
        return {url: `/events/`, title: 'fakebreadcrumbs.events' };
      }
      return null;
    }
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

    h1 {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.4;
      color: $text-black;
      margin-bottom: 16px;
      display: block;

      @media screen and (max-width: $mobile) {
        font-size: 24px;
        line-height: 1.2;
      }
    }

    @media screen and (min-width: $desktop-mid + 1) {
      padding: 0 210px 0 24px;

      &.wide {
        padding: 0 0 0 24px;
        flex-grow: 1;
      }
    }
  }

  &__content {
    p {
      line-height: 1.5;
      color: $text-black;
      margin-bottom: 1rem;
    }
  }
}
</style>
