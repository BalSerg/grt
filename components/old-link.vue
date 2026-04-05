<template>
  <nuxt-link
    v-if="!externalLink"
    :class="classes"
    :event="routerLinkEvent"
    :to="localizedTo"
    @click.native="checkAuthFunc"
  >
    <slot></slot>
  </nuxt-link>
  <a
    v-else
    :class="classes"
    :href="localizedTo"
    :target="linkTarget"
    @click="checkAuthFunc"
  >
    <slot></slot
    >
  </a>
</template>

<script>
import {mapGetters} from 'vuex';
import {EXTERNAL_LINK_REGEXP} from '@/assets/js/const';

export default {
  props: {
    to: {
      type: String,
    },
    classes: {
      type: String,
      required: false,
      default: () => '',
    },
    checkAuth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
    currentTo() {
      return this.to || '/#';
    },
    localizedTo() {
      if (this.currentTo.startsWith('/')) {
        // this is relative url
        const pathAndQuery = this.currentTo && this.currentTo.split('?');
        let result = this.localePath({path: pathAndQuery[0]});
        if (pathAndQuery[1]) {
          result += '?' + pathAndQuery[1];
        }
        return result;
      } else {
        return this.currentTo;
      }
    },
    externalLink() {
      return this.currentTo.match(EXTERNAL_LINK_REGEXP) === null;
    },
    linkTarget() {
      return !this.currentTo.startsWith('/') ? '_blank' : '_self';
    },
    moveDeny() {
      return this.checkAuth && !this.user;
    },
    routerLinkEvent() {
      return this.moveDeny ? '' : 'click';
    },
  },
  methods: {
    checkAuthFunc(evt) {
      if (this.moveDeny) {
        this.$toast.error(this.$t('must_sign_in'));
        evt.preventDefault();

      }
    },
  },
};
</script>
