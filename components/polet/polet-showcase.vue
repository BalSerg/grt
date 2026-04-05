<template>
  <section class="polet-showcase">
    <div class="container">
      <div class="polet-row">
        <div class="section-title">
          <h2>{{ title }}</h2>
        </div>
        <div class="section-link">
          <nuxt-link :to="link.url">{{ link.title }}</nuxt-link>
        </div>
      </div>
      <div class="polet-catalog">
        <polet-watch-card
          v-for="(product,idx) in visibleProducts"
          :key="idx"
          :product="product"
        />
      </div>
      <div v-if="canShowMore" class="showAll" @click="showMore">
        {{ showMoreText }}
      </div>
      <div class="showAll-mobile">
        <nuxt-link :to="link.url">{{ link.title }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import poletWatchCard from '@/components/polet/polet-watch-card';
import {USER_MUTATIONS} from '@/assets/js/const';

export default {
  components: {
    poletWatchCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      required: true
    },
    originalProducts: {
      type: Array,
      required: true
    },
    maxVisibleLimit: {
      type: Number,
      default: 4
    },
    showMoreText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      products: [],
      showMoreOffset: 1,
      unSubscribe: null
    };
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
    canShowMore() {
      return this.products.length > this.showMoreOffset * this.maxVisibleLimit;
    },
    visibleProducts() {
      return this.products.slice(0, this.maxVisibleLimit * this.showMoreOffset);
    }
  },
  created() {
    this.copyOriginalProducts();
    this.updateFavs();
  },
  mounted() {
    this.unSubscribe = this.$store.subscribe((mutation) => {
      if (USER_MUTATIONS.includes(mutation.type)) {
        this.updateFavs();
      }
    });
  },
  beforeDestroy() {
    this.unSubscribe();
  },
  methods: {
    showMore() {
      this.showMoreOffset += 1;
    },
    copyOriginalProducts() {
      this.products = this.originalProducts.slice();
    },
    updateFavs() {
      if (this.userHasNoFavorites()) {
        this.copyOriginalProducts();
        return;
      }

      this.products = this.originalProducts.map(product => {
        const newProductItem = Object.assign({}, product);
        newProductItem.isFavorite = this.user.likes.has(
          newProductItem.id
        );
        return newProductItem;
      });
    },
    userHasNoFavorites() {
      return !this.user || !this.user.likes || this.user.likes.size === 0;
    }
  }
};
</script>
