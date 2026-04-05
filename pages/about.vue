<template>
  <div class="about">
    <section class="intro">
      <div class="container">
        <div class="about-row even">
          <div class="about-half">
            <img src="/nimages/about/intro.jpg" alt />
          </div>
          <div class="about-half">
            <div class="about-text">
              <h2>Global Rus Trade</h2>
              <p>Первая российская В2В платформа трансграничной электронной торговли.</p>
              <p>GRT является ведущей электронной площадкой для российского несырьевого экспорта в страны БРИКС, Юго-Восточной Азии и Латинской Америки.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mission">
      <div class="container">
        <div class="about-row odd">
          <div class="about-half">
            <img src="/nimages/about/mission.jpg" alt />
          </div>
          <div class="about-half">
            <div class="about-text">
              <h2>Наша миссия</h2>
              <p>Мы верим, что электронная торговля – самый эффективный и удобный способ поиска развития бизнеса.</p>
              <p>На нашей платформе мы стремимся предоставить все инструменты для поиска новых партнеров как в России, так и за ее пределами.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="history">
      <div class="container">
        <div class="about-row">
          <div class="about-half">
            <img src="/nimages/about/anna.png" alt />
          </div>
          <div class="about-half">
            <div class="about-text">
              <h2>История создания</h2>
              <p>Компания была основана в 2015 году руководителем от России рабочей группы по цифровой экономике Делового совета БРИКС, председателем наблюдательного совета Ассоциации «Продвижение национальных производств» Анной Нестеровой.</p>
              <blockquote>Когда мы решили создать Global Rus Trade, нашей целью было предложить компаниям разных категорий универсальную площадку, на которой можно легко находить новых поставщиков и покупателей. Для нас особенно важно познакомить иностранных покупателей с уникальными товарами России.</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="numbers">
      <div class="container">
        <div class="about-title">Global Rus Trade</div>
        <div class="about-subtitle">в цифрах</div>
        <div class="about-row">
          <div class="about-key">На нашей площадке присутствуют компании из</div>
          <div class="about-value">>100 стран</div>
        </div>
        <div class="about-row">
          <div class="about-key">Представлены товары из</div>
          <div class="about-value">>2500 компаний</div>
        </div>
        <div class="about-row">
          <div class="about-key">
            На нашей площадке можно
            говорить на
          </div>
          <div class="about-value">11 языках</div>
        </div>
      </div>
    </section>
    <section class="initiatives">
      <div class="container">
        <div class="about-row even">
          <div class="about-half">
            <img src="/nimages/about/initiatives.jpg" alt />
          </div>
          <div class="about-half">
            <div class="about-text">
              <h2>Наши инициативы</h2>
              <p>Global Rus Trade представляет Россию в проекте создания сети площадок электронной коммерции стран БРИКС.</p>
              <p>Также GRT является проектом стран АСЕАН по разработке программного IT-решения для поддержки экспорта субъектов МСП.</p>
              <p>Одним из направлений работы платформы являются образовательные проекты: в 2018 году был запущен проект «Девушки решают» с целью обучения школьниц цифровым навыкам, в том числе навыкам программирования, грамотного составления резюме, создания презентаций и собственных проектов.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

// TODO: Перевести на все языки всю страницу
<style lang="scss">
.about {
  padding: 40px 0;

  .about-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    padding: 60px 0;

    &.odd {
      flex-direction: row-reverse;
    }
  }

  .about-half {
    flex-grow: 1;
    flex-shrink: 0;
    width: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    @media screen and(max-width: 768px) {
      width: 100%;
    }

    img {
      display: block;
      max-width: 100%;
    }
  }

  .about-text {
    padding: 40px 80px;
    font-size: 18px;
    color: #131313;

    @media screen and(max-width: 768px) {
      padding: 5px 10px;
    }

    p {
      margin: 0.75em 0;
      line-height: 150%;
    }

    h2 {
      font-size: 2.5em;
      font-weight: bold;
    }
  }

  .history {
    blockquote {
      padding: 40px;
      font-style: italic;
      margin: 30px 0;
      position: relative;
      font-size: 20px;

      &::before {
        position: absolute;
        content: "«";
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        color: #007aff;
        left: 0;
        top: -30px;
      }

      &::after {
        position: absolute;
        content: "»";
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
        color: #007aff;
        left: 0;
        bottom: -15px;
      }
    }
  }

  .numbers {
    background-color: #efefef;
    padding: 60px 0;
    margin: 40px 0;

    .about-title {
      font-size: 60px;
      font-weight: bold;
      text-align: center;
      color: #131313;
    }

    .about-subtitle {
      text-align: center;
      color: #007aff;
      font-size: 24px;
    }

    .about-key {
      text-align: right;
      font-size: 30px;
      color: #131313;
      padding-right: 10px;
      width: 50%;
      box-sizing: border-box;
      padding-left: 20%;
      flex-shrink: 0;

      @media screen and(max-width: 768px) {
        text-align: center;
        padding: 20px 0;
        width: 100%;
        font-size: 18px;
      }
    }

    .about-value {
      padding-left: 10px;
      text-align: left;
      font-size: 48px;
      color: #007aff;
      font-weight: bold;
      width: 50%;
      box-sizing: border-box;
      flex-shrink: 0;

      @media screen and(max-width: 768px) {
        text-align: center;
        width: 100%;
        padding: 20px 0;
        font-size: 36px;
      }
    }
  }
}
</style>
