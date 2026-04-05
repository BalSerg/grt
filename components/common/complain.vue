<template>
  <div class="complain">
    <button @click="openComplainForm">{{ $t('complain.button') }}</button>
  </div>
</template>

<script>
import { ModalBus } from '@/event-bus/modal-bus';

const ComplainModal = () => import('./complain-modal');

export default {
  props: {
    productId: Number,
  },
  methods: {
    openComplainForm() {
      ModalBus.$emit('open', {
        component: ComplainModal,
        canCloseOnBackdrop: false,
        componentData: { productId2: this.productId }
      });
    },
  }
}

</script>

<style lang="scss">
.complain {
  button {
    display: block;
    margin: -35px 0 0;
    color: #3fa4ff;
    cursor: pointer;
    transition: color ease-out 250ms;

    &:hover {
      color: #66bdff;
      transition: color ease-in 250ms;
    }
  }
}
</style>
