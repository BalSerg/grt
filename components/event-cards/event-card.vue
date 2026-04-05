<template>
  <article class="event-card" :class="isEvent ? 'event-card--small' : ''">
    <div class="event-card__photo">
      <LazyImg
        :src="data.photo"
        :alt="data.title"
      />
    </div>
    <div class="event-card__text-wrapper">
      <p class="event-card__date">{{ data.date }}</p>
      <old-link class="event-card__description" :to="data.url">{{
        data.title
      }}</old-link>
    </div>
  </article>
</template>

<script>
import LazyImg from '@/components/lazy-img';

export default {
  components: {
    LazyImg
  },
  props: {
    data: Object,
    isEvent: Boolean,
  },
};
</script>

<style lang="scss">
.event-card {
  flex-shrink: 0;
  width: 138px;

  border: 1px solid $light-grey;
  border-radius: 3px;

  overflow: hidden;

  &:hover {
    box-shadow: 0 2px 5px $translucent-black;
  }

  @media (min-width: $pad) {
    width: 345px;
    margin: 0 auto;
  }
}

.event-card__photo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 138px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: $pad) {
    height: 220px;
  }
}

.event-card--small .event-card__photo {
  height: 196px;
}

.event-card__text-wrapper {
  padding: 6px 0 12px;

  @media (min-width: $pad) {
    padding: 8px 22px 30px;
  }
}

.event-card__date {
  margin-bottom: 8px;

  font-size: 13px;
  line-height: 1.4;
}

.event-card__description {
  display: flex;

  font-size: 13px;
  line-height: 1.3;
  color: $text-black;
  text-decoration: none;

  height: 48px;
  overflow: hidden;

  @media (min-width: $pad) {
    height: 54px;

    line-height: 1.4;
  }
}

.event-card--small .event-card__description {
  @media (min-width: 768px) {
    height: 20px;
  }
}

.event-card:hover .event-card__description {
  color: $grt-blue;
}
</style>
