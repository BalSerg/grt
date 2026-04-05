<template>
  <transition name="slide-fade">
    <div v-if="!!component"
         class="modal"
         :class="classes"
    >
      <div class="modal__dialog" :class="{'modal__dialog--fullwidth': isFullWidth}">
          <div class="modal__close-btn" @click="close">
            <button-close />
          </div>
          
        <!--Все это рушит модалку. Если растопыривает оч сильно-->
        <!--        когда в title есть точка, причем точка не должна стоять в конце предложения-->
        <!--        это указывает, что используется i18n-тип текста, в виде modal.select_delivery_region-->
<!--        <h2 class="modal__title" v-if="title.includes('.')">{{ $t(title) }}</h2>-->
        <!--        а если title - минуя i18n, то его вставляем прямым текстом-->
<!--        <h2 class="modal__title" v-else>{{ title }}</h2>-->

        <component :is="component" :component-data="componentData" class="modal__body" @close="close"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonClose from './button-close';
import {ModalBus} from "@/event-bus/modal-bus";

export default {
  components: {
    ButtonClose
  },
  data() {
    return {
      component: null,
      title: '',
      classes: '',
      canCloseOnBackdrop: true,
      isFullWidth: false,
      componentData: {}
    }
  },
  created() {
    ModalBus.$on('open', this.open)
    ModalBus.$on('close', this.close)
  },
  methods: {
    open({component, title = '', classes = '', canCloseOnBackdrop = true, isFullWidth = false, componentData = {}}) {
      this.component = component;
      this.title = title;
      this.classes = classes;
      this.canCloseOnBackdrop = canCloseOnBackdrop;
      this.isFullWidth = isFullWidth;
      this.componentData = componentData

      this.$disableBodyScroll()
      document.addEventListener('keyup', this.onEscKeyup);
    },
    close() {
      this.$enableBodyScroll()
      document.removeEventListener('keyup', this.onEscKeyup)
      this.component = null
    },
    onEscKeyup(evt) {
      if (evt.key === 'Escape') {
        this.close()
      }
    }
  },
}
</script>

<style lang="scss">
.modal {
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

  .modal__dialog {
    width: fit-content;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    background-color: $white;

    @media (max-width: $desktop-mid - 1) {
      width: 100vw;
      height: 100vh;
      overflow-y: auto;
    }

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

  .modal__dialog--fullwidth {
    max-width: unset;
    width: auto;
  }

  .modal__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    @media (max-width: $desktop-mid - 1) {
      background-color: #ffffff;
    }
  }

  .modal__title {
    margin-bottom: 18px;
    padding-right: 24px;

    font-weight: 600;
    font-size: 18px;
    line-height: 1.4;
    color: $text-black;

    @media (min-width: $pad) {
      margin-bottom: 24px;
      padding-right: 16px;

      font-size: 23px;
      line-height: 1.5;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>

