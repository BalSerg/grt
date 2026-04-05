<template>
  <section class="personal-account">
    <template v-if="!isloaded">
      <div style="min-height: 60vh;
        position: relative;">
        <Loader/>
      </div>
    </template>
    <template v-else>
      <div class="personal-account__wrapper">
        <PersonaAccountNavigation v-if="isloaded" :navigation="navigation"/>
        <main class="personal-account__container">
          <div class="personal-account__heading">
            <h1>
              <template v-if="pageTitle === 'data'">{{ $t('account.data.heading')}}</template>
              <template v-else>{{ $t('account.orders.heading')}}</template>
            </h1>
          </div>
          <component :is="activeComponent" :orderid="$route.params.id"/>
        </main>
      </div>
    </template>
  </section>
</template>

<script>
import Loader from '@/components/common/loader.vue';
import PersonaAccountNavigation from '@/components/account/personal-account-navigation';
import PersonalAccountOrderDetails from "~/components/account/personal-account-order-details";

export default {
  name: 'AccountSlug',
  components: {
    Loader,
    PersonalAccountOrderDetails,
    PersonaAccountNavigation,
    PersonalAccountData: () => import('@/components/account/personal-account-data'),
    PersonalAccountOrders: () => import('@/components/account/personal-account-orders'),
  },
  data() {
    return {
      isloaded: false,
      navigation: [
        {id: 0, name: 'data'},
        {id: 1, name: 'orders'},
      ],
      mobNav: false,
    };
  },
  computed: {
    pageTitle() {
      return this.$route.params.page;
    },
    activeComponent() {
      let component = 'personal-account-data'
      if (this.$route.params.id) {
        component = 'personal-account-order-details'
      } else if (this.$route.params.page) {
        component = `personal-account-${this.$route.params.page}`
      }
      return component;
    },
    pointerOffset() {
      return this.getPointerOffset();
    }
  },
  mounted() {
    this.isloaded = true;
  },
  methods: {
    getPointerOffset() {
      return 20;
    }
  }
}
</script>

<style lang="scss">
.personal-account {
  background-color: $light-grey;
  padding: 24px 30px;

  @media screen and (max-width: $pad - 1) {
    padding: 30px 0 10px;
  }

  &__wrapper {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media screen and (max-width: $desktop-mid) {
      max-width: 100%;
    }

    @media screen and (max-width: $pad - 1) {
      display: block;
    }
  }

  &__navigation {
    flex-shrink: 0;
    flex-grow: 1;
    max-width: 327px;
    min-width: 219px;
    background-color: white;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 24px 8px 18px 24px;


    @media screen and (max-width: $desktop-mid - 1) {
      max-width: 219px;
    }

    @media screen and (max-width: $pad - 1) {
      position: absolute;
      right: 10px;
      top: 30px;

      border: 1px solid $mid-grey-ui;

      opacity: 0;
      transition: opacity ease-out 250ms;
    }
  }

  &__heading {
    h1 {
      font-size: 28px;
      line-height: 1.5;
      color: $text-black;
      font-weight: bold;
    }
  }

  &__container {
    flex-grow: 1;
    margin-left: 24px;

    @media screen and (max-width: $pad - 1) {
      margin-left: 0;

      h1 {
        padding: 0 16px;
      }
    }
  }
}
</style>
