<template>
  <div class="product-breadcrumbs">
    <BreadCrumbs :categories="navInfo.categories"/>
  </div>
</template>

<script>
import BreadCrumbs from '@/components/catalog/catalog-breadcrumbs';

export default {
  components: {
    BreadCrumbs
  },
  props: {
    navInfo: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style lang="scss">
.product-breadcrumbs {
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  padding: 0 15px;

  .catalog-breadcrumbs {
    align-items: flex-start;
    flex-wrap: nowrap;
    margin-top: 0;
  }

  @media (max-width: $desktop-mid - 1) {
    .catalog-crumb.active {
      z-index: 81;
    }

    .catalog-crumb:nth-last-child(3) {
      display: flex;
      margin-left: -10px;

      .catalog-breadcrumbs__toggler {
        height: 18px;
      }

      .catalog-breadcrumbs__link {
        display: none;
      }
    }

    .catalog-crumb:nth-last-child(2) {
      .catalog-breadcrumbs__link {
        width: 50px;

        text-overflow: ellipsis;
        white-space: nowrap;

        overflow: hidden;
      }
    }

    .catalog-crumb:nth-last-child(1) {
      display: flex;
    }
  }

  @media (min-width: $pad) {
    padding: 0 30px;

    .catalog-breadcrumbs {
      padding: 5px 0;
    }
  }

  @media screen and (min-width: $desktop-mid) {
    margin: 0 auto;
    padding: 0 30px;

    .catalog-breadcrumbs {
      .catalog-crumb {
        white-space: nowrap;

        &:last-child {
          white-space: normal;
        }

        &:nth-last-child(2) {
          white-space: normal;
        }

        .catalog-breadcrumbs__link {
          /* stylelint-disable */
          -webkit-line-clamp: 1;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          /* stylelint-enable  */
        }
      }
    }
  }
}
</style>
