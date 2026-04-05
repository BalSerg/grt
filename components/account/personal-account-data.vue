<template>
  <section class="personal-data">
    <div class="personal-data__row avatar">
      <PersonalAccountAvatar />
    </div>
    <div class="personal-data__row">
      <PersonalAccountDataForm />
    </div>
  </section>
</template>

<script>
import PersonalAccountAvatar from './personal-account-avatar.vue';
import PersonalAccountDataForm from './personal-account-data-form.vue';
export default {
  components: {
    PersonalAccountAvatar,
    PersonalAccountDataForm
  }

}
</script>

<style lang="scss">
.personal-data {
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  gap: 24px;
  flex-wrap: nowrap;

  @media screen and(max-width: $desktop-mid - 1) {
    flex-direction: column;
  }

  &__row {
    width: 50%;
    flex-grow: 1;

    &:not(.avatar) {
      min-width: 444px;

      @media screen and (max-width: 445px) {
        min-width: auto;
        max-width: 444px;
      }
    }

    @media screen and(max-width: $desktop-mid - 1) {
      width: 100%;
    }

    &.avatar {
      order: 1;

      @media screen and(max-width: $desktop-mid - 1) {
        order: 0;
      }
    }
  }
}
</style>
