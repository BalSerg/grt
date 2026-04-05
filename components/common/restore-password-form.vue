<template>
  <section class="entry-point entry-point--wide">
    <div class="restore-password entry-point__password-restoration">

      <h2 class="entry-point__header restore-password__header">{{$t('login.password_recovery')}}</h2>

      <component :is="componentId" @onSuccessPasswordChange="showSuccessMessage"></component>

    </div>
  </section>
</template>

<script>
import ChangePassword from '@/components/common/change-password';
import ChangePasswordSuccess from '@/components/change-password-success';

export default {
  components: {
    ChangePassword,
    ChangePasswordSuccess
  },
  data() {
    return {
      componentId: 'ChangePassword'
    }
  },
  methods: {
    showSuccessMessage() {
      this.componentId = 'ChangePasswordSuccess';
    }
  }
}
</script>

<style lang="scss">
.entry-point__password-restoration {
  margin-top: 24px;
  height: 60vh;
  min-height: 360px;
}

.restore-password__header {
  margin-bottom: 16px;
}

.restore-password__password-hint {
  margin-bottom: 24px;

  .entry-point__password-hint-message,
  .entry-point__password-hint-label {
    font-size: 13px;
    line-height: 1.4;

    @media (min-width: $desktop-mid) {
      font-size: 15px;
      line-height: 1.6;
    }
  }
}

.entry-point--wide {
  width: 100%;
  max-width: 420px;
}

.restore-password__password {
  max-width: 320px;
}
</style>
