<template>
  <img
    :class="{ 'lazyload': loading === 'lazy' && !supportsLoadingAttribute }"
    :loading="loading"
    :alt="alt"
    v-bind="{ ...sources }"
    @error="replaceImg"
  />
</template>

<script>
/**
 * Идея взята отсюда:
 * https://viewsource.io/lazy-loading-images-in-nuxt/
 *
 * Плагин lazysizes.client.js также проверяет поддержку браузером
 * 'loading' и не подключает или подключает пакет lazySizes.
 */

// Просто прозрачный фон
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default {
  props: {
    loading: {
      type: String,
      default: 'lazy',
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    srcset: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      supportsLoadingAttribute: false,
    };
  },
  computed: {
    sources() {
      if (this.loading === 'lazy' && !this.supportsLoadingAttribute) {
        return Object.assign({ 'data-src': this.src, src: PLACEHOLDER },
                this.srcset ? { 'data-srcset': this.srcset, srcset: `${PLACEHOLDER} 1x` } : null);
      }

      return Object.assign({ src: this.src },
              this.srcset ? { srcset: this.srcset } : null);
    }
  },
  mounted() {
    this.supportsLoadingAttribute = 'loading' in HTMLImageElement.prototype;
  },
  methods: {
    replaceImg(evt) {
      const err = new Error(`Broken image: ${evt.target.src}, path: (${this.$nuxt.$route.path}) `);
      this.$sentry.captureException(err);
      // eslint-disable-next-line no-return-assign
      return evt.target.src = '/nimages/no_picture.png';
    }
  },
};
</script>

