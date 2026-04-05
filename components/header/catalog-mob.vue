<template>
  <div class="header-tool__wrapper header-tool__catalog mobile-only">
    <button class="header-tool" @click="openModal">
      <div class="header-tool__icon">
        <CatalogMobIcon/>
      </div>
      <div class="header-tool__text">
        {{ $t('header.catalog') }}
      </div>
    </button>
    <ModalDropdown
      class="modal-dropdown__catalog-wrapper"
      :is-modal-opened="isModalOpened"
      @onModalClose="closeModal"
    >
      <div v-if="!!categories" class="catalog-container">
        <template v-if="categories.length == 0">
          <Loader />
        </template>
        <template v-else>
          <div v-for="branch in categories" :key="branch.semanticId" class="catalog-branch"
              :class="{active : isCategoryOpened(branch.semanticId)}">
            <div class="branch-row">
              <nuxt-link
                :to="localePath(`${basePath}/${branch.semanticId}/`)"
                @click.native="closeModal"
              >{{ branch.name }}
              </nuxt-link
              >
              <button
                v-if="branch.children && branch.children.length > 0"
                class="branch-toggler"
                @click="toggleCategory(branch.semanticId)"
              ></button>
            </div>
            <template v-if="isCategoryOpened(branch.semanticId)">
              <div
                v-for="leaf in branch.children"
                :key="leaf.semanticId"
                class="catalog-leaf"
                :class="{active : isCategoryOpened(leaf.semanticId)}"
              >
                <div class="leaf-row">
                  <nuxt-link
                    :to="localePath(`${basePath}/${leaf.semanticId}/`)"
                    @click.native="closeModal"
                  >{{ leaf.name }}
                  </nuxt-link
                  >
                  <button
                    v-if="leaf.children && leaf.children.length > 0"
                    class="leaf-toggler"
                    @click="toggleCategory(leaf.semanticId)"
                  ></button>
                </div>
                <template v-if="isCategoryOpened(leaf.semanticId)">
                  <div v-for="bud in leaf.children" :key="bud.semanticId" class="catalog-bud">
                    <nuxt-link
                      :to="localePath(`${basePath}/${bud.semanticId}/`)"
                      @click.native="closeModal"
                    >{{ bud.name }}
                    </nuxt-link
                    >
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
    </ModalDropdown>
  </div>
</template>
<script>
import ModalDropdown from '@/components/common/modal-dropdown';
import {BasePath} from '@/assets/js/const';
import CatalogMobIcon from '@/components/header/catalog/catalog-mob-icon.vue';

// TODO: компоненту требуется комплексный рефакторинг.

export default {
  components: {
    ModalDropdown,
    CatalogMobIcon,
    Loader: () => import('@/components/common/loader')
  },
  data() {
    return {
      isModalOpened: false,
      basePath: BasePath.CATALOG,
      branchOpenState: {},
      categories: null
    };
  },
  watch: {
    isModalOpened(isVisible) {
      if(!this.categories) this.getCatalogTree();
      return isVisible ? this.$disableBodyScroll() : this.$enableBodyScroll();
    },
    '$root.$i18n.locale'() {
      if(this.categories?.length > 0) this.getCatalogTree();
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickAway);
  },
  methods: {
    async getCatalogTree() {
      try {
        const {result}  = await this.$axios.$get('/napi/catalog-search/categories/products-tree-3-levels');
        this.categories = result;
        this.categories.forEach(cat => {
          this.$set(this.branchOpenState, cat.semanticId, false)
          cat.children.forEach(leaf => {
            this.$set(this.branchOpenState, leaf.semanticId, false)
          })
        });
      }
      catch(err) {
        this.$sentry.captureException(`Error response at catalog fetch @mobile: ${err}`);
        this.$toast.error(err);
        console.error(err);
      }
    },
    isCategoryOpened(semanticId) {
      return this.branchOpenState[semanticId];
    },
    openModal() {
      this.isModalOpened = true;
      document.addEventListener('click', this.clickAway);
    },
    closeModal() {
      this.isModalOpened = false;
      document.removeEventListener('click', this.clickAway);
    },
    clickAway(evt) {
      if(!evt.target.closest('.header-tool__catalog')) this.isModalOpened = false;
    },
    toggleCategory(semanticId) {
      this.branchOpenState[semanticId] = !this.branchOpenState[semanticId];
    },
  }
};
</script>

<style lang="scss" scoped>
.mobile-only {
  display: none;

  @media screen and (max-width: $desktop-mid - 1) {
    display: block;
  }
}

.catalog-container {
  overflow-y: auto;
  height: 100%;
  font-size: 14px;
}

.catalog-branch {
  &:first-child {
    border-top: 1px solid #eeeeee;
  }

  .branch-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
  }

  .branch-toggler,
  .leaf-toggler {
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    margin-left: 20px;
    flex-shrink: 0;
    box-sizing: border-box;
    outline: none;
    position: relative;

    &::before,
    &::after {
      content: "";
      width: 2px;
      height: 12.25px;
      background-color: $grt-blue;
      position: absolute;
      top: 6.5px;
      transition: all linear 200ms;
    }

    &::before {
      transform: rotate(-45deg);
      left: calc(50% - 5px);
    }

    &::after {
      transform: rotate(45deg);
      right: calc(50% - 5px);
    }
  }

  a {
    text-decoration: none;
    color: #282828;
    font-weight: bold;
  }

  .catalog-leaf {
    display: none;
    border-bottom: 1px solid #eeeeee;

    :last-child {
      border: none;
    }

    :first-child {
      border: none;
    }

    .leaf-row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0 10px 10px;
    }

    a {
      color: #3d3d3d;
      font-weight: normal;
    }

    &.active {
      .leaf-row {
        border-bottom: 1px solid #eeeeee;
      }

      .catalog-bud {
        display: block;
      }

      .leaf-toggler {
        &::before {
          transform: rotate(45deg);
          left: calc(50% - 5px);
          top: 4px;
        }

        &::after {
          transform: rotate(-45deg);
          right: calc(50% - 5px);
          top: 4px;
        }
      }
    }
  }

  .catalog-bud {
    display: none;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eeeeee;
  }

  &.active {
    .catalog-leaf {
      display: block;
    }

    .branch-toggler {
      &::before {
        transform: rotate(45deg);
        left: calc(50% - 5px);
        top: 4px;
      }

      &::after {
        transform: rotate(-45deg);
        right: calc(50% - 5px);
        top: 4px;
      }
    }
  }
}

.modal-dropdown__catalog-wrapper .modal-dropdown__modal {
  @media (min-width: 767px) {
    top: 56px;
  }
}
</style>
