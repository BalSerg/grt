<template>
  <div class="cart-company">
    <div class="cart-company__body">
      <GrtCustomCheckbox class="cart-company__head">
        <h3 class="cart-company__title">Товары компании ООО Союз производителей игрушек</h3>
      </GrtCustomCheckbox>
      <ul class="cart-company__list">
        <CartProduct/>
        <CartProduct/>
      </ul>
      <div class="cart-company__delivery">
        <div class="cart-company__delivery-wrapper">
          <div class="cart-company__city">Доставка
            <button
              class="cart-company__delivery-btn"
              type="button"
              @click="showRegionSelector"
            >{{address}}</button>
          </div>
          <GrtTooltip class="cart-company__delivery-tooltip">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer augue sem, porttitor in lacinia dictum, luctus vel est. Nullam ac massa a eros fermentum malesuada at mattis lectus. Nunc blandit urna ac dui rutrum, non porta ante consequat. Sed egestas ex in posuere auctor. Ut vel consectetur libero. Nullam suscipit ipsum vel libero semper fringilla. Curabitur sit amet ultricies magna. Etiam non massa velit.
          </GrtTooltip>
          <div class="cart-company__delivery-sum">4 000Р</div>
          <div class="cart-company__delivery-tip">Стоимость доставки: <span>от 3000Р</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartProduct from './cart-product.vue';
import { ModalBus } from '@/event-bus/modal-bus';
import { GmapBus } from '@/modules/cart/event-bus/gmap-bus';

import GrtCustomCheckbox from '@/components/common/grt-custom-checkbox.vue';
import GrtTooltip from '@/components/common/grt-tooltip.vue';
import CartMap from '@/modules/cart/components/cart-map.vue';

export default {
  components: {
    CartProduct,
    GrtCustomCheckbox,
    GrtTooltip,
    CartMap,
  },
  data() {
    return {
      address: 'Москва',
    }
  },
  mounted() {
    GmapBus.$on('select-address', (address) => {
      this.address = address;
    })
  },
  beforeDestroy() {
    GmapBus.$off('select-address');
  },
  methods: {
    showRegionSelector() {
      ModalBus.$emit('open', {
        component: CartMap,
        title: 'Выберите регион доставки',
        isFullWidth: true
      });
    },
    // saveAddress(address) {
    //   this.address = address;
    // }
  }
}
</script>

<style lang="scss">
.cart-company {
  padding: 8px 0;
}

.cart-company__list {
  list-style: none;
  margin: 0;
  padding: 0 15px;
}

.cart-company__body {
  box-sizing: border-box;

  border: 1px solid $mid-grey-ui;
  border-radius: 12px;
}

.cart-company__head {
  padding: 16px 15px;

  border-bottom: 1px solid $mid-grey-ui;
}

.cart-company__title {
  font-size: 18px;
  line-height: 1.4;
  font-weight: 700;
  color: $text-black;
}

.cart-company__delivery {
  padding: 16px 0;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='black' d='M23.05 5.3L12.15.03a.35.35 0 00-.3 0L.95 5.3a.35.35 0 00-.2.31V18.4c0 .13.08.26.2.31l10.9 5.27a.35.35 0 00.3 0l10.9-5.27c.12-.05.2-.18.2-.31V5.6a.35.35 0 00-.2-.31zM12 .74l10.09 4.87-2.93 1.41A.35.35 0 0019.1 7L9.08 2.15 12 .75zm-3.7 1.8l10.06 4.87-2.06 1L6.23 3.54l2.06-1zm10.3 5.54v3.68l-1.93.93V9l1.93-.93zm3.95 10.09l-10.2 4.92v-12l2.43-1.17a.35.35 0 00-.3-.63L12 10.49l-.97-.48a.35.35 0 10-.31.63l.93.45v12l-10.2-4.92v-12l7.77 3.75a.35.35 0 00.47-.16.35.35 0 00-.17-.47L1.92 5.6 5.4 3.93l10.56 5.1h.01v4.22a.35.35 0 00.5.32l2.63-1.27c.13-.06.2-.19.2-.32V7.74l3.25-1.57v12z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: 16px 16px;

  border-top: 1px solid $mid-grey-ui;
}

.cart-company__delivery-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px 0 51px;
}

.cart-company__city {
  display: inline-block;
}

.cart-company__delivery-sum {
  margin-left: auto;

  color: $text-black;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;

  @media (min-width: $desktop-mid) {
    order: 1;
  }
}

.cart-company__delivery-tip {
  flex-shrink: 0;
  width: 100%;

  span {
    color: $text-black;
  }

  @media (min-width: $desktop-mid) {
    width: auto;
  }
}

.cart-company__delivery-btn {
  color: $grt-blue;

  cursor: pointer;
}
</style>
