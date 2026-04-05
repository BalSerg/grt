<template>
  <div class="career">
    <div class="container">
      <div class="breadcrumbs">
        <div class="crumb">
          <nuxt-link :to="localePath('/')">Главная</nuxt-link>
        </div>
        <div class="crumb">
          <nuxt-link :to="localePath('/career/')">Вакансии</nuxt-link>
        </div>
      </div>
      <div class="pagetitle">
        <h2>Вакансии</h2>
      </div>
      <div class="career-list">
        <nuxt-link :to="localePath('/career/example/')">Account manager</nuxt-link>
        <nuxt-link :to="localePath('/career/example/')">Менеджер по развитию бизнеса</nuxt-link>
        <nuxt-link :to="localePath('/career/example/')">New business Director</nuxt-link>
        <nuxt-link :to="localePath('/career/example/')">Руководитель PR-отдела</nuxt-link>
        <nuxt-link :to="localePath('/career/example/')">iOS разработчик</nuxt-link>
      </div>
      <p>Высылайте резюме на почту <a href="mailto:info@globalrustrade.com">info@globalrustrade.com</a>. В теме письма укажите название вакансии.</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.breadcrumbs {
  padding: 22px 0;
  font-size: 13px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  .crumb {
    padding-right: 30px;
    position: relative;

    a {
      color: #7e7e7e;
    }

    &::after {
      content: "";
      width: 8px;
      height: 8px;
      transform: rotate(-45deg);
      box-sizing: border-box;
      border: 1px solid transparent;
      border-right-color: #7e7e7e;
      border-bottom-color: #7e7e7e;
      right: 13px;
      top: calc(50% - 4px);
      position: absolute;
    }

    &:last-child {
      padding-right: 0;

      &::after {
        display: none;
        content: unset;
      }
    }
  }
}

.pagetitle {
  h2 {
    font-size: 28px;
    line-height: 1;
    margin: 5px 0 24px 0;
    color: #282828;
  }
}

.career {
  padding-bottom: 40px;
  min-height: 50vh;

  &-list {
    font-size: 17px;
    padding: 20px 0 40px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 200%;

    a {
      color: #000000;

      &:hover {
        color: $grt-blue;
      }
    }

    & ~ p {
      font-size: 13px;
    }
  }
}

</style>
