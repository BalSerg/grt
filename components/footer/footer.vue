<template>
  <footer class="footer">
    <div class="container">
        <div class="footer-wrapper">
          <Subscribe />
          <Navigation @close="$emit('on-close')" />
          <Contacts />
          <Social />
          <div class="footer__copyright">{{ copyrightText }}</div>
        </div>
    </div>
  </footer>
</template>

<script>
import Contacts from '~/components/footer/contacts.vue';
import Navigation from '~/components/footer/navigation.vue';
import Subscribe from '~/components/footer/subscribe.vue';
import Social from '~/components/footer/social.vue';

export default {
  components: {
    Subscribe,
    Contacts,
    Navigation,
    Social,
  },
  computed: {
    copyrightText() {
      const currentYear = new Date().getFullYear();
      return `© 2015—${currentYear}, Global Rus Trade`;
    }
  },
}
</script>

<style lang="scss">
.footer {
  background-color: #f9f9f9;
}

.footer-wrapper {
  @media (min-width: $pad) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 44px;
    justify-content: space-between;
  }
}

.footer__copyright {
  flex-shrink: 0;
  width: 100%;
  padding: 14px 0;
  border-top: 1px solid #e7e7e7;
  font-size: 11px;
  line-height: 1.4;
  color: #131313;

  @media (min-width: $pad) {
    text-align: center;
    border-top: 0;
  }
}

.footer__subscribe {
  @media (min-width: $pad) {
    order: -2;
    width: 50%;
  }

  @media (min-width: $desktop-mid) {
    order: 0;
    width: 30%;
  }
}
</style>

