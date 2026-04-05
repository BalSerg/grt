<template>
  <div class="static-page">
    <DocsNav />
    <main class="static-page__container">
      <FakeBreadcrumbs :fake-path="pagetitle" />
      <div class="static-page__content">
        <h1 class="static-page__title">{{pagetitle}}</h1>
        <p>
          {{$t('docs_intro')}}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import DocsNav from '@/components/docs/docs-nav';
import FakeBreadcrumbs from '@/components/common/fake-breadcrumbs';
export default {
  name: 'DocsListPage',
  components: {
    FakeBreadcrumbs,
    DocsNav
  },
  computed: {
    pagetitle() {
      return this.$t('fakebreadcrumbs.docs');
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
  }

  &__container {
    position: relative;
    padding: 0 15px;

    @media screen and (min-width: $desktop-mid + 1) {
      padding: 0 210px 0 24px;
    }
  }

  &__title {
    font-size: 28px;
    line-height: 1.5;
    color: #000000;
    margin-bottom: 20px;

    & ~ p {
      color: #000000;
      line-height: 1.5;
      font-size: 14px;
      margin-bottom: 14px;
    }
  }
}
</style>
