<template>
  <div class="catalog-breadcrumbs">
    <div v-for="crumb in enrichedCrumbs" :key="crumb.semanticId" class="catalog-crumb"
         :class="{ active: isCrumbOpened(crumb.semanticId) }" @mouseover="expandCrumb(crumb.semanticId)" @mouseleave="closeCrumb">
      <div class="catalog-breadcrumbs__link">
        <nuxt-link :to="crumb.link">{{ crumb.name }}</nuxt-link>
      </div>
      <div v-if="crumb.hasChildren" class="catalog-breadcrumbs__toggler"></div>
      <div v-if="crumb.hasChildren" class="catalog-crumb__kids">
        <div v-if="isCrumbOpened(crumb.semanticId)" class="catalog-crumb__content">
          <div v-for="kid in crumb.children" :key="kid.semanticId" class="catalog-crumb__kid">
            <nuxt-link :to="localePath(`${basePath}/${kid.semanticId}/`)">{{ kid.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BasePath} from '@/assets/js/const';

export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      basePath: BasePath.CATALOG,
      openedCrumb: null
    }
  },
  computed: {
    crumbs() {
      const HOME = 'home';

      return this.categories.map((x) => {
        const link = this.localePath(`${BasePath.CATALOG}/${x.semanticId}/`);
        if (x.semanticId === HOME) {
          return {
            name: this.$t('homepage'),
            link: this.localePath('/'),
            children: x.children,
            semanticId: x.semanticId
          };
        }
        return { name: x.name, link, children: x.children, semanticId: x.semanticId };
      });
    },
    enrichedCrumbs() {
      return this.crumbs.map(x => {
        return {...x, ...{hasChildren: x.children.length > 0}};
      })
    }
  },
  methods: {
    isCrumbOpened(semanticId) {
      return this.openedCrumb === semanticId;
    },
    expandCrumb(semanticId) {
      this.openedCrumb = semanticId;
    },
    closeCrumb() {
      this.openedCrumb = null;
    }
  }
}
</script>

<style lang="scss">
.catalog-breadcrumbs {
  padding: 10px 0;
  font-size: 13px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  z-index: 1099;

  @media screen and (max-width: $desktop-mid - 1) {
    margin-top: 10px;
    z-index: 999;
  }

  a {
    color: $text-grey;
  }

  &__toggler {
    margin: 0 0 0 10px;
    font-size: 10px;
    width: 10px;
    height: 10px;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      border-right: 1px solid #7e7e7e;
      border-bottom: 1px solid #7e7e7e;
      transition: 0.1s;
      position: absolute;
      top: calc(50% - 3px);
      right: calc(50% - 2px);
      transform: rotate(-45deg);
    }
  }
}

.overflow-hidden {
  .catalog-breadcrumbs {
    z-index: 10;
  }
}

.catalog-crumb__kids {
  position: absolute;
  top: calc(100% - 1px);
  left: -10px;
  visibility: hidden;
  display: none;
  min-width: 220px;
  max-width: 320px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
  max-height: 360px;

  padding: 10px 0;
  box-sizing: border-box;
  border-radius: 6px;

  .catalog-crumb__content {
    max-height: 350px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      &,
      &-track {
        border-radius: 6px;
      }
    }
  }

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;

    display: block;
    width: calc(100% - 16px); //все минус скролл
    height: 10px;

    background: $white;
    content: "";
  }
}

.catalog-crumb__kid {
  padding: 6px 12px;

  &:hover {
    background-color: #f8f8f8;
  }

  a {
    color: $text-black;
  }
}

.catalog-crumb {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  z-index: 80;
  padding: 15px 10px 15px 0;

  &:last-child {
    .catalog-breadcrumbs__toggler {
      display: none;
    }
  }

  @media screen and (max-width: $desktop-mid - 1) {
    display: none;

    &:nth-last-child(2) {
      display: flex;
    }
  }

  @media screen and (max-width: $desktop-mid - 1) {
    &:last-child {
      width: calc(100% - 115px);

      .catalog-breadcrumbs__link {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  &.active {
    .catalog-crumb__kids {
      visibility: visible;
      display: block;
    }

    .catalog-breadcrumbs__toggler {
      &::after {
        transform: rotate(45deg);
        left: calc(50% - 4px);
        top: calc(50% - 6px);
      }
    }
  }
}
</style>
