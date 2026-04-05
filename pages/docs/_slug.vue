<template>
  <div class="static-page">
    <DocsNav />
    <main class="static-page__container">
      <FakeBreadcrumbs v-if="docData.title" :fake-parent="crumbs" :fake-path="docData.title"  />
      <div class="static-page__content">
        <h1 class="static-page__title">{{docData.title}}</h1>
        <div class="static-page__document document-static" v-html="docData.bodyHtml"></div>
      </div>
    </main>
  </div>
</template>

<script>
import { handleFetchError, sanitize } from '@/assets/js/util';
import DocsNav from '@/components/docs/docs-nav';
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs';
export default {
  name: 'DocsSlug',
  components: {
    FakeBreadcrumbs,
    DocsNav
  },
  data() {
    return {
      docData: [],
      crumbs: {
        url: '/docs/',
        title: 'fakebreadcrumbs.docs'
      }
    }
  },

  async fetch() {
    try {
      const path = `/napi/static-pages/pages/${this.$route.params.slug}`;
      const { data }  = await this.$axios.get(path);
      if(data.result.bodyHtml) {
        data.result.bodyHtml = sanitize(data.result.bodyHtml)
      }
      this.docData = data.result;
    }
    catch(err) {
      console.error(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
  head() {
    return {
      title: `GRT - ${this.docData.title}`
    }
  },
}
</script>

<style lang="scss">
@import "assets/scss/document-static";

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
  }

  &__container {
    position: relative;
    padding: 0 15px;

    @media screen and (min-width: $desktop-mid + 1) {
      padding: 0 210px 0 24px;
    }
  }
}
</style>
