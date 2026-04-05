<template>

  <div class="modal__dialog" :class="{'modal__dialog--fullwidth': GET_TARGET_DATA.isFullWidth}">
    <div @click="close">
      <button-close class="modal__close-btn"/>
    </div>
    <h2 class="modal__title">{{ GET_TARGET_DATA.title }}</h2>

    <div class="product-company-conditions">
      <dl class="product-company-conditions__list">
        <div v-if="price" class="product-company-conditions__item">
          <dt class="product-company-conditions__item-title">{{ $t('price_for_legal_entities') }}</dt>
          <dd class="product-company-conditions__item-data">{{ price }} {{ currency }}</dd>
        </div>
        <div v-if="minBatch" class="product-company-conditions__item">
          <dt class="product-company-conditions__item-title">{{ $t('minimum_lot_for_purchase') }}</dt>
          <dd class="product-company-conditions__item-data">{{ minBatch }}</dd>
        </div>
        <div v-if="GET_TARGET_DATA.conditionsForCompanies.companyYears" class="product-company-conditions__item">
          <dt class="product-company-conditions__item-title">{{ $t('company_represented_on_site') }}</dt>
          <dd class="product-company-conditions__item-data">{{ companyYears }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {Currency} from '@/assets/js/const'

export default {
  computed: {
    ...mapGetters({
      GET_TARGET_DATA: 'tech/GET_TARGET_DATA'
    }),
    price() {
      return this.GET_TARGET_DATA.conditionsForCompanies.price ? this.GET_TARGET_DATA.conditionsForCompanies.price.toLocaleString(this.$i18n.locale) : '';
    },
    currency() {
      return this.GET_TARGET_DATA.conditionsForCompanies.price && this.GET_TARGET_DATA.conditionsForCompanies.currency ? Currency[this.GET_TARGET_DATA.conditionsForCompanies.currency] : '';
    },
    minBatch() {
      return this.GET_TARGET_DATA.conditionsForCompanies.minBatch ? `${this.$t('range.from')} ${this.GET_TARGET_DATA.conditionsForCompanies.minBatch} ${this.minBatchMeasure}` : '';
    },
    companyYears() {
      return this.GET_TARGET_DATA.conditionsForCompanies.companyYears ? `${this.$tc('years', this.GET_TARGET_DATA.conditionsForCompanies.companyYears)}` : '';
    },
    minBatchMeasure() {
      return this.GET_TARGET_DATA.conditionsForCompanies.minBatchMeasure || '';
    }
  },
  methods: {
    ...mapMutations({
      SET_MODAL_COMPONENT_NAME: 'tech/SET_MODAL_COMPONENT_NAME'
    }),
    close() {
      this.SET_MODAL_COMPONENT_NAME('')
    }
  }
}
</script>

<style lang="scss">

.modal__dialog {
  width: 200px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  background-color: $white;

  @media (min-width: $pad) {
    position: relative;

    //max-width: 378px;
    margin: 0 15px;
    padding: 14px 24px 24px;

    border-radius: 4px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  }

  @media (min-width: $desktop-mid) {
    margin: 0 30px;
  }
}

.modal__close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.product-company-conditions {
  margin-top: 20px;

  @media (max-width: $pad - 1) {
    padding: 6px 0;
  }
}

.product-company-conditions__list {
  display: grid;
  row-gap: 24px;
  margin: 0;

  @media (min-width: $pad) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 24px;
  }
}

.product-company-conditions__item {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  padding: 27px 14px;

  text-align: center;

  border-radius: 12px;
  background-color: $light-grey-ui;
}

.product-company-conditions__item-title {
  font-size: 14px;
  line-height: 1.4;
  color: $text-grey-2;
}

.product-company-conditions__item-data {
  margin-left: 0;
  margin-bottom: 12px;

  font-size: 24px;
  line-height: 1.4;
  font-weight: 700;
  color: $text-black;
}

.m-wrapper .modal__dialog.modal__dialog--fullwidth {
  max-width: unset !important;
  width: auto !important;
}
</style>
