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
        <div class="crumb">
          <nuxt-link :to="localePath('/career/example/')">Менеджер по развитию бизнеса</nuxt-link>
        </div>
      </div>
      <div class="pagetitle">
        <h2>Менеджер по развитию бизнеса</h2>
      </div>
      <div class="career-info">
        <p>Мы ищем руководителя PR-отдела с большими амбициями, который готов взять на себя ответственность и добиться полной отстройки студии от всех существующих на рынке агентств.</p>
        <h3>Требования к кандидату</h3>
        <ul>
          <li>Общительность. Такие личности любят общаться. Они быстро находят общий язык с незнакомцами и всегда знают о чем поговорить с близкими людьми.</li>
          <li>Улыбчивость. При общении они практически всегда улыбаются, обычно производя приятное впечатление на собеседников.</li>
          <li>Общительность. Такие личности любят общаться. Они быстро находят общий язык с незнакомцами и всегда знают о чем поговорить с близкими людьми.</li>
          <li>Улыбчивость. При общении они практически всегда улыбаются, обычно производя приятное впечатление на собеседников.</li>
        </ul>
        <h3>Обязанности</h3>
        <ul>
          <li>Общительность. Такие личности любят общаться. Они быстро находят общий язык с незнакомцами и всегда знают о чем поговорить с близкими людьми.</li>
          <li>Улыбчивость. При общении они практически всегда улыбаются, обычно производя приятное впечатление на собеседников.</li>
          <li>Общительность. Такие личности любят общаться. Они быстро находят общий язык с незнакомцами и всегда знают о чем поговорить с близкими людьми.</li>
          <li>Улыбчивость. При общении они практически всегда улыбаются, обычно производя приятное впечатление на собеседников.</li>
        </ul>
        <p>Первая российская В2В платформа трансграничной электронной торговли.<br> GRT является ведущей электронной площадкой для российского несырьевого экспорта в страны БРИКС, Юго-Восточной Азии и Латинской Америки.</p>
        <p class="separator">Резюме присылайте на почту <a href="mailto:info@globalrustrade.com">info@globalrustrade.com</a></p>
        <nuxt-link class="small" :to="localePath('/career/')">Вернуться  к списку вакансий</nuxt-link>
      </div>
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
  line-height: 1.5;
  font-size: 15px;

  p {
    margin: 0 0 1rem 0;
    color: #282828;
    line-height: 24px;

    &.separator {
      margin: 2em 0;
    }
  }

  h3 {
    font-size: 23px;
    color: #282828;
  }

  ul {
    color: #000000;
    padding-left: 20px;
    margin: 17px 0;

    li {
      line-height: 24px;
      margin-bottom: 17px;
    }
  }

  .small {
    font-size: 13px;
  }

  &-info {
    color: #282828;
    padding-bottom: 40px;

    @media screen and (min-width: 1024px) {
      max-width: 50%;
    }
  }
}
</style>
