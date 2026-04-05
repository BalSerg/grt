<template>
  <nuxt-link v-if="bannerData.link" :to="localePath(bannerData.link)" class="news__banner">
    <LazyImg
      :src="`https://cdn-img.globalrustrade.com/${bannerData.langs.default.desktopImage}/original.jpg`"
      :alt="bannerData.langs.default.title"
    />
  </nuxt-link>
</template>

<script>
import LazyImg from '@/components/lazy-img'
import GetProperImageMX from '@/mixins/get-proper-image-mx'
import { handleFetchError } from '@/assets/js/util'

export default {
  components: { LazyImg },
  mixins: [GetProperImageMX],
  props: {
    bannerId: String,
  },

  data() {
    return {
      bannerData: {},
    }
  },

  async fetch() {
    const path = '/napi/promo/banners/by-lang'
    try {
      const { data } = await this.$axios.get(path, {
        params: {
          ids: this.bannerId,
        },
      })
      this.bannerData = { ...data.result[0] }
    } catch (err) {
      return handleFetchError(this.$nuxt, err)
    }
  },
}
</script>

<style lang="scss">
.news__banner {
  position: relative;
  content: "";
  padding-top: calc(100% * (56 / 288));
  display: block;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
}

@media screen and (min-width: $pad) {
  .news__banner {
    padding-top: calc(100% * (137 / 704));
  }
}

@media screen and (min-width: $desktop-mid) {
  .news__banner {
    padding-top: calc(100% * (119 / 611));
  }
}

@media screen and (min-width: $desktop-large) {
  .news__banner {
    padding-top: calc(100% * (200 / 1029));
  }
}
</style>
