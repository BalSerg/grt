<template>
  <div
    class="catalog-toolbar catalog-toolbar--desktop-inline"
    :class="{'catalog-toolbar--search': isSearch}"
  >

    <template v-if="!isSearch">
      <button
        v-if="isMobileNavigation"
        class="catalog-toolbar__trigger catalog-toolbar__trigger--navigation"
        :aria-label="$t('show_navigation')"
        @click="showMobileNavigation"
      ></button>
    </template>

    <div v-if="!isSuppliersTab" class="catalog-dropdown">
      <button
        type="button"
        class="catalog-dropdown__placeholder"
        aria-haspopup="listbox"
        :aria-expanded="sort.isExpanded"
        @click="expandDropdown"
      >
        <span class="catalog-dropdown__selected">
          <span class="visually-hidden">{{ $t('choose_sorting') }}</span>
          {{ selectedSorting }}
        </span>
        <span
          class="catalog-dropdown__indicator"
          :class="{ 'active': sort.isExpanded }"
        ></span>
      </button>

      <transition name="expand-sort">
        <ul
          v-if="sort.isExpanded"
          role="listbox"
          :aria-label="$t('choose_sorting')"
          class="catalog-dropdown__options"
        >
          <li
            v-for="option in sort.options"
            :key="option"
            class="catalog-dropdown__option"
          >
            <button
              type="button"
              :aria-selected="option === sort.selected"
              @click="setSorting(option)"
            >
              {{ $t(`catalog.sort.${option}`) }}
            </button>
          </li>
        </ul>
      </transition>
    </div>

    <button
      v-if="!isDesktop"
      type="button"
      class="catalog-toolbar__trigger catalog-toolbar__trigger--filters"
      :aria-label="$t('show_filters')"
      @click="showMobileFilters"
    >
      <span
        v-if="appliedFiltersCount > 0"
        class="catalog-toolbar__filters-count"
      >{{ appliedFiltersCount }}</span>
    </button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { composeSortCatalogUrl } from '@/assets/js/util';
import { schema } from '@/assets/js/const';


const sortingDefaultBySchema = {
  [schema.CATALOG]: 'popular',
  [schema.SEARCH]: 'relevant',
};

const sortingOptionsBySchema = {
  [schema.CATALOG]: ['popular', 'new', 'priceasc', 'pricedesc'],
  [schema.SEARCH]: ['relevant', 'priceasc', 'pricedesc']
};

const sortingTab = {
  SUPPLIERS: 'suppliers',
  SERVICES: 'services',
  PRODUCTS: 'products'
};

export default {
  props: {
    appliedFiltersCount: Number,
    schema: String,
    // Использовать, когда (если) с бэка начнут приходить опции
    // sortOptions: {
    //   type: Array,
    //   default: () => []
    // },
  },
  computed:{
    ...mapGetters({
      isDesktop: 'tech/isDesktop'
    }),
    isCatalog() {
      return this.schema === schema.CATALOG;
    },
    isSearch() {
      return this.schema === schema.SEARCH;
    },
    defaultSortingOption() {
      return sortingDefaultBySchema[this.schema] || 'default';
    },
    isMobileNavigation() {
      return (this.isCatalog || this.isSearch) && !this.isDesktop;
    },
    selectedSorting() {
      return this.sort.selected ?
        this.$t(`catalog.sort.${this.sort.selected}`) :
        this.$t(`catalog.sort.default`);
    },
    isSuppliersTab() {
      return this.$route.query?.area === sortingTab.SUPPLIERS;
    }
  },
  data() {
    return {
      sort: {
        selected: this.defaultSortingOption,
        isExpanded: false,
        options: sortingOptionsBySchema[this.schema] || sortingOptionsBySchema[schema.CATALOG]
      }
    }
  },
  mounted() {
    this.updateSorting();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
    document.removeEventListener('keydown', this.onEscPress);
  },
  methods: {
    expandDropdown() {
      this.sort.isExpanded = true;
      document.addEventListener('click', this.closeDropdown);

      if (this.isDesktop) {
        document.addEventListener('keydown', this.onEscPress);
      }
    },
    closeDropdown(evt) {
      if (!this.$el.contains(evt.target)) {
        this.closeSorting();
      }
    },
    setSorting(opt) {
      this.defineSorting(opt);
      this.$router.push(composeSortCatalogUrl(this.$route, opt, this.defaultSortingOption));
    },
    defineSorting(opt) {
      this.sort.isExpanded = false;
      this.sort.selected = opt;
    },
    updateSorting() {
      const routeSort = this.$route.query.sort;
      return routeSort ? this.defineSorting(routeSort) : this.defineSorting(this.defaultSortingOption);
    },
    showMobileFilters() {
      this.$emit('on-show-mobile-filters');
    },
    showMobileNavigation() {
      this.$emit('on-show-mobile-navigation');
    },
    closeSorting() {
      this.sort.isExpanded = false;
      document.removeEventListener('click', this.closeDropdown);
      document.removeEventListener('keydown', this.onEscPress);
    },
    onEscPress(evt) {
      if (evt.key === 'Escape') {
        this.closeSorting();
      }
    },
  },
}
</script>

