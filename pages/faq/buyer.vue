<template>
  <div class="static-page">
    <FaqNav :nav-data="faqNav" :path="$route.path"/>
    <main class="static-page__container">
      <FakeBreadcrumbs :fake-path="pagetitle"/>
      <div class="static-page__content document-static">
        <section
          v-for="faq in faqList"
          :id="faq.semanticId"
          :key="faq.id"
          class="static-page__question"
        >
          <h2 class="static-page__title">{{ faq.title }}</h2>
          <img v-if="faqHasImage(faq.semanticId)" :alt="faq.title" :src="getFaqImage(faq.semanticId)">
          <div class="static-page__answer" v-html="faq.bodyHtml"></div>
        </section>
      </div>
      <span class="hiddenspan" @click="triggerError">
        <img v-if="showErrorImg" alt="" src="/logo/laslsl/aooaoaoa.svg"/>
      </span>
    </main>
  </div>
</template>

<script>
import {SectionsTypeIds} from '@/assets/js/const';
import {handleFetchError} from '@/assets/js/util';
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs';
import FaqNav from '@/components/faq/faq-nav';

export default {
  components: {
    FakeBreadcrumbs,
    FaqNav
  },
  data() {
    return {
      pagetitle: 'FAQ',
      showErrorImg: false,
      faqNav: [],
      faqList: [],
      faqImages: {
        'Products': '02',
        'how-to-place-an-order': '01'
      }
    }
  },
  async fetch() {
    try {
      const path = '/napi/static-pages/pages/';
      const {data} = await this.$axios.get(path);
      data.result = data.result.filter(x => x.sectionTypeId === SectionsTypeIds.FAQ);
      this.faqList = data.result;
      this.faqNav = data.result.map(item => ({
        title: item.title,
        id: item.id,
        semanticId: item.semanticId
      }));
    } catch (err) {
      console.error(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
  methods: {
    faqHasImage(id) {
      if (this.faqImages[id]) {
        return true;
      }
      return false;
    },
    getFaqImage(img) {
      return `/nimages/faq/${this.faqImages[img]}.svg`;
    },
    triggerError() {
      this.showErrorImg = true;
      throw new Error('Sentry Error');
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/document-static";

.hiddenspan {
  display: inline-block;
  height: 2px;
  width: 2px;
  cursor: pointer;
  background-color: #ffffff;
  line-height: 0;
}

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
    flex-grow: 1;

    @media screen and (min-width: $desktop-mid + 1) {
      padding: 0 210px 0 24px;
    }
  }

  &__question {
    padding: 12px 0;

    h2 {
      font-size: 28px;
      color: #000000;
      line-height: 146%;
    }
  }

  &__answer {
    padding: 12px 0;

    img {
      display: block;
      width: 100%;
      margin: 0 12px;
    }

    p {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 10px;
      color: #000000;
    }

    ul,
    ol {
      padding: 12px 0;

      li {
        color: #000000;
        font-size: 14px;
        margin-bottom: 7px;
        margin-left: 24px;
      }
    }
  }
}
</style>
