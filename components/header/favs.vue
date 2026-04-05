<template>
  <div class="header-tool__wrapper header-tool__favs">
    <div v-if="!loaded" class="header-tool__blank"></div>
    <nuxt-link
      v-if="loaded"
      :to="localePath(`/favorites/`)"
      class="header-tool"
    >
      <div v-if="getFavoriteProductIds.length >= 1" class="header-tool__badge">
          {{ getFavoriteProductIds.length }}
      </div>
      <div class="header-tool__icon">
        <svg
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.9462 3.10883C16.2929 0.362161 20.6396 -0.757839 24.1596 1.64216C26.0262 2.92216 27.1996 5.08216 27.2796 7.34883C27.4529 12.5222 22.8796 16.6688 15.8796 23.0155L15.7329 23.1488C14.7196 24.0822 13.1596 24.0822 12.1462 23.1622L12.0129 23.0422L11.9324 22.969C4.97776 16.6503 0.426965 12.5156 0.612915 7.36216C0.692915 5.08216 1.86625 2.92216 3.73291 1.64216C7.25291 -0.771172 11.5996 0.362161 13.9462 3.10883ZM13.9463 21.1889L14.0796 21.0555C20.4263 15.3089 24.6129 11.5089 24.6129 7.65552C24.6129 4.98885 22.6129 2.98885 19.9463 2.98885C17.8929 2.98885 15.8929 4.30885 15.1996 6.13552H12.7063C11.9996 4.30885 9.99959 2.98885 7.94626 2.98885C5.27959 2.98885 3.27959 4.98885 3.27959 7.65552C3.27959 11.5089 7.46626 15.3089 13.8129 21.0555L13.9463 21.1889Z"
            fill="#282828"
          />
        </svg>
      </div>
      <div class="header-tool__text">
        {{ $t("header.favorites") }}
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = !this.loaded;
  },
  computed: {
    ...mapGetters({
      getFavoriteProductIds: 'userData/getFavoriteProductIds'
    }),
  }
};
</script>

<style lang="scss" scoped>
.header-tool__blank {
  animation-delay: 0.75s;
}


.header-tool__favs {
  order: 1;

  @media (min-width: $desktop-mid) {
    order: 0;
  }
}
</style>
