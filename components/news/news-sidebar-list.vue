<template>
  <div class="sidebar-list">
    <h3 class="sidebar-list__title">Последние новости</h3>
    <ul class="sidebar-list__card-box">
      <li v-for="news in newsList" :key="news.id">
        <NewsSidebarCard :news-card="news" />
      </li>
    </ul>
  </div>
</template>

<script>
import NewsSidebarCard from '@/components/news/news-sidebar-card.vue'
import { handleFetchError } from '@/assets/js/util'

export default {
  components: { NewsSidebarCard },

  data() {
    return {
      newsList: [],
    }
  },

  async fetch() {
    try {
      const path = '/napi/static-pages/news/brief'
      const { data } = await this.$axios.get(path, {
        params: {
          page: 1,
          'page-size': 4,
        },
      })
      this.newsList = data.result
    } catch (err) {
      return handleFetchError(this.$nuxt, err)
    }
  },
}
</script>

<style scoped lang="scss">
.sidebar-list {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    padding-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.25;
    color: $text-black;
  }

  &__card-box {
    padding: 0;
    margin: 0;
    list-style: none;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
}

@media screen and (min-width: $pad) {
  .sidebar-list__card-box {
    width: fit-content;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 24px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }
  }
}

@media screen and (min-width: $desktop-mid) {
  .sidebar-list {
    max-width: 327px;
    margin-top: 24px;

    &__card-box {
      flex-wrap: wrap;
    }
  }
}
</style>
