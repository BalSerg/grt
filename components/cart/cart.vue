<template>
  <div class="header-tool__wrapper header-tool__wrapper--cart">
    <old-link to="/basket/">
      <button
        type="button"
        class="header-tool header-tool--cart"
      >
        <span class="header-tool__icon">
          <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2398 14.6672H10.3065L8.83984 17.3338H23.5065C24.2398 17.3338 24.8398 17.9338 24.8398 18.6672C24.8398 19.4005 24.2398 20.0005 23.5065 20.0005H8.83984C6.81318 20.0005 5.53318 17.8272 6.50651 16.0405L8.30651 12.7872L3.50651 2.66716H2.17318C1.43984 2.66716 0.839844 2.06716 0.839844 1.33382C0.839844 0.600488 1.43984 0.000488281 2.17318 0.000488281H4.35984C4.86651 0.000488281 5.34651 0.293822 5.55984 0.760488L10.8798 12.0005H20.2398L24.7598 3.82715C25.1065 3.18716 25.9198 2.96049 26.5598 3.30716C27.1998 3.66716 27.4398 4.48049 27.0798 5.12049L22.5732 13.2938C22.1198 14.1205 21.2398 14.6672 20.2398 14.6672ZM8.83985 21.3338C7.37318 21.3338 6.18651 22.5338 6.18651 24.0005C6.18651 25.4672 7.37318 26.6672 8.83985 26.6672C10.3065 26.6672 11.5065 25.4672 11.5065 24.0005C11.5065 22.5338 10.3065 21.3338 8.83985 21.3338ZM22.1732 21.3338C20.7065 21.3338 19.5198 22.5338 19.5198 24.0005C19.5198 25.4672 20.7065 26.6672 22.1732 26.6672C23.6398 26.6672 24.8398 25.4672 24.8398 24.0005C24.8398 22.5338 23.6398 21.3338 22.1732 21.3338Z" fill="#404040"/>
          </svg>
        </span>
        <span class="header-tool__text">
          {{ $t('header.cart') }}
        </span>
        <span
          v-if="productsInCartCount > 0"
          class="header-tool__badge"
        >{{productsInCartCount}}</span>
      </button>
    </old-link>

    <!-- Ниже виджет он еще понадобится-->
    <!--transition name="fade">
      <HeaderDropdown
        v-if="isActive && isDesktop"
        class="header-dropdown--cart"
        @on-close="isActive = false"
      >
        <CartWidget
          :productsCount="productsInCartCount"
        />
      </HeaderDropdown>
    </transition-->

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartWidget from './cart-widget';
import { ModalBus } from '@/event-bus/modal-bus';


const HeaderDropdown = () => import('@/components/common/header-dropdown');

export default {
  components: {
    HeaderDropdown,
    CartWidget
  },
  computed: {
    ...mapGetters({
      cart: 'userData/cart',
      isDesktop: 'tech/isDesktop',
    }),
    productsInCartCount() {
      return this.cart?.length || 0;
    },
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    openCart() {
      if (!this.isDesktop) {
        return ModalBus.$emit('open', {
          component: CartWidget,
          props: {
            productsCount: this.productsInCartCount
          }
        });
      }

      return this.isActive = true;
    }
  }
}
</script>

<style lang="scss">
.header-tool__wrapper.header-tool__wrapper--cart {
  padding-left: 0;

  @media (min-width: $desktop-mid) {
    margin-left: 32px;
  }
}

.header-tool--cart::before {
  content: "";
  position: absolute;
  bottom: -23px;
  left: calc(50% - 7px);
  z-index: 12;
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  transform: rotate(45deg);
  display: none; //при возврате виджета убрать это правило
}

.header-dropdown--cart {
  left: unset;
  right: 0;

  .header-dropdown__dialog::before {
    content: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
