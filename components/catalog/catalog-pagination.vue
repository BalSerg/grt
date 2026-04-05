<template>
  <div class="catalog-pagination">
    <NuxtLink
      :to="composeNuxtLinkObj(currentPage - 1)"
      class="catalog-pagination__item"
      :disabled="currentPage == 1"
    >
      <span class="visually-hidden">{{$t('go_to_prev_page')}}</span>
      <svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.486 8.004L8.44 1.05a.616.616 0 00-.87-.87L.18 7.567c-.24.24-.24.63 0 .871l7.388 7.388a.616.616 0 00.871-.87L1.486 8.004z" fill="#007AFF"/>
      </svg>
    </NuxtLink>

    <NuxtLink
      v-for="page in pages"
      :key="page"
      :to="composeNuxtLinkObj(page)"
      class="catalog-pagination__item"
      :class="{ active: page == currentPage }"
    >
      {{ page }}</NuxtLink>

    <NuxtLink
      :to="composeNuxtLinkObj(currentPage + 1)"
      class="catalog-pagination__item"
      :disabled="currentPage >= totalPages"
    >
      <span class="visually-hidden">{{$t('go_to_next_page')}}</span>
      <svg width="10" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.735 8.004L.782 1.05a.616.616 0 01.87-.87l7.389 7.387c.24.24.24.63 0 .871l-7.388 7.388a.616.616 0 01-.87-.87l6.952-6.953z" fill="#007AFF"/>
      </svg>
    </NuxtLink>
  </div>
</template>

<script>
import { composePageCatalogUrl } from "@/assets/js/util.js";
// todo ДОбавить кнопку показать еще
const MAX_PAGE_COUNT = 7;
const PAGES_LIMIT = 50;

export default {
  props: {
    totalProducts: Number,
  },
  data() {
    return {
      itemsToShow: 36,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      const pagesCount = Math.ceil(this.totalProducts / this.itemsToShow);
      return pagesCount > PAGES_LIMIT ? PAGES_LIMIT : pagesCount;
    },
    from() {
      const skipForMiddle = Math.ceil( MAX_PAGE_COUNT / 2 ) - 1;
      return Math.max(
        Math.min(
          this.currentPage - skipForMiddle,
          this.totalPages - MAX_PAGE_COUNT + 1
        ),
        1
      );
    },
    pages() {
      const count = Math.min(this.totalPages, MAX_PAGE_COUNT);
      return Array(count)
        .fill()
        .map((_, index) => index + this.from);
    },
  },
  watch: {
    "$route.query.page"() {
      this.updateCurrentPage();
    }
  },
  created() {
    this.updateCurrentPage();
  },
  methods: {
    composeNuxtLinkObj(toPage) {
      return composePageCatalogUrl(this.$route, toPage);
    },

    updateCurrentPage() {
      let routePage = parseInt(this.$route.query.page) || 1;

      if (routePage > this.totalPages) {
        routePage = 0;
      }
      this.currentPage = routePage;
    },
  },
};
</script>

<style lang="scss">
.catalog-pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
  margin-top: 40px;

  @media screen and (max-width: $pad) {
    max-width: calc(100vw - 30px);
  }

  &__item {
    width: 36px;
    height: 36px;
    font-size: 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 0 4px;
    color: #007aff;
    cursor: pointer;
    background-color: #ffffff;
    outline: none;
    flex-shrink: 0;

    &:focus {
      box-shadow: 0 0 3px rgba(183, 200, 218, 0.75);
    }

    @media screen and (max-width: $pad) {
      width: 22px;
    }

    &[disabled] {
      pointer-events: none;

      svg {
        path {
          fill: $grey;
        }
      }
    }

    &.active {
      background-color: #007aff;
      pointer-events: none;
      color: #ffffff;
    }
  }
}
</style>
