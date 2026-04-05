<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import error500 from '~/components/errors/500.vue';
import error404 from '~/components/errors/404.vue';
import { NOT_FOUND }  from '@/assets/js/const';

export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === NOT_FOUND) {
        return error404;
      }
      // catch everything else
      return error500;
    }
  }
};
</script>
