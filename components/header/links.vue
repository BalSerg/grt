<template>
  <div class="header-links">
    <div class="header-link" @click="openCooperationForm">
      {{$t("header.become_a_supplier")}}
    </div>
    <div class="header-link">
      <old-link to="/info/export-services/">{{
        $t('footer.navigation.export_services')
      }}</old-link>
    </div>
    <div class="header-link">
      <old-link to="/info/order-payment-rules/">{{
        $t('header.payment')
      }}</old-link>
    </div>
    <div class="header-link">
      <nuxt-link :to="localePath('/faq/buyer')">{{ $t('header.faq') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import SectionHeader from '../common/section-header';
import { ModalBus } from '@/event-bus/modal-bus';

const Cooperation = () => import('./cooperation');

export default {
  components: {
    SectionHeader
  },
  methods: {
    openCooperationForm() {
      ModalBus.$emit('open', {
        component: Cooperation,
        canCloseOnBackdrop: false
      });
    },

  }
};
</script>

<style lang="scss">
.header-links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;

  .header-link {
    margin-right: 20px;
    cursor: pointer;

    a {
      color: $white;
    }
  }
}
</style>
