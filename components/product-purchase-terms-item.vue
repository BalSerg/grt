<template>
  <div class="product-purchase-terms-item">
    <label class="product-purchase-terms-item__wrapper">
      <span class="product-purchase-terms-item__title">{{ $t('special_conditions') }} </span>
      <input
        class="product-purchase-terms-item__activator"
        type="button"
        :value="`${$t('for_legal_entities')}`"
        @click="openModal"
      >
    </label>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import ProductCompanyConditions from '@/components/product-company-conditions';

export default {
  props: {
    conditionsForCompanies: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations({
      SET_MODAL_COMPONENT_NAME: 'tech/SET_MODAL_COMPONENT_NAME',
      SET_TARGET_DATA: 'tech/SET_TARGET_DATA'
    }),
    openModal() {
      this.SET_TARGET_DATA({
        conditionsForCompanies: this.conditionsForCompanies,
        title: this.$t('conditions_for_legal_entities'),
        isFullWidth: true
      })
      this.SET_MODAL_COMPONENT_NAME('ProductCompanyConditions')
    }
  }
}
</script>

<style lang="scss">
.product-purchase-terms-item {
  display: flex;
  align-items: center;
  padding: 3px 0 3px 34px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='red' d='M23.05 5.3L12.15.03a.35.35 0 00-.3 0L.95 5.3a.35.35 0 00-.2.31V18.4c0 .13.08.26.2.31l10.9 5.27a.35.35 0 00.3 0l10.9-5.27c.12-.05.2-.18.2-.31V5.6a.35.35 0 00-.2-.31zM12 .74l10.09 4.87-2.93 1.41A.35.35 0 0019.1 7L9.08 2.15 12 .75zm-3.7 1.8l10.06 4.87-2.06 1L6.23 3.54l2.06-1zm10.3 5.54v3.68l-1.93.93V9l1.93-.93zm3.95 10.09l-10.2 4.92v-12l2.43-1.17a.35.35 0 00-.3-.63L12 10.49l-.97-.48a.35.35 0 10-.31.63l.93.45v12l-10.2-4.92v-12l7.77 3.75a.35.35 0 00.47-.16.35.35 0 00-.17-.47L1.92 5.6 5.4 3.93l10.56 5.1h.01v4.22a.35.35 0 00.5.32l2.63-1.27c.13-.06.2-.19.2-.32V7.74l3.25-1.57v12z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: left top;
}

.product-purchase-terms-item__wrapper {
  box-sizing: border-box;

  font-size: 13px;
  line-height: 1.4;
  color: $text-black;
}

.product-purchase-terms-item__title {
  font-weight: 600;
}

.product-purchase-terms-item__activator {
  margin: 0;
  padding: 0;

  color: $text-grey-2;

  border: none;
  border-bottom: 1px dashed $text-grey-2;
  background-color: transparent;
  appearance: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: $text-black;
  }
}
</style>
