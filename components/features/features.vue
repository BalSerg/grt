<template>
  <section class="features">
    <SectionHeader :link="header" />
    <ul class="features__list">
      <li class="features__item">
        <div class="feature-card">
          <div class="feature-card__image-container">
            <img
              class="feature-card__image"
              src="/nimages/event-6.png"
              :alt="$t('features.feature1')"
            />
          </div>
          <p class="feature-card__text">{{$t('features.feature1')}}</p>
        </div>
      </li>
      <li class="features__item">
        <div class="feature-card">
          <div class="feature-card__image-container">
            <img
              class="feature-card__image"
              src="/nimages/event-5.png"
              :alt="$t('features.feature2')"
            />
          </div>
          <p class="feature-card__text">{{$t('features.feature2')}}</p>
        </div>
      </li>
      <li class="features__item">
        <div class="feature-card">
          <div class="feature-card__image-container">
            <img
              class="feature-card__image"
              src="/nimages/event-6.png"
              :alt="$t('features.feature1')"
            />
          </div>
          <p class="feature-card__text">{{$t('features.feature1')}}</p>
        </div>
      </li>
      <li class="features__item">
        <div class="feature-card">
          <div class="feature-card__image-container">
            <img
              class="feature-card__image"
              src="/nimages/event-5.png"
              :alt="$t('features.feature2')"
            />
          </div>
          <p class="feature-card__text">{{$t('features.feature2')}}</p>
        </div>
      </li>
      <li class="features__item">
        <div class="feature-card">
          <div class="feature-card__image-container">
            <img
              class="feature-card__image"
              src="/nimages/event-6.png"
              :alt="$t('features.feature1')"
            />
          </div>
          <p class="feature-card__text">{{$t('features.feature1')}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
// import Feature from "@/components/features/feature-card";
import SectionHeader from "@/components/common/section-header";

export default {
  // props: {
  //   featuresData: Array
  // },
  components: {
    // Feature,
    SectionHeader
  },
  data() {
    return {
      header: {
        title: this.$t("section.header.advantages")
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.features {
  display: none;

  @media (min-width: $desktop-large) {
    display: block;
    margin-bottom: 64px;
  }
}

.features__list {
  display: flex;
  justify-content: space-between;
  margin: 0 -10px;
  padding: 0;

  list-style: none;
}

.features__item {
  flex-shrink: 0;
  margin: 0 10px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 248px;
}

.feature-card__image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  margin-bottom: 24px;

  border-radius: 50%;
  background-color: $grey-bg;
  overflow: hidden;
}

.feature-card__image {
  flex-shrink: 0;
  display: block;
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.feature-card__text {
  text-align: center;

  font-weight: 600;
  font-size: 17px;
  line-height: 23px;

  color: $text-black;
}
</style>
