<template>
  <div class="product-card-labels">
    <div
      v-for="label in labelsWithLinks"
      :key="label.semanticId"
      class="product-card-labels__item"
    >
      <nuxt-link
        class="product-card-labels__item-link"
        :to="label.link"
      >
        <component :is="label.typeSemanticId" :label="label"/>
        <LabelTooltip :label="label" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { BasePath } from '@/assets/js/const';


export default {
  components: {
    'label-folk-type': () => import('@/components/labels/folk'),
    'label-tooltip': () => import('@/components/labels/label-tooltip'),
    country: () => import('@/components/labels/country')
  },
  props: {
    supplier: {
      type: Object,
      default: () => ({
        countryId: '',
        countryName: ''
      })
    },
    labels: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    basePath() {
      return this.localePath(`${BasePath.CATALOG}${BasePath.PRODUCTS}`);
    },
    labelsWithLinks() {
      if (!this.labels) {
        return [];
      }
      return this.labels.map(x => {
        const link = `${this.basePath}?filters=${x.id}`;
        return Object.assign({}, x, { link });
      });
    }
  },
}
</script>

<style lang="scss">

.product-card-labels__item {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 3px;
  margin-bottom: 8px;

  background-color: #ffffff;
  border-radius: 4px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
}

.product-card-labels__item-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover {
    .label-tooltip {
      opacity: 1;
      visibility: visible;
    }
  }
}

.product-card-labels__icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