<style lang="scss">
.expand-sort-enter,
.expand-sort-leave-to {
  opacity: 0;
  transition: all ease 0.3s;
}

.expand-sort-leave,
.expand-sort-enter-to {
  opacity: 1;
}

.drawer-enter,
.drawer-leave-to {
  right: -100vw;
  transition: ease-in-out 0.3s;
  opacity: 0;
}

.catalog-toolbar {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0;

  font-size: 13px;

  @media screen and (max-width: $desktop-mid - 1) {
    justify-content: flex-end;
    margin-bottom: 24px;

    background-color: #f8f8f8;
    border-radius: 3px;
  }
}

.catalog-toolbar--desktop-inline {
  @media (min-width: $desktop-mid) {
    display: inline-flex;
  }
}

.catalog-toolbar__trigger {
  display: none;

  @media screen and (max-width: $desktop-mid - 1) {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;

    background-repeat: no-repeat;
    background-size: auto;
    background-position: center center;
  }

  &--navigation {
    background-image: url("/nimages/icons/navigation-mobile.svg");
  }

  &--filters {
    background-image: url("/nimages/icons/filters-menu-toggle.svg");
  }
}

.catalog-dropdown {
  position: relative;
  z-index: 40;

  display: inline-flex;
  justify-content: center;
  min-width: 144px;
  margin: 0 auto;

  color: #282828;
}

.catalog-dropdown__placeholder {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 7px 12px;

  border: 1px solid #e7e7e7;
  border-radius: 3px;
  cursor: pointer;

  @media screen and (max-width: $desktop-mid - 1) {
    border-color: transparent;
  }
}

.catalog-dropdown__indicator {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  margin-left: 12px;

  background-image: url("/nimages/icons/small-triangle-down.svg");
  background-repeat: no-repeat;
  background-position: center center;

  transition: 0.1s linear;

  &.active {
    transform: scale(1, -1);
  }
}

.catalog-dropdown__selected {
  white-space: nowrap;
}

.catalog-dropdown__options {
  position: absolute;
  top: 100%;
  left: 0;

  width: 100%;
  margin: 0;
  padding: 3px 0;

  list-style: none;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.catalog-dropdown__option {
  padding: 7px 12px;

  white-space: nowrap;

  cursor: pointer;

  transition: 0.2s linear;

  button {
    cursor: pointer;
  }

  &:hover {
    background-color: #efefef;
  }
}

.catalog-toolbar__filters-count {
  position: absolute;
  top: 9px;
  right: 9px;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;

  color: #ffffff;
  font-size: 10px;
  line-height: 14px;

  border-radius: 14px;
  background-color: $fuchsia;
}

.catalog-toolbar--search {
  @media (max-width: $desktop-mid - 1) {
    padding-left: 48px;

    .catalog-dropdown {
      margin: 0 auto;
    }
  }
}
</style>
