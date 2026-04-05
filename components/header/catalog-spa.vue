<template>
  <div>
    <div class="catalog" :class="{ active: isCatalogVisible }">
      <CatalogButton @toggle-catalog="toggleCatalog"/>
      <div class="catalog-container">
        <template v-if="!isLoaded">
          <div class="catalog-skeleton">
            <loader />
          </div>
        </template>
        <template v-else>
          <div class="catalog__root">
            <div
              v-for="item in categories"
              :key="item.semanticId"
              class="catalog__item"
              :class="{ active: isActiveCategory(item.semanticId) }"
              @mouseenter="setActiveCategory(item.semanticId)"
            >
              <nuxt-link
                class="catalog__item-link"
                :to="localePath(`${basePath}/${item.semanticId}/`)"
                :data-parent="item.semanticId"
                @click.native="toggleCatalog"
              >
                <CategoryIcon :icon="item.icon" :alt="item.name" />
                <span class="catalog__item-name">{{ item.name }}</span>
              </nuxt-link>
            </div>
          </div>
          <div class="catalog__tree">
            <div class="catalog__branch active">
              <div
                v-for="leaf in activeCategoryLeafs"
                :key="leaf.semanticId"
                class="catalog__leaf"
              >
                <nuxt-link
                  class="catalog__leaf-title"
                  :to="localePath(`${basePath}/${leaf.semanticId}/`)"
                  @click.native="toggleCatalog"
                  >{{ leaf.name }}</nuxt-link
                >
                <nuxt-link
                  v-for="bud in leaf.children"
                  :key="bud.semanticId"
                  class="catalog__bud"
                  :to="localePath(`${basePath}/${bud.semanticId}/`)"
                  @click.native="toggleCatalog"
                >
                  {{ bud.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="catalog-overlay" @click="toggleCatalog"></div>
    </div>
  </div>
</template>

<script>
import CategoryIcon from './catalog/category-icon.vue';
import CatalogButton from './catalog/catalog-button.vue';
import { BasePath } from '@/assets/js/const';
import loader from '@/components/common/loader';

// TODO: компоненту требуется комплексный рефакторинг.

const DEFAULT_CATEGORY = 'health-sports-beauty';

export default {
  name: "CatalogSpa",
  components: {
    CategoryIcon,
    CatalogButton,
    loader
  },
  data() {
    return {
      isCatalogVisible: false,
      activeCategory: {},
      basePath: BasePath.CATALOG,
      categories: null,
      isLoaded: false
    };
  },
  computed: {
    activeCategoryLeafs() {
      if(!this.activeCategory) return {};
      return this.activeCategory.children;
    },
  },
  watch: {
    '$root.$i18n.locale'() {
      if(this.categories?.length > 0) this.getCatalogTree();
    }
  },
  methods: {
    toggleCatalog() {
      if(!this.categories) this.getCatalogTree();
      this.isCatalogVisible = !this.isCatalogVisible;
    },
    setActiveCategory(categoryId) {
      this.activeCategory = this.categories.find(x => x.semanticId === categoryId);
    },
    isActiveCategory(categoryId) {
      return this.activeCategory?.semanticId === categoryId;
    },
    async getCatalogTree() {
      try {
        const {result}  = await this.$axios.$get('/napi/catalog-search/categories/products-tree-3-levels');
        this.categories = result;
        this.activeCategory = this.categories.find(x => x.semanticId === DEFAULT_CATEGORY);
        this.isLoaded = true;
      }
      catch(err) {
        this.$sentry.captureException(`Error response at catalog fetch @desktop: ${err}`);
        this.$toast.error(err);
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  padding-left: 20px;

  @media screen and (max-width: $desktop-mid - 1) {
    display: none;
  }

  &-skeleton {
    background-color: $mid-grey-ui;
  }

  &-overlay {
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.1);
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    visibility: hidden;
    opacity: 0;
    transition-duration: 0.4s;
    will-change: auto;
  }

  &-container {
    position: absolute;
    top: 90%;
    left: 0;
    right: 0;
    max-height: 84vh;
    height: 80vh;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
    visibility: hidden;
    opacity: 0;
    transition-delay: 0.2s;
    transition-duration: 0.4s;
    z-index: 1100;
    background-color: $white;
    border-radius: 4px;
    overflow: hidden;
    display: none;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: stretch;
    will-change: auto;
  }

  &.active {
    .catalog-overlay {
      visibility: visible;
      opacity: 1;
    }

    .catalog-container {
      visibility: visible;
      opacity: 1;
      top: 100%;
      display: flex;
    }
  }
}

.catalog__root {
  display: flex;
  height: 100%;
  overflow-x: auto;
  overflow-y: visible;
  width: 20%;
  min-width: 260px;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-shrink: 0;
  padding: 10px 0;
  box-sizing: border-box;
  background-color: $light-grey-ui;

  .catalog__item {
    &.active,
    &:hover {
      background-color: $white;

      .catalog__item-link {
        color: $grt-blue;
      }
    }

    .catalog__item-link {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      font-size: 13px;
      line-height: 1.3;
      color: $text-black;
      box-sizing: border-box;
      padding: 12px 24px;
    }
  }
}

.catalog__tree {
  height: 100%;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.catalog__branch {
  font-size: 13px;
  display: none;
  box-sizing: border-box;
  padding: 20px 20px;
  column-count: 5;
  column-gap: 40px;
  column-fill: auto;
  flex-grow: 1;
  transition: all linear 200ms;
  visibility: hidden;
  opacity: 0;

  @media screen and (max-width: 1366px) {
    column-count: 3;
  }

  .catalog__leaf-title {
    color: $text-black;
    text-decoration: none;

    &:hover {
      color: $grt-blue;
    }
  }

  &.active {
    display: block;
    visibility: visible;
    opacity: 1;
  }
}

.catalog__leaf {
  font-weight: 600;

  & > .catalog__leaf-title {
    margin-bottom: 9px;
    display: block;

    font-weight: 600;
  }
}

.catalog__leaf .catalog__bud {
  display: block;
  margin-bottom: 9px;

  font-weight: 400;
  line-height: 1.4;
  color: $text-grey;
  transition: color ease-out 250ms;

  &:hover {
    color: $grt-blue;
    transition: color ease-in 250ms;
  }
}

.catalog__tree,
.catalog__root {
  &::-webkit-scrollbar {
    background-color: $white;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: $white;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: $light-grey-ui;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid $white;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid $light-grey-ui;
  }

  .dropdown-container::-webkit-scrollbar-button {
    display: none;
  }
}
</style>
