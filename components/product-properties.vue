<template>
  <section class="product-description">
    <div class="product-description__wrapper">
      <h2 class="product-description__title">{{ $t('characteristics') }}</h2>
      <dl
        class="product-description__data-list"
        :class="{'product-description__data-list--expanded': isFullProperties}"
      >
        <div
          v-for="(property, idx) in product.modificationProperties"
          :key="`property-${idx}`"
          class="product-description__data-list-item"
        >
          <dt class="product-description__data-name">
            <span>{{ property.propertyName }}</span>
          </dt>
          <dd class="product-description__data-value">
            <span>{{ property.value }}</span>
          </dd>
        </div>
      </dl>
      <ShowMoreBtn
        :data-hidden-mobile="`${isTogglePropsHiddenMob}`"
        :data-hidden-desktop="`${isTogglePropsHiddenDesk}`"
        @on-toggle-click="toggleFullProperties"
      >
        {{ togglePropsLabel }}
      </ShowMoreBtn>
    </div>
  </section>
</template>

<script>
import ShowMoreBtn from '@/components/product-description-show-more-btn';

const DEFAULT_VISIBLE_PROPS_SIZE_MOB = 3;
const DEFAULT_VISIBLE_PROPS_SIZE_DESK = 8;

export default {
  components: {
    ShowMoreBtn
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isFullProperties: false
    }
  },
  computed: {
    togglePropsLabel() {
      return this.isFullProperties ? this.$t('hide_some_of_the_characteristics') : this.$t('show_all_characteristics');
    },
    isTogglePropsHiddenMob() {
      return this.product.modificationProperties && this.product.modificationProperties.length <= DEFAULT_VISIBLE_PROPS_SIZE_MOB;
    },
    isTogglePropsHiddenDesk() {
      return this.product.modificationProperties && this.product.modificationProperties.length <= DEFAULT_VISIBLE_PROPS_SIZE_DESK;
    },
  },
  methods: {
    toggleFullProperties() {
      this.isFullProperties = !this.isFullProperties;
    }
  },
}
</script>

<style lang="scss">
.product-description__title {
  margin-bottom: 10px;

  font-size: 15px;
  line-height: 1.5;
  font-weight: 600;
  color: $text-black;
}


.product-description-show-more-btn[data-hidden-mobile="true"],
.product-description-show-more-btn[data-hidden-desktop="true"] {
  display: none;
}

.product-description__data-list {
  display: grid;
  row-gap: 10px;
  margin: 0;
  padding: 10px 0;

  @media (min-width: $desktop-large) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 24px;
  }
}

.product-description__data-list-item {
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;

  font-size: 14px;
  line-height: 1.4;
  color: $text-grey;

  overflow: hidden;

  span {
    background-color: #ffffff;
  }

  &::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    z-index: -1;

    width: 100%;
    border-bottom: 1px dotted $grey;
  }

  @media (max-width: $pad - 1) {
    &:nth-child(n+4) {
      display: none;
    }
  }

  @media (min-width: $pad) {
    &:nth-child(n+9) {
      display: none;
    }
  }
}

.product-description__data-list--expanded {
  .product-description__data-list-item {
    display: grid;
  }
}

.product-description__data-name {
  span {
    padding-right: 3px;
  }
}

.product-description__data-value {
  margin-left: 0;

  text-align: right;
  color: $text-black;

  span {
    padding-left: 3px;
  }
}
</style>
