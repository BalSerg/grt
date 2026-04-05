<template>
  <div class="m-wrapper">
<!--    <div class="modal__outside" @click="SET_MODAL_COMPONENT_NAME('')"></div>-->
    <component :is="GET_MODAL_COMPONENT_NAME" :key="GET_MODAL_COMPONENT_NAME + '_ind'" class="modal__dialog"/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import userRegistrationForm from '@/modules/SMS_validation/userRegistrationForm'
import SMSconfirmForm from '@/modules/SMS_validation/SMSconfirmForm'
import ProductCompanyConditions from '@/components/product-company-conditions'

export default {
  components: {
    userRegistrationForm,
    SMSconfirmForm,
    ProductCompanyConditions
  },
  computed: {
    ...mapGetters({
      GET_MODAL_COMPONENT_NAME: 'tech/GET_MODAL_COMPONENT_NAME',
      GET_TARGET_DATA: 'tech/GET_TARGET_DATA'
    })
  },
  methods: {
    ...mapMutations({
      SET_MODAL_COMPONENT_NAME: 'tech/SET_MODAL_COMPONENT_NAME'
    }),
  }
}
</script>

<style scoped lang="scss">
.m-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(40, 40, 40, 0.6);
  z-index: 1000000;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal__outside {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .modal__dialog {
    width: max-content;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    background-color: $white;

    @media (min-width: $pad) {
      position: relative;

      max-width: 378px;
      margin: 0 15px;
      padding: 14px 24px 24px;

      border-radius: 4px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    }

    @media (min-width: $desktop-mid) {
      margin: 0 30px;
    }
  }
}


</style>
